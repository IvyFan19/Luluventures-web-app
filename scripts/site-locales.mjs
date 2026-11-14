// The landing site's languages, in one place for the build (vite.config.ts), the sitemap generator and
// the tests. public/i18n.js keeps its own copy of the codes and native names (it runs in the browser
// with no build step); `npm run test:i18n` fails if the two lists, or the locale files, ever differ.
//
// code     = public/locales/<code>.json and the i18n.js locale id
// slug     = path of the prerendered landing page (https://deepvalues.ai/<slug>/); English is the root
// hreflang = the BCP 47 tag used in hreflang alternates and <html lang>
// og       = Open Graph locale
// english  = the language's English name (llms.txt, JSON-LD)
export const SITE_ORIGIN = 'https://deepvalues.ai';

export const SITE_LOCALES = [
  { code: 'en', slug: '', hreflang: 'en', og: 'en_US', english: 'English' },
  { code: 'ar', slug: 'ar', hreflang: 'ar', og: 'ar_AR', english: 'Arabic', rtl: true },
  { code: 'bn', slug: 'bn', hreflang: 'bn', og: 'bn_IN', english: 'Bengali' },
  { code: 'de', slug: 'de', hreflang: 'de', og: 'de_DE', english: 'German' },
  { code: 'es-419', slug: 'es-419', hreflang: 'es-419', og: 'es_LA', english: 'Latin American Spanish' },
  { code: 'es-ES', slug: 'es-es', hreflang: 'es-ES', og: 'es_ES', english: 'European Spanish' },
  { code: 'fr', slug: 'fr', hreflang: 'fr', og: 'fr_FR', english: 'French' },
  { code: 'hi', slug: 'hi', hreflang: 'hi', og: 'hi_IN', english: 'Hindi' },
  { code: 'id', slug: 'id', hreflang: 'id', og: 'id_ID', english: 'Indonesian' },
  { code: 'it', slug: 'it', hreflang: 'it', og: 'it_IT', english: 'Italian' },
  { code: 'ja', slug: 'ja', hreflang: 'ja', og: 'ja_JP', english: 'Japanese' },
  { code: 'ko', slug: 'ko', hreflang: 'ko', og: 'ko_KR', english: 'Korean' },
  { code: 'mr', slug: 'mr', hreflang: 'mr', og: 'mr_IN', english: 'Marathi' },
  { code: 'ms', slug: 'ms', hreflang: 'ms', og: 'ms_MY', english: 'Malay' },
  { code: 'nl', slug: 'nl', hreflang: 'nl', og: 'nl_NL', english: 'Dutch' },
  { code: 'pl', slug: 'pl', hreflang: 'pl', og: 'pl_PL', english: 'Polish' },
  { code: 'pt-BR', slug: 'pt-br', hreflang: 'pt-BR', og: 'pt_BR', english: 'Brazilian Portuguese' },
  { code: 'ru', slug: 'ru', hreflang: 'ru', og: 'ru_RU', english: 'Russian' },
  { code: 'sv', slug: 'sv', hreflang: 'sv', og: 'sv_SE', english: 'Swedish' },
  { code: 'ta', slug: 'ta', hreflang: 'ta', og: 'ta_IN', english: 'Tamil' },
  { code: 'te', slug: 'te', hreflang: 'te', og: 'te_IN', english: 'Telugu' },
  { code: 'th', slug: 'th', hreflang: 'th', og: 'th_TH', english: 'Thai' },
  { code: 'tr', slug: 'tr', hreflang: 'tr', og: 'tr_TR', english: 'Turkish' },
  { code: 'ur', slug: 'ur', hreflang: 'ur', og: 'ur_PK', english: 'Urdu', rtl: true },
  { code: 'vi', slug: 'vi', hreflang: 'vi', og: 'vi_VN', english: 'Vietnamese' },
  { code: 'zh', slug: 'zh-hans', hreflang: 'zh-Hans', og: 'zh_CN', english: 'Simplified Chinese' },
  { code: 'zh-Hant', slug: 'zh-hant', hreflang: 'zh-Hant', og: 'zh_TW', english: 'Traditional Chinese' },
];

export const landingUrl = (loc) => `${SITE_ORIGIN}/${loc.slug ? loc.slug + '/' : ''}`;

// hreflang alternates every landing page declares (all languages + x-default = English)
export const landingAlternates = () =>
  SITE_LOCALES.map((l) => ({ hreflang: l.hreflang, href: landingUrl(l) })).concat({ hreflang: 'x-default', href: `${SITE_ORIGIN}/` });
