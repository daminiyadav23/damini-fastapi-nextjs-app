/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          800: "#5C4033",
          900: "#3E2723",
        },
        gold: {
          400: "#FFD700",
          500: "#FFC107",
        },
      },
    },
  },
  plugins: [],
};
