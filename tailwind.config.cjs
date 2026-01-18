/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gold-400": "#b38b00",
        "gold-500": "#d4af37",
      },
    },
  },
  plugins: [],
};
