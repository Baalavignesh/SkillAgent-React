/** @type {import('tailwindcss').Config} */
import {
  CUSTOM_BLACK,
  CUSTOM_WHITE,
  DANGER,
  PRIMARY,
  SECONDARY,
  SUCCESS,
} from "./src/constants/colors";

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: PRIMARY,
        secondary: SECONDARY,
        danger: DANGER,
        success: SUCCESS,
        "custom-white": CUSTOM_WHITE,
        "custom-black": CUSTOM_BLACK,
      },
    },
  },

  plugins: [
    require('tailwind-scrollbar'),
  ],
});
