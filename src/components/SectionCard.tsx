import type { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
};

export function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <div
      className={`rounded-[22px] border border-black/5 bg-white p-[30px] shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
