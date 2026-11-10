// Types for scripts/prerender-locale.mjs (imported by vite.config.ts).
export interface LocalePageOptions {
  locale: string;
  url: string;
  homeUrl: string;
  title: string;
  description: string;
  ogLocale: string;
  appDescription: string;
  /** [from, to]: rename App Store campaign tokens that start with `from`, e.g. ['landing_', 'landing_zh_hant_']. */
  campaignPrefix?: [string, string];
}
export function renderLocalePage(html: string, strings: Record<string, string>, opts: LocalePageOptions): string;
