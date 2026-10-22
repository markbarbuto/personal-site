import { projects } from "./data/projects";
import { profile, socialLinks } from "./data/profile";
import { site } from "./data/site";
import type { Project } from "./types/content";

export type Page =
  | { kind: "home"; path: "/" }
  | { kind: "projects"; path: "/projects/" }
  | { kind: "project"; path: string; project: Project }
  | { kind: "not-found"; path: string };

export type PublishedPage = Exclude<Page, { kind: "not-found" }>;

export const publishedPages: PublishedPage[] = [
  { kind: "home", path: "/" },
  { kind: "projects", path: "/projects/" },
  ...projects.map((project): PublishedPage => ({ kind: "project", path: `/projects/${project.slug}/`, project })),
];

export function resolvePage(pathname: string): Page {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return publishedPages.find((page) => page.path === path) ?? { kind: "not-found", path: pathname };
}

export function metadataForPage(page: Page) {
  const title = page.kind === "home" ? site.title
    : page.kind === "projects" ? "Software Development Projects | Mark Barbuto"
    : page.kind === "project" ? `${page.project.name} | Mark Barbuto`
    : "Page Not Found | Mark Barbuto";
  const description = page.kind === "home" ? site.description
    : page.kind === "projects" ? "Explore Mark Barbuto’s software projects, including self-hosted AI, mobile applications, web development, and machine learning."
    : page.kind === "project" ? page.project.description
    : "This page could not be found. Explore Mark Barbuto’s portfolio and software development projects.";
  const canonical = page.kind === "not-found" ? null : new URL(page.path, site.origin).href;
  const personId = `${site.origin}/#person`;
  const websiteId = `${site.origin}/#website`;
  const graph: object[] = [
    { "@type": "Person", "@id": personId, name: profile.name, url: `${site.origin}/`, jobTitle: profile.title, sameAs: socialLinks.filter((link) => link.href.startsWith("https://")).map((link) => link.href) },
    { "@type": "WebSite", "@id": websiteId, url: `${site.origin}/`, name: "Mark Barbuto", publisher: { "@id": personId } },
  ];
  if (page.kind === "project") {
    graph.push({ "@type": "CreativeWork", "@id": `${canonical}#project`, name: page.project.name, description, url: canonical, author: { "@id": personId }, keywords: page.project.tags.join(", ") });
  }
  return { title, description, canonical, image: new URL(site.image, site.origin).href, robots: page.kind === "not-found" ? "noindex, follow" : "index, follow", structuredData: { "@context": "https://schema.org", "@graph": graph } };
}
