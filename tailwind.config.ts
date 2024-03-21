import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        black: "#545454",
        grey: "#808080",
        "light-grey": "#a4a4a4",
        yellow: "#ffc20d",
        "light-green": "#e1ece3",
        "dark-green": "#006230",
        blue: "0E82AF",
        red: "DE3804",
      },
    },
  },
  plugins: [],
};
export default config;
