import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "subway-green": "#03834E",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
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
