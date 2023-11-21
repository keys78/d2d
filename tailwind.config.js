/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "var(--accent1)",
          2: "var(--accent2)",
          3: "var(--accent3)",
        },
        paleBlue: "var(--paleBlue)",
        grayBlue: "var(--grayBlue)",
        darkBlue: "var(--darkBlue)",
        burgundy: "var(--burgundy)",
        veryDarkBlue: "var(--veryDarkBlue)",
      },
      fontFamily: {
        Roboto: ['"Roboto Mono"', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'hero-pattern': "url('../assets/png/bg-desktop.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
