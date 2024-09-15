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
        DEFAULT: "rgba(var(--black))",
        hover: "rgba(var(--black-hover))",
      },
      white: {
        DEFAULT: "rgba(var(--white))",
        hover: "rgba(var(--white-hover))",
      },
      red: {
        DEFAULT: "rgba(var(--red))",
      },
      "dark-red": {
        DEFAULT: "rgba(var(--dark-red))",
      },
      grey: {
        DEFAULT: "rgba(var(--grey))",
        hover: "rgba(var(--grey-hover))",
      },
      "dark-grey": {
        DEFAULT: "rgba(var(--dark-grey))",
      },
      transparent: {
        DEFAULT: "transparent",
      },
      whatsapp: {
        DEFAULT: "rgba(var(--whatsapp))",
      },
      instagram: {
        DEFAULT: "rgba(var(--instagram))",
      },
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
