/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E8B57',
        'primary-lighter': '#39ac6b',
        'primary-darker': '#267347',
        accent: '#345e37',
        'accent-lighter': '#3f7343',
        'accent-darker': '#244226',
      },
    },
  },
  plugins: [],
};
