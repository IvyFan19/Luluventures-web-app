// Campaign tokens on App Store links (used by vite.config.ts and scripts/prerender-locale.mjs).
//
// Every App Store link this site owns names the surface it sits on with Apple's campaign token,
// `?ct=<surface>` (in a Smart App Banner: `affiliate-data=ct=<surface>`), so App Store Connect →
// App Analytics can report which page sent a download. The tokens are written in the source files
// (index.html, buffett-indicator/index.html, public/llms.txt); src/__tests__/appStoreCampaign.test.ts
// fails when a link is added without one.
//
// Apple's campaign reports also expect the developer account's provider token (`pt`). It is shown in
// App Store Connect (App Analytics → Acquisition → Campaigns → generate a campaign link) and is
// not a secret, but it is not in this repo yet. Set it here once and the build adds `pt` to every link.
export const APP_STORE_PROVIDER_TOKEN = '';

/** Apple truncates campaign tokens past 40 characters. */
export const MAX_CAMPAIGN_TOKEN = 40;

// An App Store URL or Smart App Banner affiliate-data value, up to and including its ct token
const CAMPAIGN = /((?:apps\.apple\.com\/[^\s"'<>()[\]]*[?&]|affiliate-data=)ct=[A-Za-z0-9_.-]+)(?![A-Za-z0-9_.-]|&(?:amp;)?pt=)/g;

/**
 * Add `&pt=<providerToken>` after every campaign token in a document (HTML, JSON-LD or plain text).
 * Returns the text unchanged when the provider token is empty.
 * @param {string} text
 * @param {string} providerToken
 * @returns {string}
 */
export function addProviderToken(text, providerToken) {
  const pt = String(providerToken ?? '').trim();
  if (!pt) return text;
  return text.replace(CAMPAIGN, `$1&pt=${encodeURIComponent(pt)}`);
}

/**
 * Rename campaign tokens by prefix, for a translated copy of a page:
 * relabelCampaigns(html, 'landing_', 'landing_zh_hant_') turns ct=landing_hero into ct=landing_zh_hant_hero.
 * @param {string} text
 * @param {string} from
 * @param {string} to
 * @returns {string}
 */
export function relabelCampaigns(text, from, to) {
  return text.split(`ct=${from}`).join(`ct=${to}`);
}

/**
 * Every campaign-carrying App Store reference in a document: links to apps.apple.com and Smart App Banner metas.
 * `ct` is null when the reference has no campaign token.
 * @param {string} text
 * @returns {{ ref: string, ct: string | null }[]}
 */
export function appStoreReferences(text) {
  const refs = [];
  for (const m of text.matchAll(/https:\/\/apps\.apple\.com\/[^\s"'<>()[\]]+/g)) {
    refs.push({ ref: m[0], ct: /[?&]ct=([^&#]+)/.exec(m[0].replace(/&amp;/g, '&'))?.[1] ?? null });
  }
  for (const m of text.matchAll(/name="apple-itunes-app"\s+content="([^"]*)"/g)) {
    refs.push({ ref: m[0], ct: /affiliate-data=ct=([^&,"\s]+)/.exec(m[1])?.[1] ?? null });
  }
  return refs;
}
