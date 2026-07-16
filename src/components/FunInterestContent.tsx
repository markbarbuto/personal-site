import type { ReactNode } from "react";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { FocusImage, FunItem } from "../types/content";
import { BlueAction } from "./BlueAction";
import { ImageFocusOverlay } from "./ImageFocus";
import { useImageFocus } from "./useImageFocus";

type FunInterestContentProps = {
  item: FunItem;
  layout: "inline" | "full";
  onReadMore?: () => void;
};

const gallerySpans = [
  "sm:col-span-7",
  "sm:col-span-5",
  "sm:col-span-5",
  "sm:col-span-7",
  "sm:col-span-6",
  "sm:col-span-6",
];

export function FunInterestContent({ item, layout, onReadMore }: FunInterestContentProps) {
  const {
    focusedImage,
    isFocusedImageClosing,
    openFocusedImage,
    closeFocusedImageWithAnimation,
  } = useImageFocus();

  if (!item.feature) {
    return (
      <div className={layout === "full" ? "mx-auto max-w-[760px] pt-12" : ""}>
        {layout === "full" ? (
          <h1 className="text-[clamp(38px,6vw,58px)] font-bold leading-none tracking-[-0.03em]">
            {item.title}
          </h1>
        ) : (
          <h3 className="text-[17px] font-bold">{item.title}</h3>
        )}
        <p
          className={`leading-relaxed text-[#40404a] dark:text-[#c7c7d1] ${
            layout === "full" ? "mt-5 text-[19px]" : "mt-2.5 text-[15px]"
          }`}
        >
          {item.detail}
        </p>
        {layout === "inline" && onReadMore && <ReadMoreButton onClick={onReadMore} />}
      </div>
    );
  }

  const feature = item.feature;
  const isFull = layout === "full";

  if (!isFull) {
    return (
      <>
        <div className="grid gap-5 sm:grid-cols-[1.05fr_0.95fr] sm:items-center">
          <div>
            <h3 className="text-[20px] font-bold leading-none tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
              {item.detail}
            </p>
            {onReadMore && <ReadMoreButton onClick={onReadMore} />}
          </div>

          <GalleryImageButton
            image={feature.anchorImage}
            onOpen={openFocusedImage}
            className="aspect-[6/4] w-full"
            imageClassName="h-full w-full object-cover"
            eager
          />
        </div>

        {focusedImage && (
          <ImageFocusOverlay
            image={focusedImage}
            isClosing={isFocusedImageClosing}
            onClose={closeFocusedImageWithAnimation}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div>
        <GalleryImageButton
          image={feature.detailHeaderImage}
          onOpen={openFocusedImage}
          className="aspect-[3/1] w-full !rounded-[26px]"
          imageClassName="h-full w-full object-cover"
          eager
        />

        <header className="mt-[26px]">
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-4">
            <h1 className="min-w-0 flex-1 text-[clamp(34px,5vw,52px)] font-bold leading-none tracking-[-0.03em]">
              {item.title}
            </h1>
            {item.link && (
              <BlueAction href={item.link.url} target="_blank" rel="noopener noreferrer">
                {item.link.label}
                <FaArrowUpRightFromSquare aria-hidden="true" className="h-4 w-4" />
              </BlueAction>
            )}
          </div>
          <p className="mt-2 text-[17px] font-medium text-appleBlue">
            {item.tagline}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StoryCard className="min-h-[160px] bg-[#f1ebff] dark:bg-[#211a33]">
            <img
              src="/fun-assets/905-gunners/crest.png"
              alt=""
              className="pointer-events-none absolute -right-12 top-1/2 h-[240px] w-[240px] max-w-none -translate-y-1/2 object-contain opacity-[0.10] dark:opacity-[0.12]"
            />
            <CardCopy title="The team">
              <p>{feature.teamCardDetail}</p>
            </CardCopy>
            <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
              <span className="glossy-tile rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-[13px] leading-none dark:border-white/10 dark:bg-[#25252d] dark:text-[#f5f5f7]">
                Est. 2022
              </span>
            </div>
          </StoryCard>

          <StoryCard className="min-h-[160px] bg-[#f4f7ff] dark:bg-[#1b2335]">
            <img
              src="/fun-assets/905-gunners/values-olive-tree.png"
              alt=""
              className="pointer-events-none absolute -right-16 top-1/2 h-[260px] w-[260px] max-w-none -translate-y-1/2 object-contain opacity-[0.10] dark:opacity-[0.08]"
            />
            <CardCopy title="Our values">
              <p>{feature.valuesCardDetail}</p>
            </CardCopy>
            <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
              {["Unity", "Resilience", "Fairness"].map((value) => (
                <span
                  key={value}
                  className="glossy-tile rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-[13px] leading-none dark:border-white/10 dark:bg-[#25252d] dark:text-[#f5f5f7]"
                >
                  {value}
                </span>
              ))}
            </div>
          </StoryCard>

          <StoryCard className="min-h-[160px] bg-[#f4fbf7] dark:bg-[#1a2a23]">
            <img
              src="/fun-assets/905-gunners/hosting-trophy.png"
              alt=""
              className="pointer-events-none absolute -right-5 top-1/2 h-[230px] w-[170px] max-w-none -translate-y-1/2 object-contain opacity-[0.12] dark:opacity-[0.10]"
            />
            <CardCopy title="Hosting charity tournaments">
              <p>{feature.tournamentCardDetail}</p>
            </CardCopy>
            <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
              {feature.metrics.map((metric) => (
                <span
                  key={metric.label}
                  className="glossy-tile rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-[13px] leading-none dark:border-white/10 dark:bg-[#25252d] dark:text-[#f5f5f7]"
                >
                  <strong>{metric.value}</strong>&nbsp; {metric.label}
                </span>
              ))}
            </div>
          </StoryCard>
        </div>

        <section className="mt-14">
          <h2 className="text-[28px] font-bold tracking-[-0.025em]">Our team</h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
            <p>{feature.summary}</p>
          </div>
          <SectionImageGallery images={feature.teamImages} onOpen={openFocusedImage} />
        </section>

        <section className="mt-16">
          <h2 className="text-[28px] font-bold tracking-[-0.025em]">
            Charity tournaments and giving back
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
            {feature.charityDetail}
          </p>
          <SectionImageGallery images={feature.tournamentImages} onOpen={openFocusedImage} />
        </section>

      </div>

      {focusedImage && (
        <ImageFocusOverlay
          image={focusedImage}
          isClosing={isFocusedImageClosing}
          onClose={closeFocusedImageWithAnimation}
        />
      )}
    </>
  );
}

type StoryCardProps = {
  className: string;
  children: ReactNode;
};

function StoryCard({ className, children }: StoryCardProps) {
  return (
    <article
      className={`fun-item glossy-tile relative isolate flex flex-col justify-end overflow-hidden rounded-2xl border p-[18px] text-ink dark:text-[#f5f5f7] ${className}`}
    >
      {children}
    </article>
  );
}

type CardCopyProps = {
  title: string;
  children: ReactNode;
};

function CardCopy({ title, children }: CardCopyProps) {
  return (
    <div className="relative z-10">
      <h3 className="text-[17px] font-bold tracking-[-0.01em]">{title}</h3>
      <div className="mt-2 text-[14px] leading-relaxed text-[#40404a] dark:text-[#d7d7df]">
        {children}
      </div>
    </div>
  );
}

type SectionImageGalleryProps = {
  images: FocusImage[];
  onOpen: (image: FocusImage) => void;
};

function SectionImageGallery({ images, onOpen }: SectionImageGalleryProps) {
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

function ReadMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="fun-item glossy-tile mt-5 inline-flex items-center gap-2 rounded-full border bg-panel px-4 py-2.5 text-sm font-semibold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-appleBlue focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:bg-[#23232b] dark:text-white dark:focus-visible:ring-offset-[#19191f]"
      onClick={onClick}
    >
      Read more
      <FaArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
    </button>
  );
}

type GalleryImageButtonProps = {
  image: FocusImage;
  onOpen: (image: FocusImage) => void;
  className: string;
  imageClassName: string;
  eager?: boolean;
};

function GalleryImageButton({
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
