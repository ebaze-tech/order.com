/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./index.html",
    "./main.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        robotoCondensed: ['"Roboto Condensed"', "sans-serif"],
        robotoFlex: ['"Roboto Flex"', "sans-serif"],
        robotoSerif: ['"Roboto Serif"', "serif"],
        roboto: ['"Roboto"', "sans-serif"],
        pacifico:['"Pacifico"', "sans-sefit"]
      },
    },
  },
  plugins: [],
};
