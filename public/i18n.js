// Lightweight i18n for the static landing pages.
// Loads /locales/<code>.json on demand, swaps any element with
// data-i18n / data-i18n-html, persists choice in localStorage,
// and auto-detects from navigator.language on first visit.
(function () {
  var LOCALES = {
    'en':     { name: 'English',    region: 'United States', code: 'EN' },
    'zh':     { name: '中文',       region: '简体',          code: 'ZH' },
    'fr':     { name: 'Français',   region: 'France',        code: 'FR' },
    'de':     { name: 'Deutsch',    region: 'Deutschland',   code: 'DE' },
    'hi':     { name: 'हिन्दी',      region: 'भारत',           code: 'HI' },
    'id':     { name: 'Indonesia',  region: 'Indonesia',     code: 'ID' },
    'it':     { name: 'Italiano',   region: 'Italia',        code: 'IT' },
    'ja':     { name: '日本語',     region: '日本',          code: 'JA' },
    'ko':     { name: '한국어',     region: '대한민국',      code: 'KO' },
    'pt-BR':  { name: 'Português',  region: 'Brasil',        code: 'PT' },
    'es-419': { name: 'Español',    region: 'Latinoamérica', code: 'ES' },
    'es-ES':  { name: 'Español',    region: 'España',        code: 'ES' }
  };
  var DEFAULT_LOCALE = 'en';
  var STORAGE_KEY = 'dv_locale';
  var cache = {};

  function detectLocale() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (stored && LOCALES[stored]) return stored;

    var browser = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < browser.length; i++) {
      var raw = (browser[i] || '').toLowerCase();
      // Exact match first (e.g., 'es-es' → 'es-ES', 'pt-br' → 'pt-BR')
      var exact = Object.keys(LOCALES).find(function (k) { return k.toLowerCase() === raw; });
      if (exact) return exact;
      // Spanish: most users get LatAm
      if (raw === 'es' || raw.indexOf('es-') === 0) return 'es-419';
      // Chinese: simplified for now
      if (raw === 'zh' || raw.indexOf('zh-') === 0) return 'zh';
      // Portuguese: BR for now
      if (raw === 'pt' || raw.indexOf('pt-') === 0) return 'pt-BR';
      // Prefix match for everything else (e.g., 'fr-CA' → 'fr')
      var prefix = raw.split('-')[0];
      var prefMatch = Object.keys(LOCALES).find(function (k) { return k.toLowerCase() === prefix; });
      if (prefMatch) return prefMatch;
    }
    return DEFAULT_LOCALE;
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

  function updateSwitcherUI(locale) {
    var meta = LOCALES[locale];
    var labelEl = document.querySelector('[data-locale-current]');
    if (labelEl) labelEl.textContent = meta.code;
    document.querySelectorAll('[data-locale-option]').forEach(function (el) {
      var isActive = el.getAttribute('data-locale-option') === locale;
      el.classList.toggle('active', isActive);
    });
  }

  function setLocale(locale) {
    if (!LOCALES[locale]) locale = DEFAULT_LOCALE;
    try { localStorage.setItem(STORAGE_KEY, locale); } catch (e) {}
    document.documentElement.setAttribute('lang', locale.split('-')[0]);
    return Promise.all([
      loadTranslations(locale),
      locale === DEFAULT_LOCALE ? Promise.resolve(null) : loadTranslations(DEFAULT_LOCALE)
    ]).then(function (results) {
      applyTranslations(results[0], results[1]);
      updateSwitcherUI(locale);
    });
  }

  function initSwitcher() {
    var trigger = document.getElementById('localeTrigger');
    var menu = document.getElementById('localeMenu');
    if (!trigger || !menu) return;

    // Build the menu items once
    menu.innerHTML = Object.keys(LOCALES).map(function (code) {
      var meta = LOCALES[code];
      return '<button type="button" class="locale-item" data-locale-option="' + code + '">' +
        '<span class="locale-name">' + meta.name + '</span>' +
        '<span class="locale-region">(' + meta.region + ')</span>' +
        '<span class="locale-check" aria-hidden="true">✓</span>' +
      '</button>';
    }).join('');

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function () { menu.classList.remove('open'); });
    menu.addEventListener('click', function (e) {
      var item = e.target.closest('[data-locale-option]');
      if (!item) return;
      setLocale(item.getAttribute('data-locale-option'));
      menu.classList.remove('open');
    });
  }

  // Expose for debugging / programmatic use
  window.__i18n = { setLocale: setLocale, getLocales: function () { return LOCALES; } };

  function start() {
    initSwitcher();
    setLocale(detectLocale());
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
