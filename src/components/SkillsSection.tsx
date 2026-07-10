import { skillGroups } from "../data/skills";
import { BrandIcon } from "./icons/BrandIcon";
import { DeviconIcon } from "./icons/DeviconIcon";
import { FaSkillIcon } from "./icons/FaSkillIcon";
import { ImageIcon } from "./icons/ImageIcon";
import { SectionCard } from "./SectionCard";

export function SkillsSection() {
  return (
    <section id="skills" className="pt-[52px]">
      <h2 className="mb-[18px] text-[30px] font-bold tracking-[-0.02em]">
        Skills &amp; technologies
      </h2>
      <SectionCard className="flex flex-col px-[30px] py-2">
        {skillGroups.map((group, index) => (
          <div
            key={group.label}
            className={`grid gap-x-3 gap-y-[18px] py-[22px] sm:grid-cols-[132px_1fr] sm:items-center ${
              index === skillGroups.length - 1 ? "" : "border-b border-black/5 dark:border-white/10"
            }`}
          >
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[#a1a1a6] dark:text-[#858592]">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                <span
                  key={`${group.label}-${skill.label}`}
                  className="glossy-tile inline-flex items-center gap-[9px] rounded-full border border-black/5 bg-panel py-2 pl-[11px] pr-[15px] text-sm font-medium dark:border-white/10 dark:bg-[#23232b] dark:text-[#f5f5f7]"
                >
                  {skill.icon.type === "brand" ? (
                    <BrandIcon name={skill.icon.name} color={skill.icon.color} />
                  ) : skill.icon.type === "devicon" ? (
                    <DeviconIcon name={skill.icon.name} />
                  ) : skill.icon.type === "image" ? (
                    <ImageIcon src={skill.icon.src} />
                  ) : (
                    <FaSkillIcon name={skill.icon.name} color={skill.icon.color} />
                  )}
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </SectionCard>
    </section>
  );
}
