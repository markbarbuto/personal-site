import type { ReactNode } from "react";
import { FaArrowDown, FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { FocusImage } from "../../types/content";
import type { FunLink } from "../../types/fun";
import { BlueAction } from "../BlueAction";
import { GalleryImageButton } from "./FunImageGallery";
import { ReadMoreButton } from "./ReadMoreButton";

type FunFeaturePreviewProps = {
  title: string;
  detail: string;
  image: FocusImage;
  onOpenImage: (image: FocusImage) => void;
  onReadMore?: () => void;
};

export function FunFeaturePreview({
  title,
  detail,
  image,
  onOpenImage,
  onReadMore,
}: FunFeaturePreviewProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-[1.05fr_0.95fr] sm:items-center">
      <div>
        <h3 className="text-[20px] font-bold leading-none tracking-[-0.02em]">{title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
          {detail}
        </p>
        {onReadMore && <ReadMoreButton onClick={onReadMore} />}
      </div>

      <GalleryImageButton
        image={image}
        onOpen={onOpenImage}
        className="aspect-[6/4] w-full"
        imageClassName="h-full w-full object-cover"
        eager
      />
    </div>
  );
}

type FunFeatureDetailLayoutProps = {
  title: string;
  tagline: string;
  actions?: FunLink[];
  headerImage: FocusImage;
  onOpenImage: (image: FocusImage) => void;
  children: ReactNode;
};

export function FunFeatureDetailLayout({
  title,
  tagline,
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

      {children}
    </div>
  );
}
