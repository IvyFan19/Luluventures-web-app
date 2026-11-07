import { resolve } from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';
import { renderLocalePage } from './scripts/prerender-locale.mjs';

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

// Build-only: emit /zh-hant/index.html, the landing page prerendered in Traditional Chinese from
// public/locales/zh-Hant.json (scripts/prerender-locale.mjs), so crawlers read Chinese HTML.
// The in-browser language switch keeps working on both pages through /i18n.js.
const ZH_HANT_URL = 'https://deepvalues.ai/zh-hant/';
const zhHantLanding = (): Plugin => ({
  name: 'zh-hant-landing',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const index = bundle['index.html'];
    if (!index || index.type !== 'asset') return;
    const strings = JSON.parse(readFileSync(resolve(__dirname, 'public/locales/zh-Hant.json'), 'utf8'));
    this.emitFile({
      type: 'asset',
      fileName: 'zh-hant/index.html',
      source: renderLocalePage(String(index.source), strings, {
        locale: 'zh-Hant',
        url: ZH_HANT_URL,
        homeUrl: 'https://deepvalues.ai/',
        // Head strings: the landing keywords (價值投資, 內在價值, 美股分析) and the hero subtitle
        title: 'DeepValues.AI — 價值投資 App：內在價值與美股分析',
        description: strings['hero.subtitle'],
        ogLocale: 'zh_TW',
        appDescription: strings['hero.subtitle'],
      }),
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), appHtmlRewrite(), zhHantLanding()],
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
