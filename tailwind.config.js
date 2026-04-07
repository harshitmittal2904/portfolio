/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#09090b",
        surface: "#111116",
        border: "rgba(255,255,255,0.06)",
        "text-1": "#f4f4f5",
        "text-2": "#a1a1aa",
        "text-3": "#52525b",
        accent: "#FFD400",
        "accent-2": "#FF8C00",
        green: "#4ade80",
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
