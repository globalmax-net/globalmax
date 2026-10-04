import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gm: {
          maroon: "#8B2332",
          "maroon-dark": "#6E1C28",
          green: "#186835",
          "green-dark": "#234F33",
          ink: "#201B1B",
          paper: "#FFFFFF",
          "paper-2": "#F4F1EB",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "gm-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "gm-scroll": "gm-scroll 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
