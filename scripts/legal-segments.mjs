// Translatable segments of the legal pages (privacy, terms, Buffett Indicator privacy).
//
// The legal pages are long English documents. Rather than hand-tagging hundreds of paragraphs, this
// module finds every block of visible text in <body> (headings, paragraphs, list items, table cells,
// stray links) and marks it data-i18n-html="<bundle>.<hash>", where the hash is taken from the block's
// English HTML. /i18n.js then swaps each block from /locales/<bundle>/<locale>.json like any other key.
//
// Keys come from the English text, so editing a paragraph changes its key: the stale translation stops
// matching and that paragraph shows in English (never a wrong translation) until the bundle is re-translated.
// `npm run test:i18n` fails while any locale lacks a key of the current English page.
//
// Used by vite.config.ts (transformIndexHtml, dev and build) and by the i18n tests.
import { createHash } from 'crypto';
import { JSDOM } from 'jsdom';

const TEXT_BLOCKS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI', 'TD', 'TH', 'DT', 'DD', 'CAPTION', 'FIGCAPTION', 'SUMMARY', 'BLOCKQUOTE']);
const CONTAINERS = new Set([...TEXT_BLOCKS, 'UL', 'OL', 'TABLE', 'DIV', 'SECTION', 'ARTICLE', 'NAV', 'DL', 'FIGURE', 'DETAILS']);
const SKIP = 'script,style,svg,noscript,[data-i18n],[data-i18n-html],[data-locale-switcher]';

// Blocks that read the same in every language (names, platforms, the copyright line) are left alone.
const KEEP_ENGLISH = /^(DeepValues\.AI|Deep|Values\.AI|US|iOS|Android|Google Play|Apple App Store|Buffett Indicator|OpenAI|Anthropic|Cloudflare|AWS Cognito|Google Analytics 4|Google Workspace|Amazon Web Services \(AWS\)|© \d{4} Lu[Ll]u Ventures LLC)$/;
const normalize = (html) => html.replace(/\s+/g, ' ').trim();
export const segmentKey = (bundle, html) => `${bundle}.${createHash('sha1').update(normalize(html)).digest('hex').slice(0, 12)}`;

const hasText = (el) => /\S/.test(el.textContent || '');
const hasBlockDescendant = (el) => [...el.querySelectorAll('*')].some((d) => CONTAINERS.has(d.tagName));

// A list item drawn as "<span class=dot></span><span>text</span>" translates the text span only,
// so the decorative markup never passes through the translator.
function narrow(el) {
  for (;;) {
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && /\S/.test(n.textContent));
    const kids = [...el.children];
    const full = kids.filter(hasText);
    if (direct || full.length !== 1 || kids.length < 2 || full[0].tagName !== 'SPAN') return el;
    el = full[0];
  }
}

/**
 * @param {string} html     the English page
 * @param {string} bundle   key prefix, e.g. "privacy"
 * @returns {{ html: string, strings: Record<string,string> }} the page with data-i18n-html marks, and key → English HTML
 */
export function segmentLegal(html, bundle) {
  const dom = new JSDOM(html, { includeNodeLocations: true });
  const doc = dom.window.document;
  const skipped = (el) => !!el.closest(SKIP);
  const picked = new Set();

  // 1. leaf text blocks
  doc.body.querySelectorAll('*').forEach((el) => {
    if (TEXT_BLOCKS.has(el.tagName) && hasText(el) && !hasBlockDescendant(el) && !skipped(el) && !el.querySelector(SKIP)) picked.add(el);
  });
  // 2. text that no leaf block covers (TOC links in a <div>, labels): its closest element without blocks inside
  const walker = doc.createTreeWalker(doc.body, dom.window.NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!/\S/.test(n.textContent)) continue;
    const parent = n.parentElement;
    if (!parent || skipped(parent) || [...picked].some((p) => p.contains(parent))) continue;
    if (!hasBlockDescendant(parent)) picked.add(parent);
    else throw new Error(`legal-segments: text "${n.textContent.trim().slice(0, 60)}" sits beside block elements in <${parent.tagName.toLowerCase()}>; wrap it in a <p> or <span>`);
  }

  const strings = {};
  const inserts = [];
  for (const el of [...picked].map(narrow)) {
    if (KEEP_ENGLISH.test(normalize(el.textContent))) continue;
    const english = normalize(el.innerHTML);
    const key = segmentKey(bundle, english);
    strings[key] = english;
    const loc = dom.nodeLocation(el);
    inserts.push({ at: loc.startTag.endOffset - 1, text: ` data-i18n-html="${key}"` });
  }
  inserts.sort((a, b) => b.at - a.at);
  let out = html;
  for (const { at, text } of inserts) out = out.slice(0, at) + text + out.slice(at);
  return { html: out, strings };
}

// The legal pages and their bundle names (bundle files live at public/locales/legal/<bundle>/<locale>.json).
export const LEGAL_PAGES = [
  { file: 'privacy.html', bundle: 'privacy' },
  { file: 'terms.html', bundle: 'terms' },
  { file: 'privacy/buffett-indicator/index.html', bundle: 'bi-privacy' },
];
