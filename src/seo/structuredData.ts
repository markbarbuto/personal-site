import { experience } from "../data/experience";
import { profile, socialLinks } from "../data/profile";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import type { Project } from "../types/content";

const siteUrl = `${profile.siteUrl}/`;
const personId = `${siteUrl}#person`;
const websiteId = `${siteUrl}#website`;

export const profileLinks = socialLinks.filter((link) => link.href.startsWith("http")).map((link) => link.href);

export function projectSlug(project: Project) {
  return project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function projectNode(project: Project) {
  const source = project.links.source && "href" in project.links.source ? project.links.source.href : undefined;
  const live = project.links.live?.href.startsWith("http") ? project.links.live.href : undefined;
  const isMobileApp = project.kind === "Mobile App";

  return {
    "@type": isMobileApp ? "MobileApplication" : source ? "SoftwareSourceCode" : "CreativeWork",
    "@id": `${siteUrl}#project-${projectSlug(project)}`,
    name: project.name,
    description: project.description,
    genre: project.kind,
    dateCreated: project.year,
    keywords: project.tags.join(", "),
    creator: { "@id": personId },
    ...(project.images?.card && { image: new URL(project.images.card.src, siteUrl).href }),
    ...(isMobileApp && { applicationCategory: "HealthApplication", operatingSystem: "iOS, Android" }),
    ...(isMobileApp && live && { installUrl: live }),
    ...(source && (isMobileApp ? { url: source } : { codeRepository: source })),
    ...(!isMobileApp && live && { url: live }),
  };
}

export function buildStructuredData(dateModified: string) {
  const [currentJob] = experience;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: profile.name,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}#profile`,
        url: siteUrl,
        name: `${profile.name} | ${profile.title}`,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        dateModified,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: siteUrl,
        image: new URL(profile.avatarUrl, siteUrl).href,
        jobTitle: profile.title,
        description: profile.aboutSummary,
        email: `mailto:${profile.email}`,
        sameAs: profileLinks,
        worksFor: { "@type": "Organization", name: currentJob.company },
        alumniOf: { "@type": "CollegeOrUniversity", name: "University of Toronto" },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Honours Bachelor of Science in Computer Science",
          recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Toronto" },
        },
        knowsAbout: skillGroups.flatMap((group) => group.skills.map((skill) => skill.label)),
        award: ["Award of Excellence (BALANCED+)", "People Driven Award (Celestica)"],
      },
      ...projects.map(projectNode),
    ],
  };
}
