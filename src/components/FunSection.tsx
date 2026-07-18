import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { funItems } from "../data/fun";
import type { FunItem } from "../types/fun";
import { FunInterestContent } from "./FunInterestContent";
import { FunInterestDetail } from "./FunInterestDetail";
import { SectionCard } from "./SectionCard";

function getDeepLinkedTravelItem() {
  if (!window.location.hash.startsWith("#travel-")) return null;

  const tripId = window.location.hash.replace(/^#travel-/, "");
  return (
    funItems.find(
      (item) => item.feature?.type === "travel" && item.feature.trips.some((trip) => trip.id === tripId),
    ) ?? null
  );
}

export function FunSection() {
  const deepLinkedTravelItem = getDeepLinkedTravelItem();
  const [openKey, setOpenKey] = useState<string | null>(deepLinkedTravelItem?.key ?? null);
  const openItem = funItems.find((item) => item.key === openKey) ?? null;
  const [accordionItem, setAccordionItem] = useState(openItem);
  const [detailItem, setDetailItem] = useState<FunItem | null>(deepLinkedTravelItem);
  const accordionId = "fun-accordion";

  useEffect(() => {
    if (openItem) {
      setAccordionItem(openItem);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setAccordionItem(null), 300);
    return () => window.clearTimeout(timeoutId);
  }, [openItem]);

  function selectItem(item: FunItem) {
    setOpenKey((current) => (current === item.key ? null : item.key));
  }

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
                className="fun-card-tinted fun-item glossy-tile relative isolate flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl border p-[18px] text-left text-ink transition dark:text-white"
                style={
                  {
                    "--fun-tint": item.tint,
                    "--fun-accent": item.accent,
                  } as CSSProperties
                }
                data-active={active}
                onClick={() => selectItem(item)}
                aria-expanded={active}
                aria-controls={accordionId}
              >
                {item.decoration && (
                  <>
                    <img
                      src={item.decoration.src}
                      alt={item.decoration.alt}
                      className={
                        item.decoration.mode === "cover"
                          ? "pointer-events-none absolute inset-0 h-full w-full object-cover"
                          : "pointer-events-none absolute -right-7 -top-7 h-48 w-48 object-contain opacity-[0.15] dark:opacity-[0.18]"
                      }
                      style={{ objectPosition: item.decoration.objectPosition }}
                      loading="lazy"
                    />
                    {item.decoration.mode === "cover" && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10"
                      />
                    )}
                  </>
                )}
                <div className="relative z-10 flex items-start gap-2">
                  <span className="min-h-[24px] text-[22px]" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>
                <div
                  className={`relative z-10 mt-3 flex items-center justify-between gap-2 ${
                    item.decoration?.mode === "cover" ? "text-white" : ""
                  }`}
                >
                  <div className="text-[15px] font-semibold">{item.title}</div>
                  <FaChevronDown
                    aria-hidden="true"
                    className="h-[18px] w-[18px] flex-none transition-transform"
                    color={item.accent}
                    style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div
          id={accordionId}
          className={`grid transition-[grid-template-rows,opacity,margin-top] duration-[250ms] ease-in-out ${
            openItem ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className={`min-h-0 ${openItem ? "overflow-visible" : "overflow-hidden"}`}>
            <div
              className={`px-1 pt-4 transition-[opacity,transform] duration-[450ms] ease-in-out ${
                openItem ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
            >
              {accordionItem && (
                <FunInterestContent
                  item={accordionItem}
                  layout="inline"
                  onReadMore={() => setDetailItem(accordionItem)}
                />
              )}
            </div>
          </div>
        </div>
      </SectionCard>

      {detailItem && (
        <FunInterestDetail item={detailItem} onClose={() => setDetailItem(null)} />
      )}
    </section>
  );
}
