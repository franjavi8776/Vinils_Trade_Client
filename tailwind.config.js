/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const clipPathUtilities = {
        ".clip-path-custom": {
          "clip-path":
            "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)", // Define el clip-path que desees
        },
      };
      addUtilities(clipPathUtilities, ["responsive"]);
    },
  ],
};
