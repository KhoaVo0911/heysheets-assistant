/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        gelica: ["Gelica", "ui-serif", "Georgia", "serif"],
        productSans: ["Product Sans", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: { yellow: "#F6D46B", yellowHover: "#F1C84A", dark: "#2B2A27" },
      },
    },
  },
  plugins: [],
};
