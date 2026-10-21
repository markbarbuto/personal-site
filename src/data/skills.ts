import type { SkillGroup } from "../types/content";

const sqlServerIcon = "/skill-icons/sql-server.svg";
const azurePipelinesIcon = "/skill-icons/azure-pipelines.svg";
const postgresqlIcon = "/skill-icons/postgresql-elephant.png";
const supabaseIcon = "/skill-icons/supabase-logo-icon.svg";
const xunitIcon = "/skill-icons/xunit.png";
const moqIcon = "/skill-icons/moq.svg";
const fluentAssertionsIcon = "/skill-icons/fluentassertions.png";
const codexIcon = "/skill-icons/codex-logo.png";
const llamaCppIcon = "/skill-icons/llama-cpp.svg";
const dotnetIcon = "/skill-icons/dotnet.png";
const awsDarkIcon = "/skill-icons/aws-dark.svg";
const mcpDarkIcon = "/skill-icons/mcp-dark.svg";
const htmlIcon = "/skill-icons/html5.svg";
const cssIcon = "/skill-icons/css.svg";

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { label: "C#", icon: { type: "devicon", name: "csharp" } },
      { label: "JavaScript", icon: { type: "brand", name: "javascript" } },
      { label: "TypeScript", icon: { type: "brand", name: "typescript" } },
      { label: "Python", icon: { type: "devicon", name: "python" } },
      { label: "HTML", icon: { type: "image", src: htmlIcon } },
      { label: "CSS", icon: { type: "image", src: cssIcon } },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { label: "React", icon: { type: "brand", name: "react" } },
      { label: "Tailwind", icon: { type: "brand", name: "tailwindcss" } },
      { label: "Redux", icon: { type: "brand", name: "redux" } },
      { label: "Blazor", icon: { type: "brand", name: "blazor" } },
    ],
  },
  {
    label: "Backend",
    skills: [
      { label: ".NET", icon: { type: "image", src: dotnetIcon } },
      { label: "Node.js", icon: { type: "brand", name: "nodedotjs" } },
      { label: "Azure", icon: { type: "devicon", name: "azure" } },
      { label: "Supabase", icon: { type: "image", src: supabaseIcon } },
      {
        label: "AWS",
        icon: { type: "devicon", name: "amazonwebservices" },
        darkIcon: { type: "image", src: awsDarkIcon },
      },
    ],
  },
  {
    label: "Databases",
    skills: [
      { label: "SQL Server", icon: { type: "image", src: sqlServerIcon } },
      { label: "PostgreSQL", icon: { type: "image", src: postgresqlIcon } },
      {
        label: "SQLite",
        icon: { type: "brand", name: "sqlite" },
        darkIcon: { type: "brand", name: "sqlite", color: "#0F80CC" },
      },
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
      { label: "Claude Code", icon: { type: "brand", name: "claude" } },
      { label: "Codex", icon: { type: "image", src: codexIcon } },
      {
        label: "ChatGPT",
        icon: { type: "brand", name: "openai", color: "#000000" },
        darkIcon: { type: "brand", name: "openai", color: "#FFFFFF" },
      },
      { label: "Hugging Face", icon: { type: "brand", name: "huggingface" } },
      { label: "llama.cpp", icon: { type: "image", src: llamaCppIcon } },
      {
        label: "MCP",
        icon: { type: "brand", name: "modelcontextprotocol" },
        darkIcon: { type: "image", src: mcpDarkIcon },
      },
      { label: "Agents", icon: { type: "fa", name: "robot", color: "#ff8a5c" } },
      { label: "Skills", icon: { type: "fa", name: "sparkle", color: "#7c5cff" } },
    ],
  },
];
