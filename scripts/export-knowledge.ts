// Exports the site's typed content as Markdown for the Vitae assistant's knowledge base.
// Output is deterministic: same data in, byte-identical files out.
// Usage: npm run export-knowledge -- --out ../vitae/knowledge/site

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { formatTravelDateRange } from "../src/components/fun/travelDate";
import { experience } from "../src/data/experience";
import { funItems } from "../src/data/fun";
import { profile, socialLinks } from "../src/data/profile";
import { projects } from "../src/data/projects";
import { skillGroups } from "../src/data/skills";
import type { Project } from "../src/types/content";
import type { FunItem } from "../src/types/fun";

type Doc = { file: string; source: string; title: string; sections: string[] };

const section = (heading: string, ...lines: Array<string | false | undefined>) =>
  [`## ${heading}`, ...lines.filter((line): line is string => Boolean(line))].join("\n\n");

const list = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");

function profileDoc(): Doc {
  const links = socialLinks
    .filter((link) => link.href.startsWith("http"))
    .map((link) => `${link.label}: ${link.href}`);
  return {
    file: "profile.md",
    source: "src/data/profile.ts",
    title: "Profile",
    sections: [
      section(
        "About me",
        `I'm ${profile.name}, a ${profile.title}.`,
        profile.aboutSummary,
        `${profile.aboutIntro} ${profile.coreStack.join(", ")}.`,
        `${profile.mobileExperience} ${profile.mobileStack.join(", ")}.`,
      ),
      section("Education", profile.educationSummary),
      section("Contact", profile.contactIntro, list([`Email: ${profile.email}`, ...links, `Website: ${profile.siteUrl}`])),
    ],
  };
}

function experienceDoc(): Doc {
  return {
    file: "experience.md",
    source: "src/data/experience.ts",
    title: "Experience",
    sections: experience.map((job) => section(`${job.role} at ${job.company} (${job.dates})`, job.description)),
  };
}

function projectBody(project: Project): string[] {
  if (typeof project.content === "string") return [project.content];
  return project.content.flatMap((block) => {
    if (block.type === "paragraph") return [block.text];
    if (block.type === "link") return [`${block.label}: ${block.href}`];
    return [];
  });
}

function projectLinks(project: Project): string[] {
  const { live, source, comingSoon } = project.links;
  const links: string[] = [];
  if (live?.href.startsWith("http")) links.push(`${live.label ?? "Live"}: ${live.href}`);
  if (source && "private" in source) links.push("Source code: private");
  else if (source) links.push(`Source code: ${source.href}`);
  if (comingSoon) links.push("Status: coming soon");
  return links;
}

function projectsDoc(): Doc {
  return {
    file: "projects.md",
    source: "src/data/projects.ts",
    title: "Projects",
    sections: projects.map((project) =>
      section(
        `${project.name} (${project.year})`,
        `${project.kind}. My role: ${project.role}.`,
        project.description,
        ...projectBody(project),
        project.highlights.length > 0 && `Highlights:\n${list(project.highlights)}`,
        project.stack.length > 0 && `Stack: ${project.stack.join(", ")}.`,
        projectLinks(project).length > 0 && list(projectLinks(project)),
      ),
    ),
  };
}

function skillsDoc(): Doc {
  return {
    file: "skills.md",
    source: "src/data/skills.ts",
    title: "Skills",
    sections: skillGroups.map((group) =>
      section(group.label, `${group.skills.map((skill) => skill.label).join(", ")}.`),
    ),
  };
}

function interestSections(item: FunItem): string[] {
  const heading = "tagline" in item && item.tagline ? `${item.title}: ${item.tagline}` : item.title;
  const feature = item.feature;
  if (feature?.type === "905-gunners") {
    return [
      section(
        heading,
        item.preview,
        ...feature.cards.map((card) => {
          const chips = card.chips.map((chip) => (chip.value ? `${chip.label}: ${chip.value}` : chip.label));
          return `### ${card.title}\n\n${card.body}${chips.length > 0 ? `\n\n${list(chips)}` : ""}`;
        }),
        ...feature.sections.map((part) => `### ${part.title}\n\n${part.body}`),
      ),
    ];
  }
  if (feature?.type === "travel") {
    return [
      section(heading, item.preview, feature.intro),
      ...feature.trips.map((trip) =>
        section(
          `Travel: ${trip.title} (${formatTravelDateRange(trip.dateRange)})`,
          `Places: ${[...trip.cities, ...trip.destinations.map((place) => place.country)]
            .filter((place, index, all) => all.indexOf(place) === index)
            .join(", ")}.`,
          trip.summary,
        ),
      ),
    ];
  }
  return [section(heading, item.preview)];
}

function interestsDoc(): Doc {
  return {
    file: "interests.md",
    source: "src/data/fun/",
    title: "Interests",
    sections: funItems.flatMap(interestSections),
  };
}

function render(doc: Doc): string {
  const frontmatter = ["---", `source: portfolio/${doc.source}`, "visibility: public", "generated: true", "---"];
  return `${[...frontmatter, "", `# ${doc.title}`, "", doc.sections.join("\n\n")].join("\n")}\n`;
}

function outDir(argv: string[]): string {
  const index = argv.indexOf("--out");
  if (index === -1 || !argv[index + 1]) throw new Error("Usage: export-knowledge --out <dir>");
  return resolve(argv[index + 1]);
}

const dir = outDir(process.argv);
mkdirSync(dir, { recursive: true });
for (const doc of [profileDoc(), experienceDoc(), projectsDoc(), skillsDoc(), interestsDoc()]) {
  writeFileSync(join(dir, doc.file), render(doc), "utf8");
  console.log(`wrote ${join(dir, doc.file)}`);
}
