import { skillGroups } from "../data/skills";
import type { Skill, SkillIcon as SkillIconData } from "../types/content";
import { GlossyChip } from "./Chips";
import { BrandIcon } from "./icons/BrandIcon";
import { DeviconIcon } from "./icons/DeviconIcon";
import { FaSkillIcon } from "./icons/FaSkillIcon";
import { ImageIcon } from "./icons/ImageIcon";
import { SectionCard } from "./SectionCard";

function SkillIcon({ icon }: { icon: SkillIconData }) {
  switch (icon.type) {
    case "brand":
      return <BrandIcon name={icon.name} color={icon.color} />;
    case "devicon":
      return <DeviconIcon name={icon.name} />;
    case "image":
      return <ImageIcon src={icon.src} />;
    case "fa":
      return <FaSkillIcon name={icon.name} color={icon.color} />;
  }
}

function SkillChipIcon({ skill }: { skill: Skill }) {
  if (!skill.darkIcon) {
    return <SkillIcon icon={skill.icon} />;
  }

  return (
    <>
      <span className="contents dark:hidden">
        <SkillIcon icon={skill.icon} />
      </span>
      <span className="hidden dark:contents">
        <SkillIcon icon={skill.darkIcon} />
      </span>
    </>
  );
}

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
                <GlossyChip
                  key={`${group.label}-${skill.label}`}
                  icon={<SkillChipIcon skill={skill} />}
                >
                  {skill.label}
                </GlossyChip>
              ))}
            </div>
          </div>
        ))}
      </SectionCard>
    </section>
  );
}
