import { useState } from "react";
import { FaArrowLeft, FaArrowUpRightFromSquare, FaCheck } from "react-icons/fa6";
import type { Project } from "../types/content";
import { GlossyChip, ProjectTagChip } from "./Chips";

type ProjectDetailProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [isClosing, setIsClosing] = useState(false);

  function closeWithAnimation() {
    if (isClosing) return;

    setIsClosing(true);
    window.setTimeout(onClose, 300);
  }

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

        <div className="mt-[26px] flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#a1a1a6] dark:text-[#858592]">
              {project.kind}
            </span>
            <h1 className="mt-1.5 text-[clamp(34px,5vw,52px)] font-bold leading-none tracking-[-0.03em]">
              {project.name}
            </h1>
            <div className="mt-2 text-[17px] font-medium text-appleBlue">{project.role}</div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="send-btn inline-flex items-center gap-2 rounded-full bg-appleBlue px-[26px] py-[13px] text-[15px] font-semibold text-white no-underline transition-colors"
            >
              View live <FaArrowUpRightFromSquare aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[7px] rounded-full border border-black/10 bg-white px-5 py-[11px] text-sm font-semibold text-ink no-underline transition-colors dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7]"
            >
              Source
            </a>
          </div>
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
