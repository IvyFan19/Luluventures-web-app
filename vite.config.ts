import { resolve } from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only: serve /app and /app/* (no file extension) from app.html, mirroring
// the CloudFront rewrite that's expected in production for the React SPA.
// Also serves the extensionless /privacy/buffett-indicator clean URL from its
// directory index, mirroring how S3/CloudFront resolves it in production.
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
      }
      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), appHtmlRewrite()],
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
        // App-specific privacy policy (Buffett Indicator iOS / Bubble Watch Android)
        'privacy-buffett-indicator': resolve(__dirname, 'privacy/buffett-indicator/index.html'),
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
