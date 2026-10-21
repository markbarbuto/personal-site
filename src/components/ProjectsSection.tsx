import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, MouseEvent } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { projects } from "../data/projects";
import type { Project } from "../types/content";
import { ProjectTagChip } from "./Chips";
import { ProjectDetail } from "./ProjectDetail";
import { SectionCard } from "./SectionCard";

const featuredProjectNames = ["Vitae AI", "Path to Recovery", "Indigenous Supports from KHP"];
const featuredProjects = projects.filter((project) => featuredProjectNames.includes(project.name));

type ProjectFilter = { kind: "featured" } | { kind: "all" } | { kind: "tag"; tag: string };

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>({ kind: "featured" });
  const [tagsExpanded, setTagsExpanded] = useState(false);
  // How many filter buttons fit on the first row next to the "+N more" chip; null when every button fits.
  const [collapsedCount, setCollapsedCount] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const tagListRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const allTags = useMemo(() => [...new Set(projects.flatMap((project) => project.tags))], []);
  const visibleProjects =
    filter.kind === "featured"
      ? featuredProjects
      : filter.kind === "tag"
        ? projects.filter((project) => project.tags.includes(filter.tag))
        : projects;
  const activeTag = filter.kind === "tag" ? filter.tag : null;

  const filterButtons = [
    {
      key: "featured",
      label: "Featured",
      ariaLabel: "Show featured projects",
      active: filter.kind === "featured",
      onClick: () => setFilter({ kind: "featured" }),
    },
    ...allTags.map((tag) => ({
      key: tag,
      label: `#${tag}`,
      ariaLabel: `Filter projects by ${tag} tag`,
      active: activeTag === tag,
      onClick: () => selectTag(tag),
    })),
  ];
  const shownButtons =
    tagsExpanded || collapsedCount === null ? filterButtons : filterButtons.slice(0, collapsedCount);

  const measureFirstRow = useCallback(() => {
    const tagList = tagListRef.current;
    const measure = measureRef.current;
    if (!tagList || !measure) return;

    const widths = ([...measure.children] as HTMLElement[]).map((child) => child.offsetWidth);
    const chipWidth = widths.pop() ?? 0;
    setCollapsedCount(fitFirstRow(widths, chipWidth, tagList.clientWidth, TAG_GAP));
  }, []);

  // Re-measure when the active filter changes, since the active button renders bolder and wider.
  useLayoutEffect(measureFirstRow, [measureFirstRow, filter]);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(measureFirstRow);
    if (tagListRef.current) observer.observe(tagListRef.current);
    if (measureRef.current) observer.observe(measureRef.current);
    return () => observer.disconnect();
  }, [measureFirstRow]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenProject(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function selectTag(tag: string) {
    setFilter(activeTag === tag ? { kind: "featured" } : { kind: "tag", tag });
  }

  function onTagClick(event: MouseEvent<HTMLButtonElement>, tag: string) {
    event.stopPropagation();
    selectTag(tag);
    // Reveal the tag in the filter list if it was picked from a card while collapsed.
    if (collapsedCount !== null && allTags.indexOf(tag) + 1 >= collapsedCount) {
      setTagsExpanded(true);
    }
  }

  function toggleTags() {
    flushSync(() => setTagsExpanded((current) => !current));
    // The chip moves between the first and last row, so put keyboard focus somewhere sensible.
    const buttons = tagListRef.current?.querySelectorAll("button");
    if (!buttons || collapsedCount === null) return;
    buttons[tagsExpanded ? buttons.length - 1 : collapsedCount]?.focus();
  }

  function onProjectKeyDown(event: ReactKeyboardEvent<HTMLElement>, project: Project) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpenProject(project);
    }
  }

  return (
    <section id="projects" className="pt-[52px]">
      <div className="mb-4 flex min-h-10 flex-wrap items-center justify-between gap-4">
        <h2 className="text-[30px] font-bold tracking-[-0.02em]">Projects</h2>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-[9px] text-sm font-semibold text-appleBlue transition-colors hover:bg-black/[0.055] dark:border-white/10 dark:bg-[#1f1f27] dark:hover:bg-white/10"
          onClick={() => setFilter(filter.kind === "all" ? { kind: "featured" } : { kind: "all" })}
        >
          {filter.kind === "all" ? "Show less" : `View all projects (${projects.length})`}
        </button>
      </div>

      <SectionCard className="flex flex-col gap-[18px]">
        <div className="relative">
          <div ref={tagListRef} className="flex flex-wrap gap-2">
            {shownButtons.map(({ key, ...button }) => (
              <TagButton key={key} {...button} />
            ))}
            {collapsedCount !== null && (
              <MoreTagsChip
                expanded={tagsExpanded}
                hiddenCount={filterButtons.length - collapsedCount}
                onClick={toggleTags}
              />
            )}
          </div>
          {/* Off-screen copy of every button at its natural width, used to work out what fits on the first row. */}
          <div aria-hidden className="pointer-events-none invisible absolute inset-x-0 top-0 h-0 overflow-hidden">
            <div ref={measureRef} className="flex w-max gap-2">
              {filterButtons.map(({ key, ...button }) => (
                <TagButton key={key} {...button} />
              ))}
              <MoreTagsChip expanded={false} hiddenCount={filterButtons.length} onClick={() => {}} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              tint={project.tint}
              onOpen={() => setOpenProject(project)}
              onKeyDown={(event) => onProjectKeyDown(event, project)}
              onTagClick={onTagClick}
            />
          ))}
          {visibleProjects.length === 0 && (
            <div className="px-5 py-10 text-center text-[15px] text-[#a1a1a6] dark:text-[#858592]">
              No projects with that tag yet.
            </div>
          )}
        </div>
      </SectionCard>

      {openProject && <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} />}
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  tint: string;
  onOpen: () => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
  onTagClick: (event: MouseEvent<HTMLButtonElement>, tag: string) => void;
};

function ProjectCard({ project, tint, onOpen, onKeyDown, onTagClick }: ProjectCardProps) {
  return (
    <article
      className="project-card project-card-tinted glossy-tile flex min-h-[200px] flex-col items-stretch gap-6 rounded-[22px] border border-black/5 p-[30px] text-left text-ink transition sm:flex-row sm:items-center dark:border-white/10 dark:text-[#f5f5f7]"
      style={{ "--project-tint": tint } as CSSProperties}
      onClick={onOpen}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open project details for ${project.name}`}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#a1a1a6] dark:text-[#858592]">
          {project.kind}
        </span>
        <h3 className="mt-1 text-[21px] font-bold tracking-[-0.015em]">{project.name}</h3>
        <p className="mt-[7px] line-clamp-2 text-[15px] leading-normal text-muted dark:text-[#b7b7c2]">
          {project.description}
        </p>
        <div className="mt-[13px] flex min-w-0 flex-nowrap gap-[7px] overflow-hidden">
          {project.tags.map((tag) => (
            <ProjectTagChip
              key={tag}
              tag={tag}
              ariaLabel={`Filter projects by ${tag} tag from ${project.name}`}
              onClick={(event) => onTagClick(event, tag)}
            />
          ))}
        </div>
      </div>
      {project.images?.card ? (
        <div className="flex h-[140px] w-full flex-none items-center justify-center self-center overflow-hidden rounded-2xl sm:w-[140px]">
          <img
            src={project.images.card.src}
            alt={project.images.card.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className="flex h-[140px] w-full flex-none items-center justify-center self-center rounded-2xl sm:w-[140px]"
          style={{ background: `linear-gradient(140deg, ${project.gradient})` }}
        >
          <span className="text-[64px] font-extrabold tracking-[-0.03em] text-white/30">
            {project.name.charAt(0)}
          </span>
        </div>
      )}
    </article>
  );
}

const TAG_GAP = 8;

// Returns how many buttons fit on one row with the chip after them, or null if every button fits without it.
function fitFirstRow(widths: number[], chipWidth: number, rowWidth: number, gap: number) {
  const totalWidth = widths.reduce((sum, width) => sum + width, 0) + gap * (widths.length - 1);
  if (totalWidth <= rowWidth) return null;

  let usedWidth = chipWidth;
  let count = 0;
  for (const width of widths) {
    if (usedWidth + gap + width > rowWidth) break;
    usedWidth += gap + width;
    count++;
  }
  return Math.max(count, 1);
}

type MoreTagsChipProps = {
  expanded: boolean;
  hiddenCount: number;
  onClick: () => void;
};

function MoreTagsChip({ expanded, hiddenCount, onClick }: MoreTagsChipProps) {
  return (
    <button
      type="button"
      className="rounded-full border border-transparent px-3.5 py-[7px] text-[13px] font-semibold text-appleBlue transition hover:bg-black/[0.055] dark:hover:bg-white/10"
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={expanded ? "Show fewer tags" : `Show ${hiddenCount} more tags`}
    >
      {expanded ? "Show less" : `+${hiddenCount} more`}
    </button>
  );
}

type TagButtonProps = {
  label: string;
  ariaLabel: string;
  active: boolean;
  onClick: () => void;
};

function TagButton({ label, ariaLabel, active, onClick }: TagButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full px-3.5 py-[7px] text-[13px] transition ${
        active
          ? "border border-appleBlue bg-appleBlue font-semibold text-white hover:bg-[#0077ed]"
          : "border border-black/10 bg-white font-medium text-ink hover:bg-black/[0.055] dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7] dark:hover:bg-white/10"
      }`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
