// Types for scripts/prerender-locale.mjs (imported by vite.config.ts).
export interface LocalePageOptions {
  /** BCP 47 tag for <html lang>, JSON-LD inLanguage (e.g. zh-Hans) */
  locale: string;
  /** public/locales/<code>.json id written to <html data-page-locale> for /i18n.js (e.g. zh); defaults to locale */
  pageLocale?: string;
  /** text direction, 'rtl' for Arabic and Urdu */
  dir?: 'ltr' | 'rtl';
  url: string;
  homeUrl: string;
  title: string;
  description: string;
  ogLocale: string;
  appDescription: string;
}
export function renderLocalePage(html: string, strings: Record<string, string>, opts: LocalePageOptions): string;
