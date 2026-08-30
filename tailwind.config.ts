import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors driven by CSS variables in app/globals.css
        primary: "rgb(var(--tw-color-primary) / <alpha-value>)",
        primaryDark: "rgb(var(--tw-color-primary-dark) / <alpha-value>)",
        surface: "rgb(var(--tw-color-surface) / <alpha-value>)",
        soft: "rgb(var(--tw-color-soft) / <alpha-value>)",
        accent: "rgb(var(--tw-color-accent) / <alpha-value>)",
        /** Text (and icons) on solid `bg-accent` — same in light & dark */
        onAccent: "rgb(var(--tw-color-on-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--tw-color-accent-hover) / <alpha-value>)",
        blue: "rgb(var(--tw-color-blue) / <alpha-value>)",
        midBlue: "rgb(var(--tw-color-mid-blue) / <alpha-value>)",
        bluedark: "rgb(var(--tw-color-bluedark) / <alpha-value>)",
        deepBlue: "rgb(var(--tw-color-deep-blue) / <alpha-value>)",
        cream: "rgb(var(--tw-color-cream) / <alpha-value>)",
        textPrimary: "rgb(var(--tw-color-text-primary) / <alpha-value>)",
        "text-primary": "rgb(var(--tw-color-text-primary) / <alpha-value>)",
        error: "#f87171",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
