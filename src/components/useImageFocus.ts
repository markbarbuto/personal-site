import { useCallback, useEffect, useRef, useState } from "react";
import type { FocusImage } from "../types/content";

export function useImageFocus<T extends FocusImage = FocusImage>() {
  const [focusedImage, setFocusedImage] = useState<T | null>(null);
  const [isFocusedImageClosing, setIsFocusedImageClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const closeFocusedImageWithAnimation = useCallback(() => {
    setIsFocusedImageClosing((isClosing) => {
      if (isClosing) return isClosing;

      closeTimeoutRef.current = window.setTimeout(() => {
        setFocusedImage(null);
        setIsFocusedImageClosing(false);
        closeTimeoutRef.current = null;
      }, 200);
      return true;
    });
  }, []);

  useEffect(() => {
    if (!focusedImage) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      event.preventDefault();
      event.stopPropagation();
      closeFocusedImageWithAnimation();
    }

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [focusedImage, closeFocusedImageWithAnimation]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  function openFocusedImage(image: T) {
    if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
    setIsFocusedImageClosing(false);
    setFocusedImage(image);
  }

  return {
    focusedImage,
    isFocusedImageClosing,
    openFocusedImage,
    closeFocusedImageWithAnimation,
  };
}
