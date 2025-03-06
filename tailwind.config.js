/** @type {import('tailwindcss').Config} */

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
    spacing: () => {
      const v = {};

      for (let i = 0; i <= 50; i++) {
        v[`${i * 8}`] = rem(i * 8);
      }

      return v;
    },
    fontFamily: {
      domine: ["Domine", "serif"]
    },
    extend: {
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
  plugins: [],
}
