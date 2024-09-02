/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FA8A5D",
        dark: {
          border: "#41444E",
          100: "#A1A1A1",
          600: "#333847",
          700: "#282C37",
          800: "#1F2028",
        },
      },
    },
  },
  plugins: [],
};
