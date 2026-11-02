// Tailwind for the home page, built into src/landing.css. Same theme the page gave the Play CDN.
// i18n.js and analytics.js write markup, and the locale files carry HTML, so their classes count.
export default {
  content: ['./index.html', './public/i18n.js', './public/analytics.js', './public/locales/*.json'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          50: '#E6F2FF',
          100: '#C2DEFF',
          200: '#85BDFF',
          300: '#4FA1FF',
          400: '#2E92FF',
          500: '#0F85FF',
          600: '#006BD9',
          700: '#0054AB',
          800: '#003C7D',
          900: '#00264F',
        },
      },
    },
  },
};
