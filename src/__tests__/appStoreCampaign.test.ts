// @vitest-environment node
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';
import {
  MAX_CAMPAIGN_TOKEN,
  addProviderToken,
  appStoreReferences,
  relabelCampaigns,
} from '../../scripts/app-store-campaign.mjs';
import { renderLocalePage } from '../../scripts/prerender-locale.mjs';

const read = (file: string) => readFileSync(resolve(__dirname, '../..', file), 'utf8');

// The one App Store URL per page that stays bare: schema.org `sameAs` names the listing itself.
const UNTAGGED_ALLOWED: Record<string, number> = { 'buffett-indicator/index.html': 1 };

const SURFACES: Record<string, string[]> = {
  'index.html': ['landing_banner', 'landing_schema', 'landing_hero', 'landing_hero_rating', 'landing_footer'],
  'buffett-indicator/index.html': ['bi_landing_banner', 'bi_landing_schema', 'bi_landing_hero', 'bi_landing_hero_rating'],
  'public/llms.txt': ['landing_llms_txt'],
  'src/components/AppsSection.tsx': ['landing_spa_apps'],
};

describe('App Store campaign tokens in the source files', () => {
  for (const [file, surfaces] of Object.entries(SURFACES)) {
    it(`${file}: every App Store link names its surface`, () => {
      const refs = appStoreReferences(read(file));
      const untagged = refs.filter((r) => r.ct === null);
      expect(untagged.length).toBe(UNTAGGED_ALLOWED[file] ?? 0);
      const tokens = refs.flatMap((r) => (r.ct ? [r.ct] : []));
      expect([...new Set(tokens)].sort()).toEqual([...surfaces].sort());
      for (const ct of tokens) {
        expect(ct).toMatch(/^[a-z0-9_]+$/);
        expect(ct.length).toBeLessThanOrEqual(MAX_CAMPAIGN_TOKEN);
      }
    });
  }
});

describe('addProviderToken', () => {
  const html =
    '<meta name="apple-itunes-app" content="app-id=1, affiliate-data=ct=landing_banner" />' +
    '<a href="https://apps.apple.com/app/id1?ct=landing_hero">x</a>' +
    '<a href="https://example.com/?ct=other">y</a>';

  it('changes nothing while the provider token is empty', () => {
    expect(addProviderToken(html, '')).toBe(html);
    expect(addProviderToken(html, '  ')).toBe(html);
  });

  it('adds pt after each App Store campaign token, and only there', () => {
    const out = addProviderToken(html, '123456');
    expect(out).toContain('affiliate-data=ct=landing_banner&pt=123456"');
    expect(out).toContain('https://apps.apple.com/app/id1?ct=landing_hero&pt=123456"');
    expect(out).toContain('https://example.com/?ct=other"');
  });

  it('is idempotent', () => {
    const once = addProviderToken(html, '123456');
    expect(addProviderToken(once, '123456')).toBe(once);
  });
});

describe('the prerendered Traditional Chinese landing page', () => {
  it('renames tokens by prefix', () => {
    expect(relabelCampaigns('?ct=landing_hero ct=bi_landing_hero', 'landing_', 'landing_zh_hant_')).toBe(
      '?ct=landing_zh_hant_hero ct=bi_landing_hero'
    );
  });

  it('reports under its own campaign names, within the 40-character limit', () => {
    const page = renderLocalePage(read('index.html'), JSON.parse(read('public/locales/zh-Hant.json')), {
      locale: 'zh-Hant',
      url: 'https://deepvalues.ai/zh-hant/',
      homeUrl: 'https://deepvalues.ai/',
      title: 't',
      description: 'd',
      ogLocale: 'zh_TW',
      appDescription: 'd',
      campaignPrefix: ['landing_', 'landing_zh_hant_'],
    });
    const tokens = appStoreReferences(page).map((r) => r.ct);
    expect(tokens.length).toBe(appStoreReferences(read('index.html')).length);
    for (const ct of tokens) {
      expect(ct).toMatch(/^landing_zh_hant_[a-z_]+$/);
      expect((ct as string).length).toBeLessThanOrEqual(MAX_CAMPAIGN_TOKEN);
    }
  });
});
