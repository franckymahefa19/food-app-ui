/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ajustez les chemins vers vos fichiers de composants
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
