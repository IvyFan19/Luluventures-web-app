/**
 * DeepValues.AI — Google Analytics 4 (analytics only) + cookie consent.
 *
 * GA4 is used purely to understand traffic sources and feature usage on the
 * marketing site. It is NOT used for advertising or remarketing — the ad
 * consent signals stay denied even after the visitor accepts.
 *
 * GA4 loads behind Google Consent Mode v2: nothing is stored on the visitor's
 * device until they choose "Accept" in the banner. The choice is remembered in
 * localStorage so the banner only shows once. Footer "Cookies" links call
 * window.openCookieSettings() to let visitors change their mind later.
 *
 * CTA tracking: add data-ga-event="some_name" to any clickable element and a
 * GA event with that name fires on click.
 *
 * SETUP — replace GA_MEASUREMENT_ID below with your real GA4 Measurement ID:
 *   GA4 → Admin → Data streams → (your web stream) → "G-XXXXXXXXXX".
 * Until a real ID is set, no analytics is loaded and the banner stays hidden.
 */
(function () {
  'use strict';

  // ============ GA4 MEASUREMENT ID (DeepValues.AI Web stream) ============
  var GA_MEASUREMENT_ID = 'G-ZXM1LQ35PW';
  // ======================================================================

  var STORAGE_KEY = 'dv_cookie_consent'; // 'granted' | 'denied'
  var hasRealId = /^G-[A-Z0-9]{6,}$/.test(GA_MEASUREMENT_ID) && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

  // --- gtag bootstrap ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  function readChoice() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function saveChoice(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {} }
  // Analytics only — advertising signals are never granted.
  function updateConsent(state) { gtag('consent', 'update', { analytics_storage: state }); }

  // Consent Mode v2 — deny everything non-essential until the visitor accepts.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  // Re-apply a previously granted choice before GA initialises.
  if (readChoice() === 'granted') updateConsent('granted');

  // --- load GA4 (only once a real Measurement ID is set) ---
  if (hasRealId) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }

  // --- CTA event tracking: data-ga-event="name" on any element ---
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-ga-event]');
    if (!el) return;
    gtag('event', el.getAttribute('data-ga-event'), { transport_type: 'beacon' });
  });

  // --- consent banner ---
  function injectStyles() {
    if (document.getElementById('dv-cc-style')) return;
    var css = document.createElement('style');
    css.id = 'dv-cc-style';
    css.textContent =
      '#dv-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483600;max-width:560px;margin:0 auto;' +
      'background:#fff;color:#1d1d1f;border:1px solid #e2e2e4;border-radius:16px;' +
      'box-shadow:0 14px 44px rgba(7,13,31,.20);padding:18px 20px;' +
      "font-family:'IBM Plex Sans',system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.55;}" +
      '#dv-cc p{margin:0 0 14px;color:#3a3a3c;}' +
      '#dv-cc a{color:#0e85ff;text-decoration:underline;text-underline-offset:2px;}' +
      '#dv-cc .dv-cc-btns{display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;}' +
      '#dv-cc button{font:inherit;font-weight:600;border-radius:999px;padding:9px 20px;cursor:pointer;border:1px solid transparent;transition:opacity .15s ease;}' +
      '#dv-cc button:hover{opacity:.88;}' +
      '#dv-cc .dv-cc-reject{background:transparent;border-color:#d0d0d4;color:#1d1d1f;}' +
      '#dv-cc .dv-cc-accept{background:#0e85ff;color:#fff;}' +
      '@media (prefers-color-scheme:dark){' +
      '#dv-cc{background:#1d1d1f;color:#f5f5f7;border-color:rgba(255,255,255,.12);box-shadow:0 14px 44px rgba(0,0,0,.55);}' +
      '#dv-cc p{color:#c7c7cc;}#dv-cc a{color:#2997ff;}' +
      '#dv-cc .dv-cc-reject{border-color:rgba(255,255,255,.22);color:#f5f5f7;}}';
    document.head.appendChild(css);
  }
  function removeBanner() {
    var b = document.getElementById('dv-cc');
    if (b && b.parentNode) b.parentNode.removeChild(b);
  }
  function showBanner() {
    if (document.getElementById('dv-cc')) return;
    injectStyles();
    var box = document.createElement('div');
    box.id = 'dv-cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Cookie consent');
    box.innerHTML =
      '<p>We use analytics cookies to understand how the site is used. Essential cookies are always on. ' +
      'See our <a href="/privacy.html#cookies">Cookie Policy</a>.</p>' +
      '<div class="dv-cc-btns">' +
      '<button type="button" class="dv-cc-reject">Reject</button>' +
      '<button type="button" class="dv-cc-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(box);
    box.querySelector('.dv-cc-accept').addEventListener('click', function () { decide('granted'); });
    box.querySelector('.dv-cc-reject').addEventListener('click', function () { decide('denied'); });
  }
  function decide(choice) {
    saveChoice(choice);
    updateConsent(choice);
    removeBanner();
  }

  // Footer "Cookies" links call this to let visitors change their consent.
  window.openCookieSettings = function () { removeBanner(); showBanner(); };

  // Auto-show the banner on first visit once a real GA4 ID is set, so shipping
  // with the placeholder leaves production unchanged (no orphan banner). We also
  // auto-show on localhost so the banner is testable before a real ID exists.
  // openCookieSettings() still force-shows it for testing/withdrawal anywhere.
  var isLocalhost = ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(location.hostname) !== -1;
  function maybeShow() { if ((hasRealId || isLocalhost) && !readChoice()) showBanner(); }
  if (document.body) maybeShow();
  else document.addEventListener('DOMContentLoaded', maybeShow);
})();
