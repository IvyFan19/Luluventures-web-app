import { resolve } from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { renderLocalePage } from './scripts/prerender-locale.mjs';
import { segmentLegal } from './scripts/legal-segments.mjs';
import { SITE_LOCALES, SITE_ORIGIN, landingUrl } from './scripts/site-locales.mjs';

// Dev-only: serve /app and /app/* (no file extension) from app.html, mirroring
// the CloudFront rewrite that's expected in production for the React SPA.
// Also serves the extensionless /privacy/buffett-indicator and /buffett-indicator
// clean URLs from their directory index, mirroring how S3/CloudFront resolves
// them in production.
const appHtmlRewrite = (): Plugin => ({
  name: 'app-html-rewrite',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = req.url ?? '';
      const pathOnly = url.split('?')[0];
      const hasExtension = /\.[a-zA-Z0-9]+$/.test(pathOnly);
      if (!hasExtension && (pathOnly === '/app' || pathOnly.startsWith('/app/'))) {
        req.url = '/app.html' + url.slice(pathOnly.length);
      } else if (pathOnly === '/privacy/buffett-indicator') {
        req.url = '/privacy/buffett-indicator/index.html' + url.slice(pathOnly.length);
      } else if (pathOnly === '/buffett-indicator') {
        req.url = '/buffett-indicator/index.html' + url.slice(pathOnly.length);
      }
      next();
    });
  },
});

// Build-only: emit /<slug>/index.html for every language in scripts/site-locales.mjs (e.g. /de/, /zh-hant/),
// the landing page prerendered from public/locales/<code>.json (scripts/prerender-locale.mjs), so crawlers
// read each language as HTML. The in-browser language switch keeps working on every page through /i18n.js.
const localeLandings = (): Plugin => ({
  name: 'locale-landings',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const index = bundle['index.html'];
    if (!index || index.type !== 'asset') return;
    for (const loc of SITE_LOCALES) {
      if (loc.code === 'en') continue;
      const strings = JSON.parse(readFileSync(resolve(__dirname, `public/locales/${loc.code}.json`), 'utf8'));
      this.emitFile({
        type: 'asset',
        fileName: `${loc.slug}/index.html`,
        source: renderLocalePage(String(index.source), strings, {
          locale: loc.hreflang,
          pageLocale: loc.code,
          dir: loc.rtl ? 'rtl' : 'ltr',
          url: landingUrl(loc),
          homeUrl: `${SITE_ORIGIN}/`,
          // Head strings: seo.title carries the landing keywords in each language; the hero subtitle describes the page
          title: strings['seo.title'],
          description: strings['hero.subtitle'],
          ogLocale: loc.og,
          appDescription: strings['hero.subtitle'],
        }),
      });
    }
  },
});

// The legal pages (privacy, terms, Buffett Indicator privacy) mark <html data-i18n-bundle="legal/<name>">: every
// block of text gets a data-i18n-html key derived from its English (scripts/legal-segments.mjs), and /i18n.js
// swaps it from public/locales/legal/<name>/<locale>.json. Runs in dev and build, so both serve the same page.
const legalSegments = (): Plugin => ({
  name: 'legal-segments',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      const m = /<html[^>]*data-i18n-bundle="legal\/([\w-]+)"/.exec(html);
      return m ? segmentLegal(html, m[1]).html : html;
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), appHtmlRewrite(), legalSegments(), localeLandings()],
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        // Static marketing landing page (mock-wallstreet design)
        main: resolve(__dirname, 'index.html'),
        // React SPA shell — serves /app and React Router sub-routes
        app: resolve(__dirname, 'app.html'),
        // Static legal pages
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
        // App-specific privacy policy (Buffett Indicator iOS / Buffett Indicator & Shiller PE Android)
        'privacy-buffett-indicator': resolve(__dirname, 'privacy/buffett-indicator/index.html'),
        // Landing page for the Buffett Indicator app (iOS) / Buffett Indicator & Shiller PE (Android)
        'buffett-indicator': resolve(__dirname, 'buffett-indicator/index.html'),
        // Static API references landing page
        api: resolve(__dirname, 'api.html'),
      },
    },
  },
  server: {
    port: 53210,
    strictPort: true,
    host: true,
  },
});
