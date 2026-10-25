// Behaviour test for public/i18n.js (no dependencies): `npm run test:i18n`.
// Runs the real script against a fake browser: the browser's language list decides on every
// visit, only an explicit pick from the switcher is remembered, and the old auto-saved
// dv_locale key (which froze visitors in their first-visit language) is ignored.
const fs = require('fs'), vm = require('vm');
const path = require('path');
const src = fs.readFileSync(process.argv[2] || path.join(__dirname, '..', 'public', 'i18n.js'), 'utf8');
function visit(langs, store) {
  const ls = { data: store, getItem(k) { return k in this.data ? this.data[k] : null; }, setItem(k, v) { this.data[k] = String(v); }, removeItem(k) { delete this.data[k]; } };
  const html = { lang: '', setAttribute(k, v) { this.lang = v; } };
  const win = {};
  const ctx = { window: win, localStorage: ls, navigator: { languages: langs, language: langs[0] },
    document: { readyState: 'complete', documentElement: html, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {} },
    fetch: () => Promise.resolve({ ok: false, json: () => ({}) }), Promise, Object, console };
  vm.runInNewContext(src, ctx);
  return { get html() { return html.lang; }, api: win.__i18n };
}
const check = (name, got, want) => { console.log((got === want ? 'PASS ' : 'FAIL ') + name + ': ' + got + (got === want ? '' : ' (want ' + want + ')')); if (got !== want) process.exitCode = 1; };
let store = {};
let v = visit(['zh-TW', 'en'], store);
check('first visit, Chinese browser -> zh', v.html, 'zh');
check('auto-detected language is not saved', JSON.stringify(store), '{}');
store = { dv_locale: 'en' };
v = visit(['zh-CN', 'en'], store);
check('old frozen dv_locale=en is ignored -> zh', v.html, 'zh');
check('old key removed', 'dv_locale' in store, false);
v.api.setLocale('ja', true);
check('explicit pick is remembered', store.dv_locale_choice, 'ja');
v = visit(['fr-FR'], store);
check('explicit pick wins over browser on next visit', v.html, 'ja');
v.api.reset();
check('reset follows the browser again', v.html, 'fr');
v = visit(['en-US', 'en', 'zh-CN'], {});
check("owner's Chrome order (en first) -> en", v.html, 'en');

// Key parity: every locale file carries exactly the keys en.json carries (a nav label or a
// section heading added in English only would fall back to English in every other language).
const localesDir = path.join(__dirname, '..', 'public', 'locales');
const enKeys = Object.keys(JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'))).sort();
fs.readdirSync(localesDir).filter((f) => f.endsWith('.json') && f !== 'en.json').sort().forEach((f) => {
  const keys = Object.keys(JSON.parse(fs.readFileSync(path.join(localesDir, f), 'utf8'))).sort();
  const missing = enKeys.filter((k) => !keys.includes(k)), extra = keys.filter((k) => !enKeys.includes(k));
  check(f + ' has the same keys as en.json', missing.concat(extra).join(',') || 'same', 'same');
});
