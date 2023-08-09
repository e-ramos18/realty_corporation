/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-gold": "#FFD700",
        "secondary-gold": "#bf9b30",
        "dark-gold": "#a67c00",
        "light-gold": "	#ffcf40",
        "lighter-gold": "#ffdc73",
        "primary-black": "#000000",
        "primary-success": "#2ECC71",
        "primary-info": "#3498DB",
        "primary-error": "#E74C3C",
        "primary-warning": "#F1C40F",
      },
    },
  },
  plugins: [],
};
