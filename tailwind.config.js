/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          bosque: "#1A5C33",
          oscuro: "#0d3b1f",
          claro: "#2a7a45",
        },
        cafe: {
          tierra: "#3D1C02",
          oscuro: "#28120a",
        },
        carmin: {
          DEFAULT: "#9B1C1C",
          oscuro: "#7a1414",
          claro: "#c22424",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Barlow Condensed", "sans-serif"],
        body: ["var(--font-body)", "Lora", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "count-up": "countUp 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
