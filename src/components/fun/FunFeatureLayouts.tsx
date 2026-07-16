import type { ReactNode } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
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
  link: FunLink;
  headerImage: FocusImage;
  onOpenImage: (image: FocusImage) => void;
  children: ReactNode;
};

export function FunFeatureDetailLayout({
  title,
  tagline,
  link,
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
          <BlueAction href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label}
            <FaArrowUpRightFromSquare aria-hidden="true" className="h-4 w-4" />
          </BlueAction>
        </div>
        <p className="mt-2 text-[17px] font-medium text-appleBlue">{tagline}</p>
      </header>

      {children}
    </div>
  );
}
