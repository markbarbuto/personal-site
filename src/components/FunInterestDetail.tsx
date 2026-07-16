import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import type { FunItem } from "../types/content";
import { FunInterestContent } from "./FunInterestContent";

type FunInterestDetailProps = {
  item: FunItem;
  onClose: () => void;
};

export function FunInterestDetail({ item, onClose }: FunInterestDetailProps) {
  const [isClosing, setIsClosing] = useState(false);

  const closeWithAnimation = useCallback(() => {
    if (isClosing) return;

    setIsClosing(true);
    window.setTimeout(onClose, 300);
  }, [isClosing, onClose]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeWithAnimation();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeWithAnimation]);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-y-auto bg-panel dark:bg-[#101014] ${
        isClosing ? "fade-out" : "fade-in"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} details`}
    >
      <div className="fixed left-[max(24px,calc((100vw-900px)/2+24px))] top-[18px] z-10 rounded-full border border-black/5 bg-white/70 p-1.5 shadow-nav backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#1c1c22]/75 dark:shadow-[0_10px_36px_rgba(0,0,0,0.42)]">
        <button
          type="button"
          className="nav-link inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors dark:text-white"
          onClick={closeWithAnimation}
          disabled={isClosing}
        >
          <FaArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back
        </button>
      </div>
      <div
        className={`mx-auto max-w-[900px] px-6 pb-[90px] pt-[86px] ${
          isClosing ? "sheet-down" : "sheet-up"
        }`}
      >
        <FunInterestContent item={item} layout="full" />
      </div>
    </div>
  );
}
