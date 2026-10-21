import {
  siBlazor,
  siClaude,
  siDocker,
  siGithubactions,
  siHuggingface,
  siJavascript,
  siJest,
  siModelcontextprotocol,
  siMoq,
  siNextdotjs,
  siNodedotjs,
  siOpenai,
  siPostgresql,
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
  docker: siDocker,
  githubactions: siGithubactions,
  huggingface: siHuggingface,
  javascript: siJavascript,
  jest: siJest,
  modelcontextprotocol: siModelcontextprotocol,
  moq: siMoq,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  openai: siOpenai,
  postgresql: siPostgresql,
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
