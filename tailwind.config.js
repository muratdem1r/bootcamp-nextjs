/** @type {import('tailwindcss').Config} */
module.exports = {
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
      animation: {
        "bounce-delay": "bounce 1s 1s infinite",
      },
    },
  },
  plugins: [],
};
