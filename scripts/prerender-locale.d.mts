// Types for scripts/prerender-locale.mjs (imported by vite.config.ts).
export interface LocalePageOptions {
  locale: string;
  url: string;
  homeUrl: string;
  title: string;
  description: string;
  ogLocale: string;
  appDescription: string;
}
export function renderLocalePage(html: string, strings: Record<string, string>, opts: LocalePageOptions): string;
