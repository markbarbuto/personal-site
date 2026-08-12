import type { ReactNode } from "react";
import { FaArrowDown, FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { FocusImage } from "../../types/content";
import type { FunLink } from "../../types/fun";
import { BlueAction } from "../BlueAction";
import { GalleryImageButton } from "./FunImageGallery";
import { ReadMoreButton } from "./ReadMoreButton";

type FunFeaturePreviewProps = {
  title: string;
  preview: string;
  image?: FocusImage;
  imageClassName?: string;
  onOpenImage?: (image: FocusImage) => void;
  onReadMore?: () => void;
};

export function FunFeaturePreview({
  title,
  preview,
  image,
  imageClassName = "h-full w-full object-cover",
  onOpenImage,
  onReadMore,
}: FunFeaturePreviewProps) {
  return (
    <div
      className={`grid h-full grid-rows-[auto_auto_1fr_auto] gap-y-4 sm:grid-rows-[auto_1fr] ${
        image
          ? "gap-x-5 sm:grid-cols-[1.05fr_0.95fr]"
          : ""
      }`}
    >
      <h3 className="row-start-1 py-0.5 text-[20px] font-bold leading-none tracking-[-0.02em] sm:col-start-1">
        {title}
      </h3>

      <div className="contents sm:col-start-1 sm:row-start-2 sm:flex sm:min-h-0 sm:flex-col">
        <p className="row-start-2 line-clamp-6 text-[15px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
          {preview}
        </p>

        {onReadMore && (
          <div className="row-start-4 mt-auto pt-5">
            <ReadMoreButton className="mt-0" onClick={onReadMore} />
          </div>
        )}
      </div>

      {image &&
        (onOpenImage ? (
          <GalleryImageButton
            image={image}
            onOpen={onOpenImage}
            className="row-start-3 h-full min-h-0 w-full self-stretch sm:col-start-2 sm:row-start-2"
            imageClassName={imageClassName}
            eager
          />
        ) : (
          <div className="row-start-3 h-full min-h-0 w-full self-stretch overflow-hidden rounded-[18px] bg-black/5 shadow-[0_16px_38px_rgba(0,0,0,0.11)] dark:bg-white/5 sm:col-start-2 sm:row-start-2">
            <img
              src={image.src}
              alt={image.alt}
              className={imageClassName}
              style={{ objectPosition: image.objectPosition }}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
    </div>
  );
}

type FunFeatureDetailLayoutProps = {
  title: string;
  tagline: string;
  preview: string;
  actions?: FunLink[];
  headerImage: FocusImage;
  onOpenImage: (image: FocusImage) => void;
  children: ReactNode;
};

export function FunFeatureDetailLayout({
  title,
  tagline,
  preview,
  actions = [],
  headerImage,
  onOpenImage,
  children,
}: FunFeatureDetailLayoutProps) {
  return (
    <div>
      <GalleryImageButton
        image={headerImage}
        onOpen={onOpenImage}
        className="aspect-[3/1] w-full !rounded-[26px]"
        imageClassName="h-full w-full object-cover"
        eager
      />

      <header className="mt-[26px]">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-4">
          <h1 className="min-w-0 flex-1 text-[clamp(34px,5vw,52px)] font-bold leading-none tracking-[-0.03em]">
            {title}
          </h1>
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {actions.map((action) => {
                const isPageLink = action.url.startsWith("#");

                return (
                  <BlueAction
                    key={`${action.label}-${action.url}`}
                    href={action.url}
                    target={isPageLink ? undefined : "_blank"}
                    rel={isPageLink ? undefined : "noopener noreferrer"}
                    onAnchorClick={
                      isPageLink && action.preserveHash
                        ? (event) => {
                            event.preventDefault();
                            document.querySelector(action.url)?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        : undefined
                    }
                  >
                    {action.label}
                    {isPageLink ? (
                      <FaArrowDown aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <FaArrowUpRightFromSquare aria-hidden="true" className="h-4 w-4" />
                    )}
                  </BlueAction>
                );
              })}
            </div>
          )}
        </div>
        <p className="mt-2 text-[17px] font-medium text-appleBlue">{tagline}</p>
      </header>

      <p className="mt-8 max-w-[760px] text-[18px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
        {preview}
      </p>

      {children}
    </div>
  );
}
