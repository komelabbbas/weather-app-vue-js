/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  corePlugins: {
    order: false,
  },
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      order: {
        first: '-9999',
        last: '9999',
        normal: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
      fontFamily: {
        base: ['Inter', 'sans-serif'],
      },
      colors: {
        'gray': colors.slate,
        'cyan': colors.cyan,
        'blue': colors.blue,
        'primary': {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#0891B2',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        'yellow': {
          500: '#FF823D',
        },
        'black': '#040405',
        'brand': '#F5A623',

        'dashboard-active': 'rgba(1, 1, 1, 0.15)',
      },
      spacing: {
        7: '1.75rem',
        9: '2.25rem',
        72: '18rem',
        80: '20rem',
        hero: '80vh',
      },
      screens: {
        xxl: '1440px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
  ],
}
