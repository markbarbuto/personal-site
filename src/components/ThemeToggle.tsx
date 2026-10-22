import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const storageKey = "portfolio-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const Icon = isDark ? FiSun : FiMoon;

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <button
      type="button"
      className="nav-link flex h-9 w-9 flex-none items-center justify-center rounded-full text-ink transition-colors dark:text-white"
      onClick={() => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        window.localStorage.setItem(storageKey, next ? "dark" : "light");
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}
