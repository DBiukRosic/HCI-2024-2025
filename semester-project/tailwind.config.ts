import type { Config } from "tailwindcss";

const config: Config = {
  
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "brand-blue": {
          50: "#E8E9EB",
          75: "#A0A5AF",
          100: "#787F8D",
          200: "#3E485C",
          300: "#17233B",
          400: "#101929",
          500: "#0E1524",
        },
        "brand-orange": {
          50: "#FFF2E6",
          75: "#FFCA96",
          100: "#FFB46B",
          200: "#FF932B",
          300: "#FF7D00",
          400: "#B35800",
          500: "#9C4C00",
        },
      },
      fontFamily: {
        urbanist: ["var(--font-urbanist)"],
        unlock: ["var(--font-unlock)"],
        inter: ["var(--font-inter)"],
        sarpanch: ["var(--font-sarpanch)"],
      },
    },
  },

  plugins: [],
};

export default config;

