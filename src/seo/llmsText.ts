import { experience } from "../data/experience";
import { funItems } from "../data/fun";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import type { Project } from "../types/content";
import { profileLinks } from "./structuredData";

// llms.txt (https://llmstxt.org) gives answer engines a plain-text version of the site, built from the same
// data modules as the page so the two cannot drift.

function header() {
  return [
    `# ${profile.name}`,
    "",
    `> ${profile.name} is a full-stack ${profile.title.toLowerCase()} with over 4 years of professional experience building web, mobile, and cloud applications with ${profile.coreStack.join(", ")}. Currently ${experience[0].role} at ${experience[0].company}.`,
    "",
    profile.educationSummary,
    "",
    `- Website: ${profile.siteUrl}/`,
    `- Email: ${profile.email}`,
    ...profileLinks.map((href) => `- ${new URL(href).hostname.replace(/^www\./, "")}: ${href}`),
  ];
}

function experienceSection() {
  return [
    "## Experience",
    "",
    ...experience.map((job) => `- **${job.role}, ${job.company}** (${job.dates}): ${job.description}`),
  ];
}

function skillsSection() {
  return [
    "## Skills",
    "",
    ...skillGroups.map((group) => `- ${group.label}: ${group.skills.map((skill) => skill.label).join(", ")}`),
  ];
}

function projectContentText(project: Project) {
  if (typeof project.content === "string") return [project.content];
  return project.content.flatMap((block) => {
    if (block.type === "paragraph") return [block.text];
    if (block.type === "link") return [`[${block.label}](${block.href})`];
    if (block.type === "code") return ["```" + (block.language ?? ""), block.code, "```"];
    return [];
  });
}

function projectLinks(project: Project) {
  const { live, source, comingSoon } = project.links;
  return [
    live?.href.startsWith("http") && `- ${live.label ?? "Live"}: ${live.href}`,
    source && ("href" in source ? `- Source: ${source.href}` : "- Source: private"),
    comingSoon && "- Status: coming soon",
  ].filter(Boolean) as string[];
}

function funSection() {
  return [
    "## Outside of work",
    "",
    ...funItems.map((item) => `- **${item.title}**: ${item.preview}`),
  ];
}

export function buildLlmsTxt() {
  return [
    ...header(),
    "",
    ...experienceSection(),
    "",
    "## Projects",
    "",
    ...projects.map((project) => `- **${project.name}** (${project.kind}, ${project.year}): ${project.description}`),
    "",
    ...skillsSection(),
    "",
    "## Optional",
    "",
    `- [Full profile with project write-ups](${profile.siteUrl}/llms-full.txt)`,
    "",
  ].join("\n");
}

export function buildLlmsFullTxt() {
  return [
    ...header(),
    "",
    "## About",
    "",
    profile.aboutSummary,
    "",
    ...experienceSection(),
    "",
    ...skillsSection(),
    "",
    "## Projects",
    ...projects.flatMap((project) => [
      "",
      `### ${project.name}`,
      "",
      `${project.kind}, ${project.year}. Role: ${project.role}.`,
      "",
      ...projectContentText(project).flatMap((text) => [text, ""]),
      "Highlights:",
      ...project.highlights.map((highlight) => `- ${highlight}`),
      "",
      `Stack: ${project.stack.join(", ")}`,
      ...projectLinks(project),
    ]),
    "",
    ...funSection(),
    "",
  ].join("\n");
}
