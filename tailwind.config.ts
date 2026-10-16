import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070e",
        foreground: "#ededed",
        carbon: {
          950: "#030408",
          900: "#05070e",
          850: "#080c18",
          800: "#0d1322",
          700: "#141c33",
          600: "#1e294b",
          500: "#334155",
        },
        cyan: {
          neon: "#00f0ff",
          glow: "rgba(0, 240, 255, 0.15)",
          dim: "rgba(0, 240, 255, 0.4)",
        },
        electric: {
          blue: "#38bdf8",
          indigo: "#6366f1",
          violet: "#a855f7",
          pink: "#f43f5e",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(0, 240, 255, 0.25)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Outfit", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Syne", "sans-serif"],
        mono: ["var(--font-space-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.05em",
        wider: "0.15em",
        widest: "0.25em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
