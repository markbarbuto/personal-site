import { useLayoutEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowUpRightFromSquare, FaCheck } from "react-icons/fa6";
import type { Project } from "../types/content";
import { BlueAction } from "./BlueAction";
import { GlossyChip, ProjectTagChip } from "./Chips";

type ProjectDetailProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [actionsBelowTitle, setActionsBelowTitle] = useState(false);
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

  function closeWithAnimation() {
    if (isClosing) return;

    setIsClosing(true);
    window.setTimeout(onClose, 300);
  }

  const projectActions = (
    <>
      <BlueAction href={project.links.live} target="_blank" rel="noopener noreferrer">
        View live <FaArrowUpRightFromSquare aria-hidden="true" className="h-4 w-4" />
      </BlueAction>
      <a
        href={project.links.source}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-[7px] rounded-full border border-black/10 bg-white px-5 py-[11px] text-sm font-semibold text-ink no-underline transition-colors dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7]"
      >
        Source
      </a>
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
        <div
          className="flex min-h-[300px] items-end rounded-[26px] p-[34px] shadow-[0_26px_64px_rgba(0,0,0,0.16)]"
          style={{ background: `linear-gradient(140deg, ${project.gradient})` }}
        >
          <span className="text-8xl font-extrabold leading-[0.8] tracking-[-0.04em] text-white/90">
            {project.name.charAt(0)}
          </span>
        </div>

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

        <p className="mt-[26px] max-w-[680px] text-[19px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
          {project.overview}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className="h-60 rounded-[18px]"
            style={{ background: `linear-gradient(150deg, ${project.gradient})` }}
          />
          <div
            className="h-60 rounded-[18px]"
            style={{ background: `linear-gradient(320deg, ${project.gradient})` }}
          />
        </div>

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
    </div>
  );
}
