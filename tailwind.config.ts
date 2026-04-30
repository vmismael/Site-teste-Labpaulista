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
        dark: "var(--bg-dark)",
        light: "var(--bg-light)",
        section: "var(--bg-section)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "ink-dark": "var(--ink-dark)",
        "ink-light": "var(--ink-light)",
        muted: "var(--muted)",
        "border-dark": "var(--border-dark)",
        "border-light": "var(--border-light)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        card: "4px",
        badge: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
