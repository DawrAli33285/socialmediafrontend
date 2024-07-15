/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        normal: '600',
        medium: '650', 
        bold: '700',
      }
    },
  },
  plugins: [],
}