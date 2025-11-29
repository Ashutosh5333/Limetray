/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #a855f7, #6366f1, #3b82f6)',
        'brand-gradient-br': 'linear-gradient(to bottom right, #a855f7, #6366f1, #3b82f6)',
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        }
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          backgroundImage: 'linear-gradient(to right, #a855f7, #6366f1, #3b82f6)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        },
      });
    }
  ],
};
