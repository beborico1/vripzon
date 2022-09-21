module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        vrip: {
          100:"#daedab",
          200:"#bfdf6c",
          300:"#a3d12d",
          400:"#7cb833",
          500:"#569f39",
          600:"#2f863e",
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
