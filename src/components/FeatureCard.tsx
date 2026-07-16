import type { ReactNode } from "react";

type FeatureCardProps = {
  className?: string;
  children: ReactNode;
};

export function FeatureCard({ className = "", children }: FeatureCardProps) {
  return (
    <article
      className={`fun-item glossy-tile relative isolate flex overflow-hidden rounded-2xl border p-[18px] text-ink dark:text-[#f5f5f7] ${className}`}
    >
      {children}
    </article>
  );
}

type FeatureCardCopyProps = {
  title: string;
  children: ReactNode;
};

export function FeatureCardCopy({ title, children }: FeatureCardCopyProps) {
  return (
    <div className="relative z-10">
      <h3 className="text-[17px] font-bold tracking-[-0.01em]">{title}</h3>
      <div className="mt-2 text-[14px] leading-relaxed text-[#40404a] dark:text-[#d7d7df]">
        {children}
      </div>
    </div>
  );
}

export function CompactGlossyChip({ children }: { children: ReactNode }) {
  return (
    <span className="glossy-tile rounded-full border border-black/5 bg-white/90 px-3 py-1.5 text-[13px] leading-none dark:border-white/10 dark:bg-[#25252d] dark:text-[#f5f5f7]">
      {children}
    </span>
  );
}
