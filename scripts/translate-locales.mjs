// Fill in missing translations for the landing site with first-party Azure OpenAI models.
//
//   node scripts/translate-locales.mjs                 every locale, landing strings + legal pages
//   node scripts/translate-locales.mjs --locales nl,pl --only main|legal
//
// Translates only what is missing: keys in public/locales/en.json absent from <locale>.json, and legal
// segments (scripts/legal-segments.mjs) absent from public/locales/legal/<bundle>/<locale>.json. So after
// an English edit, a run translates just the edited strings. Each batch is translated, machine-checked
// (same keys, same HTML tags and links, same numbers), then reviewed by a second model pass.
//
// Auth is Microsoft Entra ID through the Azure CLI (`az login`); no API key is read. Token usage is
// appended to translate-usage.jsonl in $TRANSLATE_LOG_DIR (default: the OS temp dir).
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { SITE_LOCALES } from './site-locales.mjs';
import { segmentLegal, LEGAL_PAGES } from './legal-segments.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT || 'https://deepvalueintelligence.cognitiveservices.azure.com/';
const MODEL = process.env.TRANSLATE_MODEL || 'gpt-6.1-sol';
const REVIEW_MODEL = process.env.REVIEW_MODEL || 'gpt-6.1-sol';
const LOG = join(process.env.TRANSLATE_LOG_DIR || tmpdir(), 'translate-usage.jsonl');
const CONCURRENCY = Number(process.env.TRANSLATE_CONCURRENCY || 8);

// English source for keys whose English value is intentionally empty (shown only in translations).
export const SOURCE_OVERRIDES = {
  'legal.englishGoverns':
    'This translation is provided for convenience. If it differs from the English version, the English version governs.',
};

const LANGUAGE_NOTES = {
  'es-419': 'Latin American Spanish (neutral, tú).', 'es-ES': 'European Spanish (Spain, tú).', 'pt-BR': 'Brazilian Portuguese (você).',
  zh: 'Simplified Chinese (mainland).', 'zh-Hant': 'Traditional Chinese (Taiwan usage).', ar: 'Modern Standard Arabic.',
  ur: 'Urdu in Nastaliq script.', ms: 'Malay (Bahasa Melayu, Malaysia), not Indonesian.', hi: 'Hindi in Devanagari.',
  mr: 'Marathi in Devanagari.', bn: 'Bengali (Bangla).', te: 'Telugu.', ta: 'Tamil.', th: 'Thai.', vi: 'Vietnamese.',
  tr: 'Turkish.', ru: 'Russian.', nl: 'Dutch.', pl: 'Polish.', sv: 'Swedish.', id: 'Indonesian.',
};

const RULES = `You translate the website copy of DeepValues, an investing research app for individual investors.
Rules:
- Input is a JSON object of key -> English string. Return a JSON object with exactly the same keys, each value translated. No other keys, no commentary.
- Keep every HTML tag, attribute, URL, email address and HTML entity exactly; translate only the visible text between tags. Keep \\n line breaks.
- Keep these names in English exactly: DeepValues, DeepValues.AI, Deep Values, Deep Value, Buffett Indicator, Buffett Indicator & Shiller PE, Shiller PE, CAPE, Plus, Lifetime Plus, Buffett Lens, financial.md, FinancialMD, Smart Money, Margin of Safety Weekly, LuLu Ventures LLC, App Store, Google Play, Apple, Google, iPhone, Android, MCP, API, SEC, 13F, 10-K, 10-Q, 8-K, ETF, P/E, ROE, ROIC, DCF, VIX, AAII, GDPR, CCPA, x402, and every company, person, fund and product name.
- Keep every number, price and currency amount (e.g. $9.99, $79.99, $59.99, 0.75, 93, 13F) with the same digits; write digits as Western Arabic numerals 0-9. Use the target language's own decimal separator and currency placement (e.g. 0,75 and 9,99 $ where a decimal comma is standard).
- Use the standard local investing terms: intrinsic value, margin of safety, owner earnings, free cash flow, value investing, watchlist, briefing (a research report).
- Tone: plain, friendly, investor-literate. Match the English length; short UI labels (buttons, menu items, eyebrows) must stay short.
- Never call the app a "free app". Never add promotional words such as "sale" or "limited time".
- Legal text (privacy policy, terms) must be translated faithfully and completely, keeping the legal meaning; do not summarise.`;

let token = null, tokenAt = 0;
function bearer() {
  if (!token || Date.now() - tokenAt > 40 * 60 * 1000) {
    token = execFileSync('az', ['account', 'get-access-token', '--resource', 'https://cognitiveservices.azure.com', '--query', 'accessToken', '-o', 'tsv'], { encoding: 'utf8' }).trim();
    tokenAt = Date.now();
  }
  return token;
}

async function chat(model, system, user, tag) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`${ENDPOINT}openai/v1/chat/completions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${bearer()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: system }, { role: 'user', content: user }], response_format: { type: 'json_object' } }),
    });
    if (res.ok) {
      const json = await res.json();
      appendFileSync(LOG, JSON.stringify({ at: new Date().toISOString(), tag, model, in: json.usage?.prompt_tokens, out: json.usage?.completion_tokens }) + '\n');
      return JSON.parse(json.choices[0].message.content);
    }
    if (attempt >= 5 || ![408, 429, 500, 502, 503, 504].includes(res.status)) throw new Error(`${tag}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
    await new Promise((r) => setTimeout(r, 2000 * attempt * attempt));
  }
}

// ---- machine checks ----
// Links into the web app may carry the reader's language (app.deepvalues.ai/de/pricing for /en/pricing)
const appLocale = (s) => s.replace(/(https:\/\/app\.deepvalues\.ai\/)(?:[a-z]{2}(?:-[A-Za-z]+)?\/)?/g, '$1');
const tags = (s) => (s.match(/<[^>]+>/g) || []).map((t) => appLocale(t.replace(/\s+/g, ' '))).sort().join('');
const numberList = (s) => s.replace(/<[^>]+>/g, '').replace(/(\d)[.,   ](?=\d)/g, '$1').match(/\d+/g) || [];
// Every number of the English must survive (a translation may add one, e.g. "three" written as 3)
const missingNumbers = (en, t) => {
  const pool = numberList(t);
  return numberList(en).filter((n) => { const i = pool.indexOf(n); if (i < 0) return true; pool.splice(i, 1); return false; });
};
const urls = (s) => (s.match(/https?:\/\/[^\s"<)]+|[\w.+-]+@[\w-]+\.[\w.]+/g) || []).map(appLocale).sort().join(' ');
export function problems(source, out) {
  const issues = [];
  for (const [k, en] of Object.entries(source)) {
    const t = out[k];
    if (typeof t !== 'string' || (!t.trim() && en.trim())) { issues.push(`${k}: missing`); continue; }
    if (tags(en) !== tags(t)) issues.push(`${k}: HTML tags differ`);
    if (urls(en) !== urls(t)) issues.push(`${k}: links differ`);
    const lost = missingNumbers(en, t);
    if (lost.length) issues.push(`${k}: numbers missing (${lost.join(',')})`);
    if ((en.match(/\n/g) || []).length !== (t.match(/\n/g) || []).length) issues.push(`${k}: line breaks differ`);
  }
  for (const k of Object.keys(out)) if (!(k in source)) issues.push(`${k}: unexpected key`);
  return issues;
}

async function translateBatch(locale, source, tag) {
  const lang = `${SITE_LOCALES.find((l) => l.code === locale).english} (${locale}). ${LANGUAGE_NOTES[locale] || ''}`;
  const system = `${RULES}\nTarget language: ${lang}`;
  let out = await chat(MODEL, system, JSON.stringify(source, null, 1), `${tag}:translate`);
  let issues = problems(source, out);
  if (issues.length) {
    const retry = await chat(MODEL, system, `Your previous translation had these problems:\n${issues.join('\n')}\nTranslate again, fixing them.\n${JSON.stringify(source, null, 1)}`, `${tag}:retry`);
    if (problems(source, retry).length < issues.length) { out = retry; issues = problems(source, out); }
  }
  // Review pass: a second read for meaning, tone, length and terminology; returns only corrected keys.
  const review = await chat(REVIEW_MODEL,
    `${RULES}\nTarget language: ${lang}\nYou are reviewing a translation. Input: {"source": {...English}, "translation": {...}}. ` +
    'Check each value for meaning, completeness, natural phrasing, the rules above, and that short UI labels stay short. ' +
    'Return {"fixes": {key: corrected translation}} with only the keys that need a change ({} when all are good).',
    JSON.stringify({ source, translation: out }, null, 1), `${tag}:review`);
  const fixes = review.fixes || {};
  for (const [k, v] of Object.entries(fixes)) {
    if (!(k in source) || typeof v !== 'string') continue;
    if (problems({ [k]: source[k] }, { [k]: v }).length === 0) out[k] = v;
  }
  issues = problems(source, out);
  return { out, issues, fixed: Object.keys(fixes).length };
}

function chunks(obj, maxChars) {
  const list = [];
  let cur = {}, size = 0;
  for (const [k, v] of Object.entries(obj)) {
    if (size + v.length > maxChars && Object.keys(cur).length) { list.push(cur); cur = {}; size = 0; }
    cur[k] = v; size += v.length;
  }
  if (Object.keys(cur).length) list.push(cur);
  return list;
}

const readJson = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : {});
const writeJson = (f, data) => { mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, JSON.stringify(data, null, 2) + '\n'); };
// keep the English key order
const ordered = (enObj, data) => Object.fromEntries(Object.keys(enObj).filter((k) => k in data).map((k) => [k, data[k]]));

// Links into the web app open in the reader's language where app.deepvalues.ai serves it
// (app.deepvalues.ai/<lang>/pricing); other languages keep the English app pages.
const WEB_APP_LANG = { de: 'de', 'es-419': 'es', 'es-ES': 'es', fr: 'fr', hi: 'hi', id: 'id', it: 'it', ja: 'ja', ko: 'ko', 'pt-BR': 'pt',
  zh: 'zh', 'zh-Hant': 'zh-Hant', ar: 'ar', bn: 'bn', ru: 'ru', ur: 'ur', tr: 'tr', vi: 'vi', mr: 'mr', te: 'te', ta: 'ta' };
export function localizeAppLinks(locale, value) {
  const lang = WEB_APP_LANG[locale];
  if (!lang) return value;
  return value
    .replace(/https:\/\/app\.deepvalues\.ai\/en\//g, `https://app.deepvalues.ai/${lang}/`)
    .replace(/https:\/\/app\.deepvalues\.ai\/developers/g, `https://app.deepvalues.ai/${lang}/developers`);
}

async function pool(jobs) {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < jobs.length) { const i = next++; results[i] = await jobs[i](); }
  }));
  return results;
}

async function main() {
  const args = process.argv.slice(2);
  const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };
  const only = opt('--only');
  const wanted = opt('--locales')?.split(',');
  const locales = SITE_LOCALES.map((l) => l.code).filter((c) => c !== 'en' && (!wanted || wanted.includes(c)));

  // Work units: { file, en (key -> English), label }
  const units = [];
  if (only !== 'legal') {
    const en = readJson(join(root, 'public/locales/en.json'));
    const source = Object.fromEntries(Object.entries(en).map(([k, v]) => [k, SOURCE_OVERRIDES[k] ?? v]));
    for (const loc of locales) units.push({ loc, file: join(root, `public/locales/${loc}.json`), en: source, order: en, label: `main/${loc}` });
  }
  if (only !== 'main') {
    for (const page of LEGAL_PAGES) {
      const { strings } = segmentLegal(readFileSync(join(root, page.file), 'utf8'), page.bundle);
      writeJson(join(root, `public/locales/legal/${page.bundle}/en.json`), strings);
      for (const loc of locales) units.push({ loc, file: join(root, `public/locales/legal/${page.bundle}/${loc}.json`), en: strings, order: strings, label: `${page.bundle}/${loc}`, prune: true });
    }
  }

  const jobs = [];
  const state = new Map();
  for (const u of units) {
    const have = readJson(u.file);
    // Legal bundles drop keys whose English text no longer exists
    const kept = u.prune ? Object.fromEntries(Object.entries(have).filter(([k]) => k in u.en)) : have;
    state.set(u, kept);
    const missing = Object.fromEntries(Object.entries(u.en).filter(([k]) => !(k in kept)));
    chunks(missing, 6000).forEach((batch, i) => jobs.push(async () => {
      const r = await translateBatch(u.loc, batch, `${u.label}#${i}`);
      for (const [k, v] of Object.entries(r.out)) state.get(u)[k] = localizeAppLinks(u.loc, v);
      writeJson(u.file, ordered(u.order, state.get(u)));
      console.log(`${u.label}#${i}: ${Object.keys(batch).length} keys, review fixed ${r.fixed}${r.issues.length ? ', ISSUES: ' + r.issues.join('; ') : ''}`);
      return r.issues;
    }));
  }
  console.log(`${jobs.length} batches across ${units.length} files`);
  const all = (await pool(jobs)).flat();
  for (const u of units) writeJson(u.file, ordered(u.order, state.get(u)));
  console.log(all.length ? `Done with ${all.length} open issues` : 'Done, no open issues');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main().catch((e) => { console.error(e); process.exit(1); });
