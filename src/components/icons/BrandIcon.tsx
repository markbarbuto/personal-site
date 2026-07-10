import {
  siBlazor,
  siClaude,
  siCss,
  siDocker,
  siDotnet,
  siGithubactions,
  siHtml5,
  siHuggingface,
  siJavascript,
  siJest,
  siLangchain,
  siModelcontextprotocol,
  siMoq,
  siNextdotjs,
  siNodedotjs,
  siNotebooklm,
  siOpenai,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRedux,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

const icons: Record<string, SimpleIcon> = {
  blazor: siBlazor,
  claude: siClaude,
  css: siCss,
  docker: siDocker,
  dotnet: siDotnet,
  githubactions: siGithubactions,
  html5: siHtml5,
  huggingface: siHuggingface,
  javascript: siJavascript,
  jest: siJest,
  langchain: siLangchain,
  modelcontextprotocol: siModelcontextprotocol,
  moq: siMoq,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  notebooklm: siNotebooklm,
  openai: siOpenai,
  postgresql: siPostgresql,
  python: siPython,
  react: siReact,
  redis: siRedis,
  redux: siRedux,
  sqlite: siSqlite,
  supabase: siSupabase,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
};

type BrandIconProps = {
  name: string;
  color?: string;
  className?: string;
};

export function BrandIcon({ name, color, className = "h-[18px] w-[18px]" }: BrandIconProps) {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill={color ?? `#${icon.hex}`}
      role="img"
    >
      <path d={icon.path} />
    </svg>
  );
}
