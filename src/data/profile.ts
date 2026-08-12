import type { SocialLink } from "../types/content";

export const profile = {
  initials: "MB",
  name: "Mark Barbuto",
  title: "Software Developer",
  email: "markbarbuto@outlook.com",
  avatarUrl: "/profile/mark-barbuto-linkedin.jpg",
  aboutSummary:
    "I'm a full-stack software developer with over 4 years of professional experience building scalable applications across web, mobile, and cloud platforms.",
  aboutIntro:
    "I specialize in building applications using:",
  educationSummary:
    "I graduated from University of Toronto with an Honors Bachelor of Science in Computer Science in April 2024, playing Varsity Soccer throughout my undergrad.",
  coreStack: [
    "C#",
    ".NET",
    "Azure",
    "SQL Server",
    "Docker",
    "Entity Framework",
    "React",
  ],
  mobileExperience:
    "I have professional experience building mobile apps with:",
  contactIntro:
    "I'm open to new opportunities and always happy to chat. You can reach me via email or other social media links.",
  copyright: "© 2026 Mark Barbuto",
} as const;

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mark-barbuto-680124204" },
  { label: "GitHub", href: "https://github.com/markbarbuto" },
  { label: "Email", href: "#contact" },
];

export const navItems = [
  { label: "Me", href: "#me" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Fun", href: "#fun" },
  { label: "Contact", href: "#contact" },
] as const;
