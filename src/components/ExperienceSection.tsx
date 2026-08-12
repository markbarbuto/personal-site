import { experience } from "../data/experience";
import { SectionCard } from "./SectionCard";

export function ExperienceSection() {
  return (
    <section id="experience" className="pt-[52px]">
      <h2 className="mb-[18px] text-[30px] font-bold tracking-[-0.02em]">Work experience</h2>
      <SectionCard>
        {experience.map((item, index) => {
          const isLast = index === experience.length - 1;
          return (
            <article
              key={`${item.company}-${item.role}`}
              className={`relative border-l-2 pl-7 ${
                isLast ? "border-transparent pb-0" : "border-[#e6e6ea] pb-[26px] dark:border-white/10"
              }`}
            >
              <span className="absolute left-[-8px] top-[3px] h-3.5 w-3.5 rounded-full border-[3px] border-white bg-appleBlue shadow-[0_0_0_1px_#e6e6ea] dark:border-[#19191f] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-[17px] font-semibold">{item.role}</h3>
                <div className="text-[13.5px] font-semibold text-appleBlue">{item.dates}</div>
              </div>
              <div className="mt-0.5 text-[14.5px] font-medium text-muted dark:text-[#b7b7c2]">{item.company}</div>
              <p className="mt-1.5 text-[15px] leading-normal text-muted dark:text-[#b7b7c2]">{item.description}</p>
            </article>
          );
        })}
      </SectionCard>
    </section>
  );
}
