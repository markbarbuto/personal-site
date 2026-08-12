import type { FocusImage } from "../../types/content";

type GalleryItemLayout = {
  isPortraitFeatureRow: boolean;
  span: string;
};

function getGalleryItemLayout(images: FocusImage[], index: number): GalleryItemLayout {
  const isLastOddImage = images.length % 2 === 1 && index === images.length - 1;
  if (isLastOddImage) {
    return { isPortraitFeatureRow: false, span: "sm:col-span-12" };
  }

  const rowIndex = Math.floor(index / 2);
  const positionInRow = index % 2;
  const isThirdRow = (rowIndex + 1) % 3 === 0;
  const portraitFeatureIndex = Math.floor(rowIndex / 3);
  const expectedPortraitPosition = portraitFeatureIndex % 2;
  const rowStartIndex = rowIndex * 2;
  const expectedPortrait = images[rowStartIndex + expectedPortraitPosition];
  const expectedLandscape = images[rowStartIndex + (expectedPortraitPosition === 0 ? 1 : 0)];
  const isPortraitFeatureRow =
    isThirdRow &&
    expectedPortrait?.orientation === "portrait" &&
    expectedLandscape !== undefined &&
    expectedLandscape.orientation !== "portrait";

  if (isPortraitFeatureRow) {
    return {
      isPortraitFeatureRow: true,
      span: positionInRow === expectedPortraitPosition ? "sm:col-span-4" : "sm:col-span-8",
    };
  }

  const rowPositionInCycle = rowIndex % 3;
  const widerImagePosition =
    rowPositionInCycle === 0 ? 0 : rowPositionInCycle === 1 ? 1 : rowIndex % 2;

  return {
    isPortraitFeatureRow: false,
    span: positionInRow === widerImagePosition ? "sm:col-span-7" : "sm:col-span-5",
  };
}

type GalleryImageButtonProps = {
  image: FocusImage;
  onOpen: (image: FocusImage) => void;
  className: string;
  imageClassName: string;
  eager?: boolean;
};

export function GalleryImageButton({
  image,
  onOpen,
  className,
  imageClassName,
  eager = false,
}: GalleryImageButtonProps) {
  return (
    <button
      type="button"
      className={`group block cursor-zoom-in overflow-hidden rounded-[18px] bg-black/5 text-left shadow-[0_16px_38px_rgba(0,0,0,0.11)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-appleBlue focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:bg-white/5 dark:focus-visible:ring-offset-[#19191f] ${className}`}
      aria-label={`Open image: ${image.alt}`}
      onClick={() => onOpen(image)}
    >
      <img
        src={image.src}
        alt={image.alt}
        className={`${imageClassName} transition duration-300 group-hover:scale-[1.015] group-hover:shadow-[0_22px_56px_rgba(0,0,0,0.18)]`}
        style={{ objectPosition: image.objectPosition }}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </button>
  );
}

type SectionImageGalleryProps = {
  images: FocusImage[];
  onOpen: (image: FocusImage) => void;
  className?: string;
  desktopLayout?: "pattern" | "equal-landscape";
  mobileLayout?: "carousel" | "stack";
};

export function SectionImageGallery({
  images,
  onOpen,
  className = "mt-5",
  desktopLayout = "pattern",
  mobileLayout = "carousel",
}: SectionImageGalleryProps) {
  const layoutClassName =
    mobileLayout === "stack"
      ? "grid grid-cols-1 gap-4 sm:grid-cols-12"
      : "hide-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 sm:mx-0 sm:grid sm:grid-cols-12 sm:overflow-visible sm:px-0 sm:pb-0";

  return (
    <div className={`${layoutClassName} ${className}`}>
      {images.map((image, index) => {
        const isLastOddImage = images.length % 2 === 1 && index === images.length - 1;
        const { isPortraitFeatureRow, span } =
          desktopLayout === "equal-landscape"
            ? {
                isPortraitFeatureRow: false,
                span: isLastOddImage ? "sm:col-span-12" : "sm:col-span-6",
              }
            : getGalleryItemLayout(images, index);
        const isPortrait = image.orientation === "portrait";
        const mobileItemClassName = isPortrait
          ? mobileLayout === "stack"
            ? "aspect-[3/4] h-auto w-full"
            : "aspect-[3/4] h-[230px] w-auto flex-none snap-center"
          : mobileLayout === "stack"
            ? "h-60 w-full"
            : "h-[230px] w-[82%] flex-none snap-center";
        const desktopItemClassName =
          desktopLayout === "equal-landscape"
            ? "sm:aspect-auto sm:h-60"
            : isPortraitFeatureRow
              ? "sm:aspect-auto sm:h-[clamp(300px,43vw,390px)]"
              : "sm:aspect-auto sm:h-[240px] lg:h-[290px]";

        return (
          <GalleryImageButton
            key={image.src}
            image={image}
            onOpen={onOpen}
            className={`${mobileItemClassName} sm:w-auto ${span} ${desktopItemClassName}`}
            imageClassName="h-full w-full object-cover"
          />
        );
      })}
    </div>
  );
}
