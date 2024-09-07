import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "subway-yellow": "#F4B640",
        "subway-green": "#03834E",
        "subway-dark-green": "#004729",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      boxShadow: {
        custom: "0 4px 10px rgb(0 0 0 / 0.1), 0 4px 10px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
