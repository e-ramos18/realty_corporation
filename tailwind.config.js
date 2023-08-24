/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./forms/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        "primary-gold": "#FFD700",
        "secondary-gold": "#bf9b30",
        "dark-gold": "#a67c00",
        "light-gold": "	#ffcf40",
        "lighter-gold": "#ffdc73",
        "primary-black": "#000000",
        "primary-success": "#2ECC71",
        "light-success": "#ABEBC6",
        "dark-success": "#239B56",
        "primary-info": "#3498DB",
        "light-info": "#85C1E9",
        "dark-info": "#2874A6",
        "primary-error": "#E74C3C",
        "light-error": "#F1948A",
        "dark-error": "#B03A2E",
        "primary-warning": "#F1C40F",
        "light-warning": "#F9E79F",
        "dark-warning": "#B7950B",
      },
    },
  },
  plugins: [],
};
