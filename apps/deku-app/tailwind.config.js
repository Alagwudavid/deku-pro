/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#181A20",
          light: "#F7F8FA",
        },
        foreground: {
          DEFAULT: "#F7F8FA",
          light: "#181A20",
        },
        sidebar: "#23262F",
        panel: "#23262F",
        border: "#23262F",
        accent: "#377DFF",
      },
    },
  },
  plugins: [],
};
