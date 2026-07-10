import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { projects } from "../data/projects";
import type { Project } from "../types/content";
import { ProjectDetail } from "./ProjectDetail";
import { SectionCard } from "./SectionCard";

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const allTags = useMemo(() => [...new Set(projects.flatMap((project) => project.tags))], []);
  const filteredProjects = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenProject(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function selectTag(tag: string | null) {
    setActiveTag((current) => (current === tag ? null : tag));
    setShowAll(false);
  }

  function onTagClick(event: MouseEvent<HTMLButtonElement>, tag: string) {
    event.stopPropagation();
    selectTag(tag);
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
        {filteredProjects.length > 3 && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-[9px] text-sm font-semibold text-appleBlue transition-colors dark:border-white/10 dark:bg-[#1f1f27]"
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? "Show less" : `View all projects (${filteredProjects.length})`}
          </button>
        )}
      </div>

      <SectionCard className="flex flex-col gap-[18px]">
        <div className="flex flex-wrap gap-2">
          <TagButton label="All" active={activeTag === null} onClick={() => selectTag(null)} />
          {allTags.map((tag) => (
            <TagButton
              key={tag}
              label={`#${tag}`}
              active={activeTag === tag}
              onClick={() => selectTag(tag)}
            />
          ))}
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
          {filteredProjects.length === 0 && (
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
        <div className="mt-[13px] flex flex-wrap gap-[7px]">
          {project.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-lg border-0 bg-appleBlue/10 px-2.5 py-1 text-[12.5px] font-semibold text-appleBlue dark:bg-appleBlue/15"
              aria-label={`Filter projects by ${tag} tag from ${project.name}`}
              onClick={(event) => onTagClick(event, tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      <div
        className="flex h-[140px] w-full flex-none items-center justify-center self-center rounded-2xl sm:w-[140px]"
        style={{ background: `linear-gradient(140deg, ${project.gradient})` }}
      >
        <span className="text-[64px] font-extrabold tracking-[-0.03em] text-white/30">
          {project.name.charAt(0)}
        </span>
      </div>
    </article>
  );
}

type TagButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function TagButton({ label, active, onClick }: TagButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full px-3.5 py-[7px] text-[13px] transition ${
        active
          ? "border border-appleBlue bg-appleBlue font-semibold text-white"
          : "border border-black/10 bg-white font-medium text-ink dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7]"
      }`}
      onClick={onClick}
      aria-label={label === "All" ? "Show all projects" : `Filter projects by ${label.slice(1)} tag`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
