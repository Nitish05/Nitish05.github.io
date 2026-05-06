import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "#0E0E0E",
        bone: "#F0F0F0",
        amber: "#D4A843",
        cyan: "#888888",
        ash: "#555555",
        smoke: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": "clamp(2.5rem, 7.5vw, 8.5rem)",
        "display-lg": "clamp(2rem, 6vw, 6.5rem)",
        "display-md": "clamp(1.5rem, 3.8vw, 4rem)",
        "display-sm": "clamp(0.9rem, 1.8vw, 1.8rem)",
      },
      letterSpacing: {
        wider2: "0.18em",
      },
      transitionTimingFunction: {
        out2: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
