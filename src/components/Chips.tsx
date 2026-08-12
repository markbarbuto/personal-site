import type { MouseEventHandler, ReactNode } from "react";

type GlossyChipProps = {
  children: ReactNode;
  icon?: ReactNode;
};

export function GlossyChip({ children, icon }: GlossyChipProps) {
  return (
    <span className="glossy-tile inline-flex items-center gap-[9px] rounded-full border border-black/5 bg-panel py-2 pl-[11px] pr-[15px] text-sm font-medium dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7]">
      {icon}
      {children}
    </span>
  );
}

type ProjectTagChipProps = {
  tag: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const projectTagChipClass =
  "inline-flex flex-none whitespace-nowrap px-0 py-1 text-[12.5px] font-semibold text-appleBlue";

const clickableProjectTagChipClass = `${projectTagChipClass} transition-colors hover:text-[#005bb5] dark:hover:text-[#66b3ff]`;

export function ProjectTagChip({ tag, ariaLabel, onClick }: ProjectTagChipProps) {
  const label = `#${tag}`;

  if (onClick) {
    return (
      <button
        type="button"
        className={clickableProjectTagChipClass}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }

  return <span className={projectTagChipClass}>{label}</span>;
}
