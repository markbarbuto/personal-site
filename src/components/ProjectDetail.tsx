import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowUpRightFromSquare,
  FaCheck,
  FaClock,
  FaXmark,
} from "react-icons/fa6";
import type { Project, ProjectContentBlock } from "../types/content";
import { BlueAction } from "./BlueAction";
import { GlossyChip, ProjectTagChip } from "./Chips";

type ProjectDetailProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [actionsBelowTitle, setActionsBelowTitle] = useState(false);
  const [focusedImage, setFocusedImage] = useState<ProjectContentImage | null>(null);
  const [isFocusedImageClosing, setIsFocusedImageClosing] = useState(false);
  const titleRowRef = useRef<HTMLDivElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const titleMeasureRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    function measureTitleFit() {
      if (!titleRowRef.current || !actionsRef.current || !titleMeasureRef.current) return;

      const rowWidth = titleRowRef.current.clientWidth;
      const actionsWidth = actionsRef.current.offsetWidth;
      const titleWidth = titleMeasureRef.current.scrollWidth;
      const titleActionGap = 20;

      setActionsBelowTitle(titleWidth + actionsWidth + titleActionGap > rowWidth);
    }

    measureTitleFit();

    const resizeObserver = new ResizeObserver(measureTitleFit);
    [titleRowRef.current, actionsRef.current, titleMeasureRef.current].forEach((element) => {
      if (element) resizeObserver.observe(element);
    });
    window.addEventListener("resize", measureTitleFit);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureTitleFit);
    };
  }, [project.name]);

  const closeFocusedImageWithAnimation = useCallback(() => {
    if (isFocusedImageClosing) return;

    setIsFocusedImageClosing(true);
    window.setTimeout(() => {
      setFocusedImage(null);
      setIsFocusedImageClosing(false);
    }, 200);
  }, [isFocusedImageClosing]);

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

  function openFocusedImage(image: ProjectContentImage) {
    setIsFocusedImageClosing(false);
    setFocusedImage(image);
  }

  function closeWithAnimation() {
    if (isClosing) return;

    setIsClosing(true);
    window.setTimeout(onClose, 300);
  }

  function navigateToPageSection(sectionId: string) {
    if (isClosing) return;

    setIsClosing(true);
    window.setTimeout(() => {
      onClose();
      window.setTimeout(() => {
        document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", sectionId);
      }, 0);
    }, 300);
  }

  const projectActions = (
    <>
      {project.links.live &&
        (project.links.live.href.startsWith("#") ? (
          <BlueAction onClick={() => navigateToPageSection(project.links.live!.href)}>
            {project.links.live.label ?? "View live"}
          </BlueAction>
        ) : (
          <BlueAction href={project.links.live.href} target="_blank" rel="noopener noreferrer">
            {project.links.live.label ?? "View live"} <FaArrowUpRightFromSquare aria-hidden="true" className="h-4 w-4" />
          </BlueAction>
        ))}
      {project.links.source && "href" in project.links.source && (
        <a
          href={project.links.source.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[7px] rounded-full border border-black/10 bg-white px-5 py-[11px] text-sm font-semibold text-ink no-underline transition-colors dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7]"
        >
          {project.links.source.label ?? "Source"}
        </a>
      )}
      {project.links.comingSoon && (
        <span className="inline-flex items-center gap-[7px] rounded-full border border-black/10 bg-white px-5 py-[11px] text-sm font-semibold text-ink dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7]">
          <FaClock aria-hidden="true" className="h-4 w-4" />
          Coming soon
        </span>
      )}
    </>
  );

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-y-auto bg-panel dark:bg-[#101014] ${
        isClosing ? "fade-out" : "fade-in"
      }`}
      role="dialog"
      aria-modal="true"
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
        {project.images?.detailHeader ? (
          <img
            src={project.images.detailHeader.src}
            alt={project.images.detailHeader.alt}
            className="block aspect-[3/1] w-full rounded-[26px] object-cover shadow-[0_26px_64px_rgba(0,0,0,0.16)]"
          />
        ) : (
          <div
            className="flex min-h-[300px] items-end rounded-[26px] p-[34px] shadow-[0_26px_64px_rgba(0,0,0,0.16)]"
            style={{ background: `linear-gradient(140deg, ${project.gradient})` }}
          >
            <span className="text-8xl font-extrabold leading-[0.8] tracking-[-0.04em] text-white/90">
              {project.name.charAt(0)}
            </span>
          </div>
        )}

        <div className="mt-[26px]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#a1a1a6] dark:text-[#858592]">
              {project.kind}
            </span>
            <div
              ref={titleRowRef}
              className="relative mt-1.5 flex flex-wrap items-center justify-between gap-x-5 gap-y-4"
            >
              <span
                ref={titleMeasureRef}
                aria-hidden="true"
                className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap text-[clamp(34px,5vw,52px)] font-bold leading-none tracking-[-0.03em]"
              >
                {project.name}
              </span>
              <h1 className="min-w-0 flex-1 text-[clamp(34px,5vw,52px)] font-bold leading-none tracking-[-0.03em]">
                {project.name}
              </h1>
              {!actionsBelowTitle && (
                <div ref={actionsRef} className="flex flex-wrap gap-2.5">
                  {projectActions}
                </div>
              )}
            </div>
            <div className="mt-2 text-[17px] font-medium text-appleBlue">{project.role}</div>
          </div>
          {actionsBelowTitle && <div ref={actionsRef} className="mt-4 flex flex-wrap gap-2.5">{projectActions}</div>}
        </div>

        <ProjectContent
          content={project.content}
          gradient={project.gradient}
          onOpenImage={openFocusedImage}
        />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.01em]">Highlights</h2>
            <div className="mt-4 flex flex-col gap-3">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <FaCheck
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-appleBlue"
                  />
                  <span className="text-[15.5px] leading-normal text-[#40404a] dark:text-[#c7c7d1]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-[-0.01em]">Built with</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <GlossyChip key={item}>
                  {item}
                </GlossyChip>
              ))}
            </div>
            <h2 className="mt-7 text-xl font-bold tracking-[-0.01em]">Tags</h2>
            <div className="mt-4 flex flex-wrap gap-[7px]">
              {project.tags.map((tag) => (
                <ProjectTagChip key={tag} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {focusedImage && (
        <ImageFocusOverlay
          image={focusedImage}
          isClosing={isFocusedImageClosing}
          onClose={closeFocusedImageWithAnimation}
        />
      )}
    </div>
  );
}

type ProjectContentProps = {
  content: Project["content"];
  gradient: string;
  onOpenImage: (image: ProjectContentImage) => void;
};

type ProjectContentImage = {
  src: string;
  alt: string;
  caption?: string;
};

function ProjectContent({ content, gradient, onOpenImage }: ProjectContentProps) {
  const blocks: ProjectContentBlock[] =
    typeof content === "string"
      ? [
          { type: "paragraph", text: content },
          {
            type: "gallery",
            images: [
              { src: "", alt: "" },
              { src: "", alt: "" },
            ],
          },
        ]
      : content;

  return (
    <div className="mt-[26px] flex flex-col gap-5">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <ContentImageFigure
              key={`${block.src}-${index}`}
              image={block}
              imageClassName="block w-full rounded-[18px] object-cover shadow-[0_18px_44px_rgba(0,0,0,0.12)]"
              onOpen={onOpenImage}
            />
          );
        }

        if (block.type === "gallery") {
          if (block.images.length === 0) return null;

          return (
            <div
              key={`gallery-${index}`}
              className={`my-3 grid grid-cols-1 gap-4 ${
                block.images.length > 1 ? "sm:grid-cols-2" : ""
              }`}
            >
              {block.images.map((image, imageIndex) =>
                image.src ? (
                  <ContentImageFigure
                    key={`${image.src}-${imageIndex}`}
                    image={image}
                    imageClassName="block h-60 w-full rounded-[18px] object-cover shadow-[0_18px_44px_rgba(0,0,0,0.12)]"
                    onOpen={onOpenImage}
                  />
                ) : (
                  <div
                    key={`fallback-${imageIndex}`}
                    className="h-60 rounded-[18px]"
                    style={{
                      background: `linear-gradient(${imageIndex % 2 === 0 ? "150deg" : "320deg"}, ${gradient})`,
                    }}
                  />
                ),
              )}
            </div>
          );
        }

        if (block.type === "link") {
          return (
            <a
              key={`${block.href}-${index}`}
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit max-w-full items-center gap-2 rounded-full text-[17px] font-semibold leading-normal text-appleBlue underline-offset-4 transition-colors hover:text-[#005bbf] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-appleBlue focus-visible:ring-offset-4 focus-visible:ring-offset-panel dark:hover:text-[#6fb4ff] dark:focus-visible:ring-offset-[#101014]"
            >
              <span className="min-w-0 break-words">{block.label}</span>
              <FaArrowUpRightFromSquare aria-hidden="true" className="h-4 w-4 flex-none" />
            </a>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              key={`${block.language ?? "code"}-${index}`}
              className="my-2 max-w-full overflow-x-auto rounded-[18px] border border-black/10 bg-[#1f2328] p-5 text-[13.5px] leading-relaxed text-[#f0f3f6] shadow-[0_18px_44px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#171b20]"
            >
              <code className={block.language ? `language-${block.language}` : undefined}>
                {block.code}
              </code>
            </pre>
          );
        }

        return (
          <p key={`${block.text.slice(0, 28)}-${index}`} className="w-full text-[19px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

type ContentImageFigureProps = {
  image: ProjectContentImage;
  imageClassName: string;
  onOpen: (image: ProjectContentImage) => void;
};

function ContentImageFigure({ image, imageClassName, onOpen }: ContentImageFigureProps) {
  return (
    <figure className="my-2">
      <button
        type="button"
        className="group block w-full cursor-zoom-in rounded-[18px] text-left transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-appleBlue focus-visible:ring-offset-4 focus-visible:ring-offset-panel dark:focus-visible:ring-offset-[#101014]"
        aria-label={`Open image: ${image.alt}`}
        onClick={() => onOpen(image)}
      >
        <img
          src={image.src}
          alt={image.alt}
          className={`${imageClassName} transition-shadow group-hover:shadow-[0_22px_56px_rgba(0,0,0,0.18)]`}
        />
      </button>
    </figure>
  );
}

type ImageFocusOverlayProps = {
  image: ProjectContentImage;
  isClosing: boolean;
  onClose: () => void;
};

function ImageFocusOverlay({ image, isClosing, onClose }: ImageFocusOverlayProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-8 ${
        isClosing ? "fade-out" : "fade-in"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/45 p-3 text-white shadow-[0_12px_36px_rgba(0,0,0,0.32)] transition-colors hover:bg-white/15 sm:right-6 sm:top-6"
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
    </div>
  );
}
