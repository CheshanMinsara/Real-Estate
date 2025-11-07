/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#1a4d3e',
          light: '#2c6b5a',
          dark: '#0f2e24',
        },
        accent: {
          DEFAULT: '#c9b76a',
          light: '#d4c585',
          dark: '#a8954f',
        },
        gold: {
          DEFAULT: '#f4d03f',
          light: '#f6d866',
          dark: '#d4b035',
        },
        sage: '#8b9d8a',
        sky: '#b8d4e8',
        cream: '#fdfdf8',
        charcoal: '#2c3e37',
      },
    },
  },
  plugins: [],
}

