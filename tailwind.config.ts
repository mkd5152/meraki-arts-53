import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#272523",
        soft: "#faf9f6",
        clay: "#b7664d",
        rosewood: "#8f4d4f",
        sage: "#7f8c6b",
        mist: "#e8edf0"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(39, 37, 35, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
