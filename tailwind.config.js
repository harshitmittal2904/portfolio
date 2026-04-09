/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#09090b",
        surface: "#111116",
        "surface-2": "#18181d",
        border: "rgba(255,255,255,0.06)",
        "border-2": "rgba(255,255,255,0.14)",
        "text-1": "#f4f4f5",
        "text-2": "#a1a1aa",
        "text-3": "#52525b",
        accent: "#FFD400",
        "accent-2": "#FF8C00",
        green: "#4ade80",
      },
      keyframes: {
        softPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "soft-pulse": "softPulse 2s ease-in-out infinite",
      },
      boxShadow: {
        lift: "0 20px 60px rgba(0,0,0,0.5)",
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};
