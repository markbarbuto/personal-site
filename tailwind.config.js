/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d1d1f",
        muted: "#6e6e73",
        panel: "#f5f5f7",
        appleBlue: "#0071e3",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.04)",
        float: "0 10px 40px rgba(0,0,0,0.06)",
        nav: "0 6px 28px rgba(0,0,0,0.09)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
