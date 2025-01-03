/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        darkGray: '#191919',
        gray1: '#181818',
        white: '#FFFFFF',
        purpleAccent: '#6E40FF',
        bg2: '#060606',
      },
    },
  },
  plugins: [],
}