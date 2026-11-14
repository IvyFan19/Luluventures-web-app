// Types for scripts/site-locales.mjs (imported by vite.config.ts).
export interface SiteLocale {
  code: string;
  slug: string;
  hreflang: string;
  og: string;
  english: string;
  rtl?: boolean;
}
export const SITE_ORIGIN: string;
export const SITE_LOCALES: SiteLocale[];
export function landingUrl(loc: SiteLocale): string;
export function landingAlternates(): { hreflang: string; href: string }[];
