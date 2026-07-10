import type { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
};

export function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <div
      className={`rounded-[22px] border border-black/5 bg-white p-[30px] shadow-soft transition-colors dark:border-white/10 dark:bg-[#19191f] dark:shadow-[0_16px_48px_rgba(0,0,0,0.3)] ${className}`}
    >
      {children}
    </div>
  );
}
