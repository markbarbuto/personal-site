import type { FocusImage } from "../../types/content";

const gallerySpans = [
  "sm:col-span-7",
  "sm:col-span-5",
  "sm:col-span-5",
  "sm:col-span-7",
  "sm:col-span-6",
  "sm:col-span-6",
];

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
};

export function SectionImageGallery({ images, onOpen }: SectionImageGalleryProps) {
  return (
    <div className="hide-scrollbar -mx-1 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 sm:mx-0 sm:grid sm:grid-cols-12 sm:overflow-visible sm:px-0 sm:pb-0">
      {images.map((image, index) => {
        const isLastOddImage = images.length % 2 === 1 && index === images.length - 1;
        const span = isLastOddImage
          ? "sm:col-span-12"
          : (gallerySpans[index] ?? "sm:col-span-6");

        return (
          <GalleryImageButton
            key={image.src}
            image={image}
            onOpen={onOpen}
            className={`h-[230px] w-[82%] flex-none snap-center sm:h-[240px] sm:w-auto ${span} lg:h-[290px]`}
            imageClassName="h-full w-full object-cover"
          />
        );
      })}
    </div>
  );
}
