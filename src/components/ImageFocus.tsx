import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
import type { FocusImage } from "../types/content";

type ImageFocusOverlayProps = {
  image: FocusImage;
  isClosing: boolean;
  onClose: () => void;
};

export function ImageFocusOverlay({ image, isClosing, onClose }: ImageFocusOverlayProps) {
  return createPortal(
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center bg-black/75 p-4 sm:p-8 ${
        isClosing ? "fade-out" : "fade-in"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/45 p-3 text-white shadow-[0_12px_36px_rgba(0,0,0,0.32)] transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
        aria-label="Close image preview"
        onClick={onClose}
      >
        <FaXmark aria-hidden="true" className="h-5 w-5" />
      </button>
      <figure
        className="max-h-full max-w-[min(1100px,100%)]"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="block max-h-[82vh] w-auto max-w-full rounded-[22px] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        />
      </figure>
    </div>,
    document.body,
  );
}
