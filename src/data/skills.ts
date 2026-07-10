import type { SkillGroup } from "../types/content";

const sqlServerIcon = "/skill-icons/sql-server.svg";
const azurePipelinesIcon = "/skill-icons/azure-pipelines.png";
const postgresqlIcon = "/skill-icons/postgresql-elephant.png";
const supabaseIcon = "/skill-icons/supabase-logo-icon.svg";
const xunitIcon = "/skill-icons/xunit.png";
const moqIcon = "/skill-icons/moq.png";
const fluentAssertionsIcon = "/skill-icons/fluentassertions.png";
const codexIcon = "/skill-icons/codex-logo.png";

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { label: "C#", icon: { type: "devicon", name: "csharp" } },
      { label: "JavaScript", icon: { type: "brand", name: "javascript" } },
      { label: "TypeScript", icon: { type: "brand", name: "typescript" } },
      { label: "Python", icon: { type: "brand", name: "python" } },
      { label: "HTML", icon: { type: "brand", name: "html5" } },
      { label: "CSS", icon: { type: "brand", name: "css" } },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { label: "React", icon: { type: "brand", name: "react" } },
      { label: "Next.js", icon: { type: "brand", name: "nextdotjs" } },
      { label: "Tailwind", icon: { type: "brand", name: "tailwindcss" } },
      { label: "Redux", icon: { type: "brand", name: "redux" } },
      { label: "Blazor", icon: { type: "brand", name: "blazor" } },
    ],
  },
  {
    label: "Backend",
    skills: [
      { label: ".NET", icon: { type: "brand", name: "dotnet" } },
      { label: "Node.js", icon: { type: "brand", name: "nodedotjs" } },
      { label: "Azure", icon: { type: "devicon", name: "azure" } },
      { label: "Supabase", icon: { type: "image", src: supabaseIcon } },
      { label: "AWS", icon: { type: "devicon", name: "amazonwebservices" } },
    ],
  },
  {
    label: "Databases",
    skills: [
      { label: "SQL Server", icon: { type: "image", src: sqlServerIcon } },
      { label: "PostgreSQL", icon: { type: "image", src: postgresqlIcon } },
      { label: "SQLite", icon: { type: "brand", name: "sqlite" } },
      { label: "Redis", icon: { type: "brand", name: "redis" } },
    ],
  },
  {
    label: "CI/CD",
    skills: [
      { label: "Docker", icon: { type: "brand", name: "docker" } },
      { label: "Azure Pipelines", icon: { type: "image", src: azurePipelinesIcon } },
      { label: "GitHub Actions", icon: { type: "brand", name: "githubactions" } },
      { label: "Azure DevOps", icon: { type: "devicon", name: "azuredevops" } },
    ],
  },
  {
    label: "Testing",
    skills: [
      { label: "Xunit", icon: { type: "image", src: xunitIcon } },
      { label: "Moq", icon: { type: "image", src: moqIcon } },
      { label: "FluentAssertions", icon: { type: "image", src: fluentAssertionsIcon } },
      { label: "Jest", icon: { type: "brand", name: "jest" } },
      { label: "Playwright", icon: { type: "devicon", name: "playwright" } },
    ],
  },
  {
    label: "AI Tools",
    skills: [
      { label: "Claude", icon: { type: "brand", name: "claude" } },
      { label: "Codex", icon: { type: "image", src: codexIcon } },
      { label: "ChatGPT", icon: { type: "brand", name: "openai", color: "#000000" } },
      { label: "NotebookLM", icon: { type: "brand", name: "notebooklm" } },
      { label: "Hugging Face", icon: { type: "brand", name: "huggingface" } },
      { label: "LangChain", icon: { type: "brand", name: "langchain" } },
      { label: "MCP", icon: { type: "brand", name: "modelcontextprotocol" } },
      { label: "Agents", icon: { type: "fa", name: "robot", color: "#ff8a5c" } },
      { label: "Skills", icon: { type: "fa", name: "sparkle", color: "#7c5cff" } },
    ],
  },
];
