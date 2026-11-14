// Writes public/sitemap.xml: one <url> per prerendered landing page (scripts/site-locales.mjs), each with
// the full set of hreflang alternates, then the single-URL pages. Run after adding a language:
//   node scripts/gen-sitemap.mjs [lastmod-of-landing-pages]
// `npm run test:i18n` checks the committed file lists every language.
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { SITE_LOCALES, SITE_ORIGIN, landingUrl, landingAlternates } from './site-locales.mjs';

const landingLastmod = process.argv[2] || new Date().toISOString().slice(0, 10);
// Pages with one URL in every language (translated in the browser)
const PAGES = [
  { path: '/buffett-indicator/', lastmod: landingLastmod, changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy.html', lastmod: landingLastmod, changefreq: 'monthly', priority: '0.6' },
  { path: '/terms.html', lastmod: landingLastmod, changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy/buffett-indicator/', lastmod: landingLastmod, changefreq: 'monthly', priority: '0.5' },
];

const alternates = landingAlternates()
  .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
  .join('\n');
const landing = SITE_LOCALES.map((loc) => `  <url>
    <loc>${landingUrl(loc)}</loc>
    <lastmod>${landingLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${loc.code === 'en' ? '1.0' : '0.9'}</priority>
${alternates}
  </url>`);
const pages = PAGES.map((p) => `  <url>
    <loc>${SITE_ORIGIN}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${landing.concat(pages).join('\n')}
</urlset>
`;
writeFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${SITE_LOCALES.length} landing pages + ${PAGES.length} pages`);
