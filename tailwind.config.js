/** @type {import('tailwindcss').Config} */

import { COLORS } from "./utils/colors";

const rem = (px) => (px ? `${(px / 16).toFixed(7)}rem` : "0rem");

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    colors: {
      ...COLORS,
    },
    spacing: () => {
      const v = {};

      v["grid-gap"] = "var(--grid-gap)";

      for (let i = 0; i <= 50; i++) {
        v[`${i * 8}`] = rem(i * 8);
      }

      return v;
    },
    fontFamily: {
      domine: ["Domine", "serif"]
    },
    variables: {
      DEFAULT: {
        colors: {
          ...COLORS,
        },
      },
    },
    extend: {
      borderWidth: ({ theme }) => ({
        ...theme("spacing"),
      }),
      borderRadius: ({ theme }) => ({
        ...theme("spacing"),
      }),
      fontSize: ({ theme }) => ({
        ...theme("spacing"),
      }),
      maxWidth: ({ theme }) => ({
        ...theme("width"),
      }),
      minHeight: ({ theme }) => ({
        ...theme("height"),
      }),
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables'),
  ],
}
