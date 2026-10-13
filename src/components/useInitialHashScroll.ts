import { useEffect } from "react";

const SETTLE_TIMEOUT = 3000;
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

// The page is rendered client-side, so the browser's native jump to `#section` on
// load happens before the section exists. Scroll to it once React has rendered and
// keep it pinned while images and other async content shift the layout.
export function useInitialHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    // Travel deep links open their own detail view instead of scrolling.
    if (hash.length <= 1 || hash.startsWith("#travel-")) return undefined;

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return undefined;

    const scrollToTarget = () => target.scrollIntoView({ behavior: "instant", block: "start" });
    const resizeObserver = new ResizeObserver(scrollToTarget);
    const timeoutId = window.setTimeout(stop, SETTLE_TIMEOUT);

    function stop() {
      resizeObserver.disconnect();
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", scrollToTarget);
      USER_SCROLL_EVENTS.forEach((event) => window.removeEventListener(event, stop));
    }

    scrollToTarget();
    resizeObserver.observe(document.body);
    window.addEventListener("load", scrollToTarget);
    USER_SCROLL_EVENTS.forEach((event) => window.addEventListener(event, stop, { passive: true }));

    return stop;
  }, []);
}
