import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const storageKey = "portfolio-theme";

function getInitialIsDark() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(storageKey) === "dark";
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialIsDark);
  const Icon = isDark ? FiSun : FiMoon;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem(storageKey, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      type="button"
      className="nav-link flex h-9 w-9 flex-none items-center justify-center rounded-full text-ink transition-colors dark:text-white"
      onClick={() => setIsDark((current) => !current)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}
