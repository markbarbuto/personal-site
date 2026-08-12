import { AboutSection } from "./components/AboutSection";
import { AssistantModule } from "./components/assistant/AssistantModule";
import { ContactSection } from "./components/ContactSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { FunSection } from "./components/FunSection";
import { Hero } from "./components/Hero";
import { NavBar } from "./components/NavBar";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";

export default function App() {
  return (
    <div className="relative min-h-screen bg-panel pb-20 text-ink transition-colors dark:bg-[#101014] dark:text-[#f5f5f7]">
      <NavBar />
      <main>
        <Hero>
          <AssistantModule />
        </Hero>
        <div className="mx-auto max-w-[820px] px-6">
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <FunSection />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
