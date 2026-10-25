// Lightweight i18n for the static landing pages.
// Loads /locales/<code>.json on demand, swaps any element with
// data-i18n / data-i18n-html, and follows the browser's language list
// (navigator.languages) on every visit. Only a language the visitor picks in
// the switcher is remembered (localStorage dv_locale_choice); an auto-detected
// one never is, so a change of system/browser language takes effect at once.
// A link can force a language with ?lang=ja (or ?hl=ja) for that visit only
// (sessionStorage): one shared or search-result link must never freeze a reader in
// a language their phone is not set to. "Automatic" in the switcher forgets a pick.
// Order: URL parameter > this visit's URL language > remembered pick > browser languages.
//
// The language switcher is rendered here, once, into every element marked
// [data-locale-switcher] (header and footer), so all mount points share one
// component and stay in sync. Native language names are hard-coded below: the
// picker never depends on the page having been translated.
(function () {
  // label = the language's own name (shown in the picker), code = short tag on the button.
  var LOCALES = {
    'en':     { label: 'English',          code: 'EN' },
    'de':     { label: 'Deutsch',          code: 'DE' },
    'es-419': { label: 'Español (LatAm)',  code: 'ES' },
    'es-ES':  { label: 'Español (España)', code: 'ES' },
    'fr':     { label: 'Français',         code: 'FR' },
    'hi':     { label: 'हिन्दी',            code: 'HI' },
    'id':     { label: 'Bahasa Indonesia', code: 'ID' },
    'it':     { label: 'Italiano',         code: 'IT' },
    'ja':     { label: '日本語',            code: 'JA' },
    'ko':     { label: '한국어',            code: 'KO' },
    'pt-BR':  { label: 'Português (BR)',   code: 'PT' },
    'zh':     { label: '简体中文',          code: 'ZH' },
    'zh-Hant': { label: '繁體中文',         code: '繁' }
  };
  // The switcher's first row: follow the device language (no pick remembered).
  var AUTO_LABEL = { 'en': 'Automatic', 'de': 'Automatisch', 'es-419': 'Automático', 'es-ES': 'Automático', 'fr': 'Automatique',
    'hi': 'स्वचालित', 'id': 'Otomatis', 'it': 'Automatico', 'ja': '自動', 'ko': '자동', 'pt-BR': 'Automático',
    'zh': '自动（跟随系统）', 'zh-Hant': '自動（跟隨系統）' };
  var RTL = { ar: 1, he: 1, fa: 1, ur: 1 };
  var DEFAULT_LOCALE = 'en';
  // The old key 'dv_locale' also stored auto-detected languages, which froze every
  // visitor in their first-visit language: it is ignored (and removed) from now on.
  var STORAGE_KEY = 'dv_locale_choice';
  var VISIT_KEY = 'dv_locale_choice_visit';
  try { localStorage.removeItem('dv_locale'); } catch (e) {}
  var cache = {};

  // Map one language tag (from ?lang= or navigator.languages) to a supported locale, or null.
  function resolveTag(tag) {
    var raw = String(tag || '').trim().replace(/_/g, '-').toLowerCase();
    if (!raw) return null;
    // Exact match first (e.g., 'es-es' → 'es-ES', 'pt-br' → 'pt-BR')
    var exact = Object.keys(LOCALES).find(function (k) { return k.toLowerCase() === raw; });
    if (exact) return exact;
    // Spanish: Spain stays Spain, everything else gets LatAm
    if (raw === 'es' || raw.indexOf('es-') === 0) return 'es-419';
    // Chinese: Traditional for Taiwan / Hong Kong / Macau and the Hant script, Simplified otherwise
    if (/^zh-(hant|tw|hk|mo)/.test(raw)) return 'zh-Hant';
    if (raw === 'zh' || raw.indexOf('zh-') === 0) return 'zh';
    // Portuguese: BR for now
    if (raw === 'pt' || raw.indexOf('pt-') === 0) return 'pt-BR';
    // Prefix match for everything else (e.g., 'fr-CA' → 'fr')
    var prefix = raw.split('-')[0];
    return Object.keys(LOCALES).find(function (k) { return k.toLowerCase() === prefix; }) || null;
  }

  // ?lang=xx or ?hl=xx → a supported locale, or null (absent or unsupported value).
  function urlOverride() {
    var search = '';
    try { search = (typeof location !== 'undefined' && location.search) || ''; } catch (e) {}
    var m = /[?&](?:lang|hl)=([^&#]*)/i.exec(search);
    if (!m) return null;
    var value = m[1];
    try { value = decodeURIComponent(value); } catch (e) {}
    return resolveTag(value);
  }

  function detectLocale() {
    var forced = urlOverride();
    if (forced) return forced;

    var visit = null;
    try { visit = sessionStorage.getItem(VISIT_KEY); } catch (e) {}
    if (visit && LOCALES[visit]) return visit;

    var stored = storedPick();
    if (stored) return stored;
    return browserLocale();
  }

  function storedPick() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    return stored && LOCALES[stored] ? stored : null;
  }

  function browserLocale() {
    var browser = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < browser.length; i++) {
      var found = resolveTag(browser[i]);
      if (found) return found;
    }
    return DEFAULT_LOCALE;
  }

  function forgetPick() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    try { sessionStorage.removeItem(VISIT_KEY); } catch (e) {}
  }

  function loadTranslations(locale) {
    if (cache[locale]) return Promise.resolve(cache[locale]);
    return fetch('/locales/' + locale + '.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .then(function (json) { cache[locale] = json; return json; })
      .catch(function () { cache[locale] = {}; return {}; });
  }

  function applyTranslations(translations, fallback) {
    function lookup(key) {
      if (key in translations) return translations[key];
      if (fallback && key in fallback) return fallback[key];
      return undefined;
    }
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = lookup(el.getAttribute('data-i18n'));
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = lookup(el.getAttribute('data-i18n-html'));
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      // Format: "title:key.one|aria-label:key.two"
      el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
        var parts = pair.split(':');
        var v = lookup(parts[1]);
        if (v !== undefined) el.setAttribute(parts[0], v);
      });
    });
  }

  // ---- Switcher component -------------------------------------------------
  var CSS =
    '.locale-switcher{position:relative;display:inline-block;--dv-ls-fg:#3a3a3f;--dv-ls-border:rgba(15,23,60,.16);--dv-ls-hover:rgba(15,23,60,.06);--dv-ls-bg:#fff;--dv-ls-menu-border:rgba(15,23,60,.1);--dv-ls-muted:#6e6e73;--dv-ls-accent:#946515}' +
    '@media (prefers-color-scheme:dark){.locale-switcher{--dv-ls-fg:#d2d2d7;--dv-ls-border:rgba(255,255,255,.22);--dv-ls-hover:rgba(255,255,255,.1);--dv-ls-bg:#1d1d1f;--dv-ls-menu-border:rgba(255,255,255,.14);--dv-ls-muted:#a1a1a6;--dv-ls-accent:#f4cc77}}' +
    '.locale-trigger{display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:14px;font-weight:600;line-height:1;color:var(--dv-ls-fg);background:transparent;border:1px solid var(--dv-ls-border);border-radius:999px;padding:9px 12px;cursor:pointer;transition:background .15s ease,border-color .15s ease}' +
    '.locale-trigger:hover{background:var(--dv-ls-hover)}' +
    '.locale-trigger:focus-visible,.locale-item:focus-visible{outline:2px solid var(--dv-ls-accent);outline-offset:2px}' +
    '.locale-switcher[data-locale-placement="footer"] .locale-trigger{border-color:transparent;padding:4px 0;font-weight:500;font-size:inherit;color:inherit}' +
    '.locale-switcher[data-locale-placement="footer"] .locale-trigger:hover{background:transparent;color:var(--dv-ls-fg)}' +
    '.locale-menu{display:none;position:absolute;top:calc(100% + 8px);right:0;width:240px;max-width:calc(100vw - 32px);max-height:min(560px,80vh);overflow-y:auto;background:var(--dv-ls-bg);border:1px solid var(--dv-ls-menu-border);border-radius:16px;box-shadow:0 12px 36px -8px rgba(15,23,60,.28);padding:6px;z-index:60}' +
    '.locale-switcher[data-locale-placement="footer"] .locale-menu{top:auto;right:auto;bottom:calc(100% + 8px);left:0}' +
    '.locale-menu.open{display:block}' +
    '@media (max-width:480px){.locale-switcher[data-locale-placement="header"] .locale-trigger{padding:9px}.locale-switcher[data-locale-placement="header"] [data-locale-current],.locale-switcher[data-locale-placement="header"] .locale-caret{display:none}}' +
    '.locale-item{display:flex;align-items:center;justify-content:space-between;width:100%;padding:10px 12px;border-radius:10px;background:transparent;border:0;font:inherit;font-size:15px;font-weight:600;text-align:start;cursor:pointer;color:var(--dv-ls-fg)}' +
    '.locale-item:hover{background:var(--dv-ls-hover)}' +
    '.locale-item .locale-check{color:var(--dv-ls-accent);font-weight:700;opacity:0;margin-inline-start:8px}' +
    '.locale-item.active .locale-check{opacity:1}' +
    '.locale-item.locale-auto{border-bottom:1px solid var(--dv-ls-menu-border);border-radius:10px 10px 0 0;margin-bottom:4px}';

  var GLOBE =
    '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">' +
    '<circle cx="10" cy="10" r="7.4" stroke="currentColor" stroke-width="1.6"/>' +
    '<path d="M2.6 10h14.8M10 2.6c2 2.2 3.1 4.8 3.1 7.4 0 2.6-1.1 5.2-3.1 7.4M10 2.6c-2 2.2-3.1 4.8-3.1 7.4 0 2.6 1.1 5.2 3.1 7.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CARET =
    '<svg class="locale-caret" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false">' +
    '<path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var currentLocale = DEFAULT_LOCALE;
  var menuSeq = 0;

  function allMenus() { return Array.prototype.slice.call(document.querySelectorAll('.locale-menu')); }
  function triggerOf(menu) { return menu.parentNode && menu.parentNode.querySelector('.locale-trigger'); }

  function closeMenus(except) {
    allMenus().forEach(function (menu) {
      if (menu === except) return;
      menu.classList.remove('open');
      var t = triggerOf(menu);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  function openMenu(menu, focusTarget) {
    closeMenus(menu);
    menu.classList.add('open');
    var t = triggerOf(menu);
    if (t) t.setAttribute('aria-expanded', 'true');
    var items = menu.querySelectorAll('.locale-item');
    var target = focusTarget === 'last' ? items[items.length - 1] : (menu.querySelector('.locale-item.active') || items[0]);
    if (target && target.focus) target.focus();
  }

  function updateSwitcherUI(locale) {
    var meta = LOCALES[locale];
    currentLocale = locale;
    document.querySelectorAll('[data-locale-current]').forEach(function (el) { el.textContent = meta.code; });
    document.querySelectorAll('.locale-trigger').forEach(function (el) {
      el.setAttribute('aria-label', 'Language: ' + meta.label);
      el.setAttribute('title', meta.label);
    });
    var auto = !storedPick();   // "Automatic" stays ticked until the visitor picks a language
    document.querySelectorAll('[data-locale-option]').forEach(function (el) {
      var code = el.getAttribute('data-locale-option');
      var isActive = auto ? code === 'auto' : code === locale;
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (code === 'auto') {
        var name = el.querySelector('.locale-name');
        if (name) name.textContent = AUTO_LABEL[locale] || AUTO_LABEL.en;
      }
    });
  }

  function applyDocumentLocale(locale) {
    var root = document.documentElement;
    root.setAttribute('dir', RTL[locale.split('-')[0]] ? 'rtl' : 'ltr');
    root.setAttribute('lang', locale);
  }

  function setLocale(locale, remember) {
    if (!LOCALES[locale]) locale = DEFAULT_LOCALE;
    if (remember) {
      try { sessionStorage.removeItem(VISIT_KEY); } catch (e) {}
      try { localStorage.setItem(STORAGE_KEY, locale); } catch (e) {}
    }
    applyDocumentLocale(locale);
    return Promise.all([
      loadTranslations(locale),
      locale === DEFAULT_LOCALE ? Promise.resolve(null) : loadTranslations(DEFAULT_LOCALE)
    ]).then(function (results) {
      applyTranslations(results[0], results[1]);
      updateSwitcherUI(locale);
    });
  }

  // A pick made while the URL carries ?lang=/?hl= must also clear it, or a reload would revert the pick.
  function dropUrlOverride() {
    try {
      if (typeof location === 'undefined' || !/[?&](?:lang|hl)=/i.test(location.search || '')) return;
      var params = new URLSearchParams(location.search);
      params.delete('lang'); params.delete('hl');
      var qs = params.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + (location.hash || ''));
    } catch (e) {}
  }

  // A page whose body is not translated (privacy, terms) marks its switcher
  // data-locale-target="/": there a pick is remembered and opens the translated landing page.
  function pick(code, mount) {
    var target = mount.getAttribute('data-locale-target');
    if (code === 'auto') {
      forgetPick();
      dropUrlOverride();
      if (target) { location.href = target; return; }
      setLocale(browserLocale(), false);
      return;
    }
    if (target) {
      // Untranslated page: remember the pick, then show the landing page in that language.
      try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
      location.href = target + '?lang=' + encodeURIComponent(code);
      return;
    }
    dropUrlOverride();
    setLocale(code, true);   // an explicit pick is remembered
  }

  function renderSwitcher(mount) {
    var id = 'localeMenu' + (++menuSeq);
    mount.classList.add('locale-switcher');
    mount.innerHTML =
      '<button type="button" class="locale-trigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="' + id + '">' +
        GLOBE + '<span data-locale-current>' + LOCALES[currentLocale].code + '</span>' + CARET +
      '</button>' +
      '<div id="' + id + '" class="locale-menu" role="listbox" aria-label="Language">' +
      '<button type="button" role="option" class="locale-item locale-auto" tabindex="-1" aria-selected="false" data-locale-option="auto">' +
        '<span class="locale-name">' + (AUTO_LABEL[currentLocale] || AUTO_LABEL.en) + '</span>' +
        '<span class="locale-check" aria-hidden="true">✓</span>' +
      '</button>' +
      Object.keys(LOCALES).map(function (code) {
        return '<button type="button" role="option" class="locale-item" tabindex="-1" aria-selected="false" data-locale-option="' + code + '" lang="' + code + '">' +
          '<span class="locale-name">' + LOCALES[code].label + '</span>' +
          '<span class="locale-check" aria-hidden="true">✓</span>' +
        '</button>';
      }).join('') +
      '</div>';

    var trigger = mount.querySelector('.locale-trigger');
    var menu = mount.querySelector('.locale-menu');

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) closeMenus(); else openMenu(menu);
    });
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); openMenu(menu); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); openMenu(menu, 'last'); }
    });
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('[data-locale-option]');
      if (!item) return;
      pick(item.getAttribute('data-locale-option'), mount);
      closeMenus();
      trigger.focus();
    });
    menu.addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(menu.querySelectorAll('.locale-item'));
      var i = items.indexOf(document.activeElement);
      var next = -1;
      if (e.key === 'ArrowDown') next = (i + 1) % items.length;
      else if (e.key === 'ArrowUp') next = (i - 1 + items.length) % items.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = items.length - 1;
      else if (e.key === 'Escape') { e.preventDefault(); closeMenus(); trigger.focus(); return; }
      else if (e.key === 'Tab') { closeMenus(); return; }
      if (next >= 0) { e.preventDefault(); items[next].focus(); }
    });
  }

  var switcherReady = false;
  function initSwitcher() {
    if (switcherReady) return;
    switcherReady = true;
    var mounts = document.querySelectorAll('[data-locale-switcher]');
    if (!mounts.length) return;
    if (document.head && document.createElement) {
      var style = document.createElement('style');
      style.setAttribute('data-locale-switcher-style', '');
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    mounts.forEach(renderSwitcher);
    // click outside closes every menu
    document.addEventListener('click', function () { closeMenus(); });
  }

  // index.html's <head> snippet marks <html class="i18n-pending"> for a visitor who will not read English, so the
  // English text never flashes before the swap; this lifts it (the snippet also lifts it after 2.5 s on its own).
  function revealPage() {
    try { document.documentElement.classList.remove('i18n-pending'); } catch (e) {}
  }

  // Expose for debugging / programmatic use
  window.__i18n = {
    setLocale: setLocale, detect: detectLocale, resolve: resolveTag, getLocales: function () { return LOCALES; },
    // forget an explicit pick and follow the browser again
    reset: function () { forgetPick(); return setLocale(detectLocale(), false); }
  };

  function start() {
    var locale = detectLocale();
    // ?lang=xx (hreflang, campaign and research-site links) holds for this visit, never as a remembered pick.
    if (urlOverride()) {
      try { sessionStorage.setItem(VISIT_KEY, locale); } catch (e) {}
    }
    currentLocale = locale;
    initSwitcher();
    if (document.querySelector('[data-locale-target]')) {
      updateSwitcherUI(locale);   // untranslated page: only the picker shows the language
      revealPage();
      return;
    }
    setLocale(locale, false).then(revealPage, revealPage);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
