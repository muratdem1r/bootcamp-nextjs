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
      },
      backgroundImage: {
        "p-quadro": "url('/quadro.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
