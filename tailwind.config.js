/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  darkMode: 'class', // <--- THIS is the key part
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

