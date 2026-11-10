// Build-time prerender of a translated copy of the landing page (used by vite.config.ts).
//
// The landing page is one English document that /i18n.js translates in the browser. Search engines
// and AI crawlers mostly read the HTML as served, so they only ever saw English. This module takes
// the built English index.html and writes the same page with the strings of one locale file
// (public/locales/<locale>.json) already in place, plus its own <html lang>, <title>, description,
// canonical, Open Graph / Twitter tags and JSON-LD. No new copy is written here: every visible
// string comes from the locale file; the few head strings are passed in by the caller.
import { JSDOM } from 'jsdom';

/**
 * @param {string} html      built English index.html
 * @param {Record<string,string>} strings  the locale's i18n strings (public/locales/<locale>.json)
 * @param {{ locale: string, url: string, homeUrl: string, title: string, description: string,
 *           ogLocale: string, appDescription: string, homeHref?: string }} opts
 *   homeHref: where the logo links (default: this page's own path, right for a translated landing page;
 *   a sub-page such as the calculator passes the landing page of its language)
 * @returns {string} the translated document
 */
export function renderLocalePage(html, strings, opts) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const root = doc.documentElement;

  // <html lang> and the marker /i18n.js reads: with no explicit pick this page stays in its own language
  root.setAttribute('lang', opts.locale);
  root.setAttribute('data-page-locale', opts.locale);

  // Visible text, exactly as /i18n.js would set it (keys missing from the locale keep the English text)
  doc.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = strings[el.getAttribute('data-i18n')];
    if (v !== undefined) el.textContent = v;
  });
  doc.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const v = strings[el.getAttribute('data-i18n-html')];
    if (v !== undefined) el.innerHTML = v;
  });
  doc.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.getAttribute('data-i18n-attr').split('|').forEach((pair) => {
      const [attr, key] = pair.split(':');
      if (strings[key] !== undefined) el.setAttribute(attr, strings[key]);
    });
  });

  // The logo links home: on this page "home" is the translated landing page
  const homeHref = opts.homeHref ?? new URL(opts.url).pathname;
  doc.querySelectorAll('a[href="/"]').forEach((a) => a.setAttribute('href', homeHref));

  // Head
  doc.title = opts.title;
  const setMeta = (selector, value) => {
    const el = doc.head.querySelector(selector);
    if (el) el.setAttribute('content', value);
  };
  setMeta('meta[name="description"]', opts.description);
  setMeta('meta[property="og:title"]', opts.title);
  setMeta('meta[property="og:description"]', opts.description);
  setMeta('meta[property="og:url"]', opts.url);
  setMeta('meta[name="twitter:title"]', opts.title);
  setMeta('meta[name="twitter:description"]', opts.description);
  const canonical = doc.head.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', opts.url);
  let ogLocale = doc.head.querySelector('meta[property="og:locale"]');
  if (!ogLocale) {
    ogLocale = doc.createElement('meta');
    ogLocale.setAttribute('property', 'og:locale');
    doc.head.querySelector('meta[property="og:url"]')?.after(ogLocale);
  }
  ogLocale.setAttribute('content', opts.ogLocale);

  // JSON-LD: the parts that describe the product, in the page's language
  const ld = doc.head.querySelector('script[type="application/ld+json"]');
  if (ld) {
    const data = JSON.parse(ld.textContent);
    const graph = data['@graph'] || [];
    for (const node of graph) {
      if (node['@type'] === 'SoftwareApplication') {
        node.description = opts.appDescription;
        node.inLanguage = opts.locale;
      }
      if (node['@type'] === 'FAQPage') {
        node['@id'] = `${opts.url}#faq`;
        node.inLanguage = opts.locale;
        // Pair each English question with the locale's faq.qN / faq.aN (or faq.aNHtml) by position
        node.mainEntity = node.mainEntity.map((q, i) => {
          const n = i + 1;
          const name = strings[`faq.q${n}`];
          const text = strings[`faq.a${n}`] ?? strings[`faq.a${n}Html`];
          return name && text ? { ...q, name, acceptedAnswer: { ...q.acceptedAnswer, text } } : q;
        });
      }
    }
    const webPage = {
      '@type': 'WebPage',
      '@id': `${opts.url}#webpage`,
      url: opts.url,
      name: opts.title,
      description: opts.description,
      inLanguage: opts.locale,
      isPartOf: { '@id': `${opts.homeUrl}#website` },
    };
    // A page that already describes itself as a WebPage (the calculator) gets that node replaced, not a second one
    const existing = graph.findIndex((node) => node['@type'] === 'WebPage');
    if (existing >= 0) graph[existing] = webPage;
    else graph.push(webPage);
    for (const node of graph) {
      if (node['@type'] === 'WebApplication') {
        node.url = opts.url;
        node.inLanguage = opts.locale;
        node.isPartOf = { '@id': webPage['@id'] };
      }
    }
    ld.textContent = `\n${JSON.stringify(data, null, 2)}\n`;
  }

  return dom.serialize();
}
