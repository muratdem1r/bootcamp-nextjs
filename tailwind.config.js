/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#FC521D",
        dark: "#181A18",
        navbar: "#0C0D0C",
      },
      backgroundImage: {
        "p-quadro": "url('/quadro.svg')",
      },
      boxShadow: {
        card: "0 2px 8px -3px #bbb",
        cardHover: "0 6px 12px 3px #bbb",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
