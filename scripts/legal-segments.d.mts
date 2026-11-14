// Types for scripts/legal-segments.mjs (imported by vite.config.ts).
export function segmentKey(bundle: string, html: string): string;
export function segmentLegal(html: string, bundle: string): { html: string; strings: Record<string, string> };
export const LEGAL_PAGES: { file: string; bundle: string }[];
