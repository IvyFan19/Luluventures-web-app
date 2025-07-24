// Application Constants
export const APP_CONFIG = {
  TITLE: 'LuLu Ventures',
  DESCRIPTION: 'Deep Value Investing Platform',
  VERSION: '1.0.0',
} as const;

// YouTube Playlists and Videos
export const YOUTUBE_PLAYLISTS = {
  BUFFETT_WAY: {
    id: 'playlist1',
    url: 'https://www.youtube.com/watch?v=4QC92OWkDvc&list=PLKC11J8aIwXRinHFFK_OODlTpthX8L5Qt',
    thumbnail: '/images/The Buffet Way_3000x3000.jpeg',
    episodeCount: 52,
  },
  COMPANY_ANALYSIS: {
    id: 'playlist2', 
    url: 'https://www.youtube.com/watch?v=4QC92OWkDvc&list=PLKC11J8aIwXSLxVwF-zaxYEFaYNXwnB4O',
    thumbnail: '/images/company-analysis.jpeg',
    episodeCount: 38,
  },
  BUSINESS_PRINCIPLES: {
    id: 'playlist3',
    url: 'http://youtube.com/watch?v=UisvRx8VflI&list=PLKC11J8aIwXQkh57dq3rUwXN2R8LT3PVR',
    thumbnail: '/images/business-first-principles.png', 
    episodeCount: 24,
  },
  MODERN_PHILOSOPHER: {
    id: 'playlist4',
    url: 'https://www.youtube.com/watch?v=GJJG-dClvpI&list=PLKC11J8aIwXQZVX0GjwpzO-afv8wn4Xa2',
    thumbnail: '/images/modern-philosopher.jpeg',
    episodeCount: 16,
  },
} as const;

// External Links
export const EXTERNAL_LINKS = {
  YOUTUBE_CHANNEL: 'https://www.youtube.com/@TheDeepValue',
  COMPANY_EMAIL: 'info@luluventures.com',
} as const;

// UI Constants  
export const UI_CONFIG = {
  SCROLL_THRESHOLD: 10,
  ANIMATION_DURATION: 300,
  MODAL_Z_INDEX: 50,
} as const;

// API Endpoints (if needed later)
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  CONTENT: '/api/content',
  NEWSLETTER: '/api/newsletter',
} as const;

// Navigation Sections
export const NAVIGATION_SECTIONS = [
  { id: 'podcast', label: 'Podcast' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'apps', label: 'App Tools' },
  { id: 'research', label: 'Research' },
  { id: 'blog', label: 'Blog' },
] as const;

// Form Validation
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
} as const;