// Language switcher tests: `npm run test:i18n` (runs after scripts/test-i18n.cjs).
//  1. static: every page with the site header carries the switcher mount inside <header>,
//     every page loads /i18n.js, no page declares hreflang alternates (one URL per page, translated client-side);
//  2. data: every locale file has a native-name entry in LOCALES (and no stray entries);
//  3. ?lang= / ?hl= URL override resolves, holds for the visit only (sessionStorage), and beats a stored pick;
//  4. DOM (jsdom): header + footer switchers render 12 native names, stay in sync, open/close
//     with the keyboard, update <html lang>, and persist the choice.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const check = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : ': ' + JSON.stringify(got) + ' (want ' + JSON.stringify(want) + ')'));
  if (!ok) process.exitCode = 1;
};
const src = read('public/i18n.js');

// ---- load LOCALES from the real script ----
function boot(opts) {
  opts = opts || {};
  const data = opts.store || {}, sdata = opts.session || {};
  const ls = { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = String(v); }, removeItem: (k) => { delete data[k]; } };
  const ss = { getItem: (k) => (k in sdata ? sdata[k] : null), setItem: (k, v) => { sdata[k] = String(v); }, removeItem: (k) => { delete sdata[k]; } };
  const attrs = {};
  const html = { setAttribute: (k, v) => { attrs[k] = v; } };
  const win = {};
  const langs = opts.langs || ['en-US'];
  vm.runInNewContext(src, {
    window: win, localStorage: ls, sessionStorage: ss, navigator: { languages: langs, language: langs[0] },
    location: { search: opts.search || '', pathname: '/', hash: '' },
    history: { replaceState() {} }, URLSearchParams,
    document: { readyState: 'complete', documentElement: html, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {} },
    fetch: () => Promise.resolve({ ok: false, json: () => ({}) }), Promise, Object, console, decodeURIComponent, setTimeout,
  });
  return { api: win.__i18n, store: data, session: sdata, attrs };
}

// ---- 1. static markup ----
const pages = ['index.html', 'api.html', 'privacy.html', 'terms.html'];
pages.forEach((f) => {
  const html = read(f);
  const header = (/<header[\s\S]*?<\/header>/.exec(html) || [''])[0];
  check(f + ': switcher mount inside <header>', /data-locale-switcher/.test(header), true);
  check(f + ': loads /i18n.js', /<script[^>]+src="\/i18n\.js(\?[^"]*)?"[^>]*defer/.test(html), true);
});
// app.html is only the React shell (no static header; the app has its own UI).
const index = read('index.html');
const footer = (/<footer[\s\S]*?<\/footer>/.exec(index) || [''])[0];
check('index.html: footer switcher mount kept', /data-locale-switcher/.test(footer), true);

// ---- 2. native names for every locale ----
const locales = boot().api.getLocales();
const codes = Object.keys(locales).sort();
const files = fs.readdirSync(path.join(root, 'public', 'locales')).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', '')).sort();
check('LOCALES covers exactly the locale files', codes, files);
const wantLabels = { en: 'English', de: 'Deutsch', 'es-419': 'Español (LatAm)', 'es-ES': 'Español (España)', fr: 'Français', hi: 'हिन्दी', id: 'Bahasa Indonesia', it: 'Italiano', ja: '日本語', ko: '한국어', 'pt-BR': 'Português (BR)', zh: '简体中文', 'zh-Hant': '繁體中文' };
check('native name for every locale', codes.map((c) => [c, locales[c].label]), Object.keys(wantLabels).sort().map((c) => [c, wantLabels[c]]));
check('every locale has a short code', codes.every((c) => /^([A-Z]{2}|繁)$/.test(locales[c].code)), true);

// ---- no hreflang: ?lang=xx serves the same English HTML as the canonical URL, so the pages
// declare one canonical each and no alternates (Google only pairs hreflang between distinct canonical URLs).
['index.html', 'buffett-indicator/index.html'].forEach((f) => {
  const html = read(f);
  check(f + ': no hreflang alternates', /hreflang=/.test(html), false);
  check(f + ': exactly one canonical', (html.match(/<link rel="canonical"/g) || []).length, 1);
});
check('sitemap.xml: no per-language alternates', /xhtml:link|hreflang=/.test(read('public/sitemap.xml')), false);

// ---- 3. URL override ----
const lang = (search, langs, store) => { const b = boot({ search, langs, store }); return { detected: b.api.detect(), store: b.store, attrs: b.attrs }; };
check('?lang=de resolves', lang('?lang=de', ['en-US']).detected, 'de');
check('?hl=ja resolves', lang('?hl=ja', ['en-US']).detected, 'ja');
check('?lang=pt -> pt-BR', lang('?lang=pt', ['en-US']).detected, 'pt-BR');
check('?lang=es_MX -> es-419', lang('?lang=es_MX', ['en-US']).detected, 'es-419');
check('?lang=ZH-hans -> zh', lang('?x=1&lang=ZH-hans', ['en-US']).detected, 'zh');
check('?lang=zh-TW -> zh-Hant', lang('?lang=zh-TW', ['en-US']).detected, 'zh-Hant');
check('Hong Kong / Taiwan / Hant phones -> zh-Hant', ['zh-HK', 'zh-TW', 'zh-Hant-TW', 'zh-MO'].map((t) => lang('', [t]).detected), ['zh-Hant', 'zh-Hant', 'zh-Hant', 'zh-Hant']);
check('mainland / Singapore / Hans phones -> zh', ['zh-CN', 'zh-SG', 'zh-Hans-CN', 'zh'].map((t) => lang('', [t]).detected), ['zh', 'zh', 'zh', 'zh']);
check('?lang=es-ES keeps Spain', lang('?lang=es-ES', ['en-US']).detected, 'es-ES');
check('?lang=xx (unsupported) falls back to the browser', lang('?lang=xx', ['fr-FR']).detected, 'fr');
check('URL override beats a remembered pick', lang('?lang=ko', ['en-US'], { dv_locale_choice: 'de' }).detected, 'ko');
check('no URL override: remembered pick still wins over the browser', lang('', ['fr-FR'], { dv_locale_choice: 'de' }).detected, 'de');
check('no URL override, no pick: browser language', lang('', ['it-IT']).detected, 'it');
{
  const b = boot({ search: '?lang=ja', langs: ['en-US'] });
  b.api.setLocale('ja', true);
  check('setLocale sets <html lang> and dir', [b.attrs.lang, b.attrs.dir], ['ja', 'ltr']);
  check('explicit pick stored under dv_locale_choice', b.store.dv_locale_choice, 'ja');
}
{
  const b = boot({ search: '?lang=pt-BR' });
  check('?lang= sets the full <html lang> tag for this visit only', [b.attrs.lang, b.store.dv_locale_choice, b.session.dv_locale_choice_visit], ['pt-BR', undefined, 'pt-BR']);
  const next = boot({ session: { dv_locale_choice_visit: 'pt-BR' }, langs: ['de-DE'] });
  check('the visit language carries to the next page of the visit', next.api.detect(), 'pt-BR');
  check('a new visit follows the phone again', boot({ langs: ['de-DE'] }).api.detect(), 'de');
}
{
  const b = boot({ langs: ['de-DE'] });
  check('auto-detect alone stores nothing', b.store, {});
}

// ---- 4. DOM behaviour with jsdom ----
let JSDOM;
try { ({ JSDOM } = require('jsdom')); } catch (e) { console.log('SKIP DOM tests (jsdom not installed: run npm ci)'); process.exit(); }
function dom(url, store) {
  const d = new JSDOM(
    '<!doctype html><html lang="en"><head></head><body>' +
    '<header><nav><div data-locale-switcher data-locale-placement="header" id="h"></div></nav></header>' +
    '<footer><div data-locale-switcher data-locale-placement="footer" id="f"></div></footer>' +
    '<h1 data-i18n="t">Hello</h1></body></html>',
    { url, runScripts: 'outside-only', pretendToBeVisual: true });
  const w = d.window;
  Object.keys(store || {}).forEach((k) => w.localStorage.setItem(k, store[k]));
  w.navigator.__defineGetter__('languages', () => ['en-US']);
  w.fetch = (u) => Promise.resolve({ ok: true, json: () => Promise.resolve(u.indexOf('ja.json') >= 0 ? { t: 'こんにちは' } : { t: 'Hello' }) });
  w.eval(src);
  return w;
}
const tick = () => new Promise((r) => setTimeout(r, 30));
const key = (w, el, k) => el.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true }));
(async () => {
  const w = dom('https://deepvalues.ai/');
  await tick();
  const d = w.document;
  check('DOM: two switchers rendered', d.querySelectorAll('.locale-trigger').length, 2);
  check('DOM: Automatic + 13 native names in the header menu', [...d.querySelectorAll('#h .locale-name')].map((e) => e.textContent), ['Automatic'].concat(Object.values(wantLabels)));
  check('DOM: trigger starts as EN', d.querySelector('#h [data-locale-current]').textContent, 'EN');
  const trig = d.querySelector('#h .locale-trigger'), menu = d.querySelector('#h .locale-menu');
  check('DOM: trigger a11y attributes', [trig.getAttribute('aria-haspopup'), trig.getAttribute('aria-expanded')], ['listbox', 'false']);
  trig.click();
  check('DOM: click opens the menu', [menu.classList.contains('open'), trig.getAttribute('aria-expanded')], [true, 'true']);
  check('DOM: focus lands on the active option (Automatic until a pick)', d.activeElement.getAttribute('data-locale-option'), 'auto');
  key(w, d.activeElement, 'ArrowDown');
  check('DOM: ArrowDown moves to the next option', d.activeElement.getAttribute('data-locale-option'), 'en');
  key(w, d.activeElement, 'End');
  check('DOM: End moves to the last option', d.activeElement.getAttribute('data-locale-option'), 'zh-Hant');
  key(w, d.activeElement, 'Escape');
  check('DOM: Escape closes and returns focus to the trigger', [menu.classList.contains('open'), d.activeElement === trig], [false, true]);
  trig.click();
  d.body.click();
  check('DOM: click outside closes the menu', menu.classList.contains('open'), false);
  // pick Japanese from the FOOTER switcher: both mounts and the page follow
  d.querySelector('#f .locale-trigger').click();
  d.querySelector('#f [data-locale-option="ja"]').click();
  await tick();
  check('DOM: pick updates <html lang>/dir', [d.documentElement.lang, d.documentElement.dir], ['ja', 'ltr']);
  check('DOM: pick is remembered', w.localStorage.getItem('dv_locale_choice'), 'ja');
  check('DOM: header and footer buttons stay in sync', [d.querySelector('#h [data-locale-current]').textContent, d.querySelector('#f [data-locale-current]').textContent], ['JA', 'JA']);
  check('DOM: both menus mark the active option', [d.querySelector('#h .active').dataset.localeOption, d.querySelector('#f .active').dataset.localeOption], ['ja', 'ja']);
  check('DOM: page text translated', d.querySelector('h1').textContent, 'こんにちは');
  check('DOM: picker labels stay native after the switch', d.querySelector('#h [data-locale-option="de"] .locale-name').textContent, 'Deutsch');
  check('DOM: only one menu open at a time', d.querySelectorAll('.locale-menu.open').length, 0);

  // ?lang=ja on arrival; then an explicit pick drops the param so a reload does not undo it
  const w2 = dom('https://deepvalues.ai/?lang=ja&utm_source=x');
  await tick();
  check('DOM: ?lang=ja renders Japanese for this visit, nothing remembered', [w2.document.documentElement.lang, w2.localStorage.getItem('dv_locale_choice'), w2.sessionStorage.getItem('dv_locale_choice_visit'), w2.document.querySelector('#h [data-locale-current]').textContent], ['ja', null, 'ja', 'JA']);
  w2.document.querySelector('#h .locale-trigger').click();
  w2.document.querySelector('#h [data-locale-option="en"]').click();
  await tick();
  check('DOM: a pick removes ?lang= but keeps other params', w2.location.search, '?utm_source=x');
  check('DOM: the pick sticks', w2.localStorage.getItem('dv_locale_choice'), 'en');
  check('DOM: a pick ticks that language, not Automatic', w2.document.querySelector('#h .active').dataset.localeOption, 'en');
  // "Automatic" forgets the pick and follows the device language again
  w2.document.querySelector('#h .locale-trigger').click();
  w2.document.querySelector('#h [data-locale-option="auto"]').click();
  await tick();
  check('DOM: Automatic forgets the pick', [w2.localStorage.getItem('dv_locale_choice'), w2.sessionStorage.getItem('dv_locale_choice_visit')], [null, null]);
  check('DOM: Automatic is ticked again', w2.document.querySelector('#h .active').dataset.localeOption, 'auto');
})().catch((e) => { console.log('FAIL DOM tests crashed: ' + e.stack); process.exitCode = 1; });
