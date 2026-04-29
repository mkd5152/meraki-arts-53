import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        soft: "rgb(var(--color-soft) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        clay: "rgb(var(--color-clay) / <alpha-value>)",
        rosewood: "rgb(var(--color-rosewood) / <alpha-value>)",
        sage: "rgb(var(--color-sage) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)"
      },
      boxShadow: {
        soft: "0 18px 45px rgb(var(--shadow-color) / 0.10)",
        glow: "0 24px 80px rgb(var(--color-clay) / 0.16)",
        frame: "0 30px 100px rgb(var(--shadow-color) / 0.18)"
      },
      keyframes: {
        "frame-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -10px, 0) rotate(0.6deg)" }
        },
        "soft-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" }
        }
      },
      animation: {
        "frame-drift": "frame-drift 9s ease-in-out infinite",
        "soft-shimmer": "soft-shimmer 8s ease-in-out infinite alternate"
      }
    }
  },
  plugins: []
};

export default config;
