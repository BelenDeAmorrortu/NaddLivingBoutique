/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: {
        DEFAULT: "#0f0f0f",
        hover: "#0f0f0f99",
      },
      white: {
        DEFAULT: "#ffff",
        hover: "#ffffff78",
      },
      red: "#B50706",
      "dark-red": "#8e0b0a",
      grey: {
        DEFAULT: "#b3b3b3",
        hover: "#b3b3b366",
      },
      "dark-grey": "#888888",
      transparent: "transparent",
      whatsapp: "#31b846",
      instagram: "#ba0e59",
    },
    fontFamily: {
      primary: "var(--font-primary)",
      secondary: "var(--font-secondary)",
    },
    fontWeight: {
      thin: "300",
      regular: "400",
      "semi-bold": "500",
      bold: "600",
      "extra-bold": "700",
    },
    extend: {
      screens: {
        xxs: "320px",
      },
      keyframes: {
        scaleIn: {
          "0%": {
            transform: "scale(1.2)",
            filter: "blur(3px) brightness(0.5)",
          },
          "100%": {
            transform: "scale(1)",
            filter: "blur(0px)  brightness(0.5)",
          },
        },
      },
      animation: {
        scaleIn: "scaleIn 1s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
