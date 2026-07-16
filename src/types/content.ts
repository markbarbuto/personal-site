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

export type ProjectContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "gallery";
      images: Array<{
        src: string;
        alt: string;
        caption?: string;
      }>;
    }
  | {
      type: "link";
      href: string;
      label: string;
    }
  | {
      type: "code";
      code: string;
      language?: string;
    };

export type ProjectContent = string | ProjectContentBlock[];

export type ProjectLinks = {
  live?: {
    href: string;
    label?: string;
  };
  source?:
    | {
        href: string;
        label?: string;
      }
    | {
        private: true;
      };
  comingSoon?: boolean;
};

export type Project = {
  name: string;
  kind: string;
  description: string;
  gradient: string;
  tint: string;
  images?: {
    card?: {
      src: string;
      alt: string;
    };
    detailHeader?: {
      src: string;
      alt: string;
    };
  };
  tags: string[];
  year: string;
  role: string;
  content: ProjectContent;
  highlights: string[];
  stack: string[];
  links: ProjectLinks;
};

export type FocusImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export type FunFeature = {
  teamCardDetail: string;
  valuesCardDetail: string;
  tournamentCardDetail: string;
  summary: string;
  charityDetail: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  anchorImage: FocusImage;
  detailHeaderImage: FocusImage;
  teamImages: FocusImage[];
  tournamentImages: FocusImage[];
};

export type FunItem = {
  key: string;
  icon?: string;
  decoration?: FocusImage;
  title: string;
  tagline: string;
  tint: string;
  accent: string;
  detail: string;
  link: {
    label: string;
    url: string;
  } | null;
  feature?: FunFeature;
};
