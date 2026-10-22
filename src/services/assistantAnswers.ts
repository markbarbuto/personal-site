import { experience } from "../data/experience";
import { funItems } from "../data/fun";
import { profile, socialLinks } from "../data/profile";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";

const topics = [
  {
    matches: /\b(experience|career|companies|employers)\b|\b(work|job) history\b|\bwhere (?:have you|has mark) worked\b/i,
    answer: () => experience.map((item) =>
      `${item.role} at ${item.company} (${item.dates}). ${item.description}`,
    ).join("\n\n"),
  },
  {
    matches: /\b(projects?|portfolio)\b|\bwhat (?:have you|has mark) (?:built|made|shipped)\b/i,
    answer: () => projects.map((project) =>
      `${project.name}. ${project.description}`,
    ).join("\n\n"),
  },
  {
    matches: /\b(skills?|tech stack|technologies|programming languages|frameworks|tools)\b/i,
    answer: () => skillGroups.map((group) =>
      `${group.label}: ${group.skills.map((skill) => skill.label).join(", ")}.`,
    ).join("\n\n"),
  },
  {
    matches: /\b(fun|hobb(?:y|ies)|interests|outside (?:of )?(?:work|coding)|free time|weekends?)\b/i,
    answer: () => funItems.map((item) => `${item.title}. ${item.preview}`).join("\n\n"),
  },
  {
    matches: /\b(contact|email|reach|hire|hiring|opportunities|open to work)\b/i,
    answer: () => `${profile.contactIntro}\n\nEmail: ${profile.email}\n${socialLinks
      .filter((link) => link.label !== "Email")
      .map((link) => `${link.label}: ${link.href}`)
      .join("\n")}`,
  },
  {
    matches: /\b(education|university|degree|graduate[ds]?)\b/i,
    answer: () => profile.educationSummary,
  },
  {
    matches: /^(?:who (?:are you|is mark(?: barbuto)?)|(?:tell me )?about (?:you|yourself|mark(?: barbuto)?)|introduce yourself)[?!.\s]*$/i,
    answer: () => `${profile.name}, ${profile.title}. ${profile.aboutSummary}\n\n${profile.educationSummary}`,
  },
];

export function answerDemoQuestion(question: string): string {
  const text = question.trim().toLowerCase();
  const project = projects.find((item) => text.includes(item.name.toLowerCase()));
  if (project) {
    return `From the published portfolio.\n\n${project.name}. ${project.description}\n\nRole: ${project.role}. Stack: ${project.stack.join(", ")}.\n\n${project.highlights.join("\n")}`;
  }

  const employer = experience.find((item) => text.includes(item.company.toLowerCase()));
  if (employer) {
    return `From the published portfolio.\n\n${employer.role} at ${employer.company} (${employer.dates}). ${employer.description}`;
  }

  const interest = funItems.find((item) => text.includes(item.title.toLowerCase()));
  if (interest) {
    return `From the published portfolio.\n\n${interest.title}. ${interest.preview}`;
  }

  const topic = topics.find((item) => item.matches.test(text));
  if (topic) {
    return `From the published portfolio.\n\n${topic.answer()}`;
  }

  return "This demo does not have a supported answer to that question. It uses only the published portfolio and cannot verify additional details or follow-up context. Ask about Mark's experience, projects, tech stack, education, interests, or contact details.";
}
