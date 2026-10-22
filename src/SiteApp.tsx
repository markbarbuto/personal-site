import App from "./App";
import { NavBar } from "./components/NavBar";
import { ProjectDetail } from "./components/ProjectDetail";
import { ProjectsSection } from "./components/ProjectsSection";
import type { Page } from "./pages";
import { Analytics } from "@vercel/analytics/react";

function PageContent({ page }: { page: Page }) {
  switch (page.kind) {
    case "home": return <App />;
    case "project": return <ProjectDetail mode="page" project={page.project} />;
    case "projects": return (
      <div className="min-h-screen bg-panel pb-20 text-ink dark:bg-[#101014] dark:text-[#f5f5f7]">
        <NavBar homeLinks />
        <main className="mx-auto max-w-[820px] px-6 pt-24">
          <h1 className="text-[38px] font-bold tracking-[-0.03em]">Software development projects</h1>
          <p className="mt-4 text-lg text-muted dark:text-[#b7b7c2]">Case studies of Mark Barbuto’s work in AI, mobile applications, web development, and machine learning.</p>
          <ProjectsSection initialFilter="all" />
        </main>
      </div>
    );
    case "not-found": return (
      <main className="mx-auto max-w-[820px] px-6 py-24 text-ink dark:text-white">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="my-6">The requested page could not be found.</p>
        <a className="text-appleBlue underline" href="/">Return to Mark Barbuto’s portfolio</a>
      </main>
    );
    default: { const exhaustive: never = page; return exhaustive; }
  }
}

export function SiteApp({ page }: { page: Page }) {
  return <><PageContent page={page} /><Analytics /></>;
}
