/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#FFFFFF",
        textdark: "#494C6B",
        lightgrey: "#D1D2DA",
        darkgrey: "#393A4B",
        placeholder: "#4D5067",
        inputs: "#25273D",
        border: "#E3E4F1",
        actions: "#9495A5",
        actionsD: "#5B5E7E",
        blue: "#3A7CFD",
        orange: "#FF5F15",
      },
    },
  },
  plugins: [],
};
