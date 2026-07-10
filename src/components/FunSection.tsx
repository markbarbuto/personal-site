import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { FaArrowUpRightFromSquare, FaChevronDown } from "react-icons/fa6";
import { funItems } from "../data/fun";
import { SectionCard } from "./SectionCard";

export function FunSection() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openItem = funItems.find((item) => item.key === openKey) ?? null;
  const [detailItem, setDetailItem] = useState(openItem);
  const detailId = "fun-detail";

  useEffect(() => {
    if (openItem) {
      setDetailItem(openItem);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setDetailItem(null), 300);
    return () => window.clearTimeout(timeoutId);
  }, [openItem]);

  return (
    <section id="fun" className="pt-[52px]">
      <h2 className="mb-[18px] text-[30px] font-bold tracking-[-0.02em]">Fun</h2>
      <SectionCard>
        <p className="mb-[22px] text-base leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
          When I'm not shipping, you'll usually find me somewhere in one of these:
        </p>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {funItems.map((item) => {
            const active = item.key === openKey;
            return (
              <button
                key={item.key}
                type="button"
                className="fun-card-tinted fun-item glossy-tile rounded-2xl border p-[18px] text-left text-ink transition dark:text-white"
                style={{
                  "--fun-tint": item.tint,
                  "--fun-accent": item.accent,
                } as CSSProperties}
                data-active={active}
                onClick={() => setOpenKey((current) => (current === item.key ? null : item.key))}
                aria-expanded={active}
                aria-controls={detailId}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[22px]" aria-hidden="true">
                    {item.icon}
                  </span>
                  <FaChevronDown
                    aria-hidden="true"
                    className="h-[18px] w-[18px] transition-transform"
                    color={item.accent}
                    style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </div>
                <div className="mt-2 text-[15px] font-semibold">{item.title}</div>
                <div className="mt-0.5 text-[13px] text-muted dark:text-white/70">
                  {item.tagline}
                </div>
              </button>
            );
          })}
        </div>
        <div
          id={detailId}
          className={`grid transition-[grid-template-rows,opacity,margin-top] duration-[350ms] ease-in-out ${
            openItem ? "mt-3.5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={`px-[18px] py-[18px] transition-[opacity,transform] duration-[350ms] ease-in-out ${
                openItem ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
            >
              {detailItem && (
                <>
                  <h3 className="text-[15px] font-bold">{detailItem.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#40404a] dark:text-[#c7c7d1]">
                    {detailItem.detail}
                  </p>
                  {detailItem.link && (
                    <a
                      href={detailItem.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-semibold no-underline"
                      style={{ color: detailItem.accent }}
                    >
                      {detailItem.link.label}
                      <FaArrowUpRightFromSquare aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </SectionCard>
    </section>
  );
}
