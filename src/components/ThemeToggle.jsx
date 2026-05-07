import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "system";
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const cycle = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const icon = theme === "dark" ? "\u263D" : theme === "light" ? "\u2600" : "\u25D1";
  const label =
    theme === "dark" ? "Dark" : theme === "light" ? "Light" : "Auto";

  return (
    <button
      className="theme-toggle"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to change.`}
      title={label}
    >
      {icon}
    </button>
  );
}
