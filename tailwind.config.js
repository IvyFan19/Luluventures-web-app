/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        blue: {
          900: '#0A192F',
          800: '#112240',
          700: '#1E3A5F',
          600: '#2A4A73',
          500: '#3E5F8A',
          400: '#5D7CA6',
          300: '#8DA1BF',
          200: '#BCC9DE',
          100: '#DEE7F2',
          50: '#F0F5FA',
        },
        yellow: {
          500: '#E6C200',
          400: '#FFDC29',
          300: '#FFE566',
        },
      },
      borderWidth: {
        '3': '3px',
      },
      gridTemplateColumns: {
        'auto-fill-card': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      transitionDuration: {
        '400': '400ms',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};