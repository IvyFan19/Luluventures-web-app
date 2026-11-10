// Types for scripts/app-store-campaign.mjs (imported by vite.config.ts and the tests).
export const APP_STORE_PROVIDER_TOKEN: string;
export const MAX_CAMPAIGN_TOKEN: number;
export function addProviderToken(text: string, providerToken: string): string;
export function relabelCampaigns(text: string, from: string, to: string): string;
export function appStoreReferences(text: string): { ref: string; ct: string | null }[];
