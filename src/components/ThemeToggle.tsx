import { useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const storageKey = "portfolio-theme";

// The inline script in index.html applies the stored theme before first paint, so the <html> class is the
// source of truth. The prerendered markup assumes light mode; React swaps the icon in right after hydrating.
function readIsDark() {
  return document.documentElement.classList.contains("dark");
}

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function toggleTheme() {
  const isDark = !readIsDark();
  document.documentElement.classList.toggle("dark", isDark);
  window.localStorage.setItem(storageKey, isDark ? "dark" : "light");
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribeToTheme, readIsDark, () => false);
  const Icon = isDark ? FiSun : FiMoon;

  return (
    <button
      type="button"
      className="nav-link flex h-9 w-9 flex-none items-center justify-center rounded-full text-ink transition-colors dark:text-white"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}
