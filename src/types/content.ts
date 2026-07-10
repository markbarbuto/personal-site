export type SocialLink = {
  label: "LinkedIn" | "GitHub" | "Email";
  href: string;
};

export type Experience = {
  role: string;
  company: string;
  dates: string;
  description: string;
};

export type SkillIcon =
  | { type: "brand"; name: string; color?: string }
  | { type: "devicon"; name: string }
  | { type: "image"; src: string }
  | { type: "fa"; name: string; color: string };

export type Skill = {
  label: string;
  icon: SkillIcon;
};

export type SkillGroup = {
  label: string;
  skills: Skill[];
};

export type Project = {
  name: string;
  kind: string;
  description: string;
  gradient: string;
  tint: string;
  tags: string[];
  year: string;
  role: string;
  overview: string;
  highlights: string[];
  stack: string[];
  links: {
    live: string;
    source: string;
  };
};

export type FunItem = {
  key: string;
  icon: string;
  title: string;
  tagline: string;
  tint: string;
  accent: string;
  detail: string;
  link: {
    label: string;
    url: string;
  } | null;
};
