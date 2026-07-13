import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    name: "ResuMe LLM",
    kind: "Self-Hosted AI",
    description:
      "A privately-hosted LLM that answers questions about my career from my resume — the engine behind the chat at the top of this page. No third-party APIs, fully self-hosted.",
    gradient: "#ff8a5c, #ffd166",
    tint: "#ff8a5c",
    tags: ["ai", "rag", "selfhosted"],
    year: "2025",
    role: "Designer & Engineer",
    content:
      "ResuMe LLM is a self-hosted assistant that lets visitors ask about my work in plain language instead of scrolling. It runs an open-weights model behind a retrieval layer over my resume, so every answer is grounded in real content — with no data leaving my own infrastructure.",
    highlights: [
      "Fully self-hosted open-weights model — no third-party APIs",
      "Retrieval-augmented generation over a curated resume corpus",
      "Streaming responses with graceful canned fallbacks",
      "Runs on a single GPU with a lightweight vector store",
    ],
    stack: ["Python", "Ollama", "FastAPI", "pgvector"],
    links: {
      live: { href: "#" },
      source: { href: "#" },
    },
  },
  {
    name: "Path to Recovery",
    kind: "Mobile App",
    description:
      "A physiotherapy-adjacent mobile app for self-triage, guided assessments, and recovery routines for physical pain and discomfort.",
    gradient: "#050505, #3a3a3c",
    tint: "#0071e3",
    images: {
      card: {
        src: "/project-assets/path-to-recovery-icon.png",
        alt: "Path to Recovery app icon",
      },
      detailHeader: {
        src: "/project-assets/path-to-recovery-wordmark.png",
        alt: "Path to Recovery header image",
      },
    },
    tags: ["mobile", "react-native", "typescript", "supabase", "expo", "github-actions", "ai"],
    year: "2026",
    role: "Software Engineer, Designer, Co-owner",
    content: [
      {
        type: "paragraph",
        text: "Path to Recovery is a mobile app for self-triage, guided assessments, and recovery routines for physical pain and discomfort. It helps users move from an initial concern to a clearer next step, whether that is a scheduled self-guided routine or guidance to seek professional care.",
      },
      {
        type: "paragraph",
        text: "The project came from personal and peer conversations about the barriers that can make physiotherapy hard to access, including cost, anxiety, uncertainty, and delays in getting practical guidance for common injuries. The clinical datasets within the app are curated by registered physiotherapists and massage therapists, with an emphasis on translating what they actually do with patients into a clear app experience.",
      },
      {
        type: "gallery",
        images: [
          {
            src: "/project-assets/path-to-recovery-icon.png",
            alt: "Path to Recovery app icon",
          },
          {
            src: "/project-assets/path-to-recovery-wordmark.png",
            alt: "Path to Recovery wordmark",
          },
        ],
      },
      {
        type: "paragraph",
        text: "I was the sole developer on the app and worked with subject matter experts to turn assessment flows, recovery logic, and exercise guidance into concrete product behavior. The app is built with Expo Router and a Supabase backend, including support for Google authentication, email workflows, notifications, and typed service layers.",
      },
      {
        type: "paragraph",
        text: "A major lesson from the project was learning how to use AI-assisted development tools effectively without losing ownership of the implementation. I used tools and workflows such as Codex, Claude Design, Skills, subagents, and MCP to accelerate parts of the build, while still guiding the architecture, business logic, and code decisions.",
      },
    ],
    highlights: [
      "Personalized onboarding and guided assessments with branching questions and tailored outcomes",
      "Self-guided recovery routines with active sessions, scheduling, and progress tracking",
      "Clinician-informed injury and recovery exercise datasets developed with registered PTs and RMTs",
      "Supabase backend with authentication, row-level security, RPCs, and typed service layers",
      "Support for cross-platform, dark mode, and internationalization",
    ],
    stack: [
      "Expo",
      "React Native",
      "TypeScript",
      "Expo Router",
      "Supabase",
      "React Query",
      "Jotai",
      "Uniwind",
      "i18n",
    ],
    links: {
      source: { private: true },
      comingSoon: true,
    },
  },
  {
    name: "Indigenous Supports from KHP",
    kind: "Mobile App",
    description:
      "A wellness app built for Kids Help Phone that provides offline-first access to wellness resources for Indigenous youth in rural regions across Canada.",
    gradient: "#172a72, #f9893d",
    tint: "#172a72",
    images: {
      card: {
        src: "/project-assets/indigenous-supports-khp.png",
        alt: "Indigenous Supports from Kids Help Phone app icon",
      },
    },
    tags: ["mobile", "kidshelpphone", "react-native", "typescript", ".net", "sql", "azure", "cloud"],
    year: "2026",
    role: "Full-Stack Developer",
    content:
      "Built in partnership with Kids Help Phone, this platform surfaces culturally-relevant mental health and community supports for Indigenous youth. The focus was on trust, accessibility, and meeting people where they are with content that reflects their communities.",
    highlights: [
      "Offline-first access to wellness resources for Indigenous youth in rural regions across Canada",
      "Custom-built content management system built on .NET 8 and SQL Server, hosted in Azure cloud",
      "Accessible, mobile-first experience (WCAG 2.0 compliant)",
      "Secure, encrypted data storage with no PII collected or stored",
      "Localized content across multiple indigenous languages using i18n",
      "Built in partnership with Kids Help Phone",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Expo Router",
      "Redux",
      "i18n",
      "WatermelonDB",
      "Nativewind",
      "Gluestack-ui",
      "Azure",
      ".NET 8",
      "SQL Server",
    ],
    links: {
      live: { href: "#" },
      source: { href: "#" },
    },
  },
  {
    name: "Nimbus",
    kind: "Cloud Platform",
    description:
      "A serverless deployment platform that spins up preview environments per pull request in seconds. Built on AWS Lambda + edge functions.",
    gradient: "#1c7d5b, #37d9a0",
    tint: "#1c7d5b",
    tags: ["aws", "serverless", "node"],
    year: "2022",
    role: "Founding Engineer",
    content:
      "Nimbus gives every pull request its own live URL. It watches your repo, builds an isolated environment, and tears it down when the PR merges — so reviewers test the real thing instead of reading diffs. It quietly became critical infrastructure for the team.",
    highlights: [
      "Per-PR preview environments in under 20 seconds",
      "Edge-cached routing across 12 global regions",
      "Cut staging costs ~60% with scale-to-zero",
      "Handled 400k+ ephemeral deploys in its first year",
    ],
    stack: ["Node.js", "AWS Lambda", "Terraform", "PostgreSQL"],
    links: {
      live: { href: "#" },
      source: { href: "#" },
    },
  },
  {
    name: "Trailmix",
    kind: "Mobile App",
    description:
      "A cross-platform hiking companion with offline maps and crowd-sourced trail conditions. 20k+ downloads across iOS and Android.",
    gradient: "#6b4fbb, #b58bff",
    tint: "#6b4fbb",
    tags: ["reactnative", "mobile", "maps"],
    year: "2021",
    role: "Mobile Lead",
    content:
      "Trailmix is for the moment the signal drops. It packs offline vector maps, GPS breadcrumb tracking, and community-reported trail conditions into a single app that works deep in the backcountry. The hardest part was making maps feel instant without a network.",
    highlights: [
      "Offline vector maps with on-device routing",
      "Crowd-sourced conditions sync when back in range",
      "20k+ downloads and a 4.8-star average rating",
      "Battery-aware tracking built for all-day hikes",
    ],
    stack: ["React Native", "Mapbox", "SQLite", "Expo"],
    links: {
      live: { href: "#" },
      source: { href: "#" },
    },
  },
  {
    name: "Palette",
    kind: "AI Tool",
    description:
      "A generative color-system tool that turns a single brand image into a full accessible palette, powered by a fine-tuned vision model.",
    gradient: "#e10098, #ff8ac6",
    tint: "#e10098",
    tags: ["ai", "design", "python"],
    year: "2023",
    role: "Creator",
    content:
      "Drop in a photo or logo and Palette returns a complete, WCAG-checked color system — primaries, neutrals, semantic states, the works. It pairs a fine-tuned vision model with a constraint solver so every generated pair actually passes contrast.",
    highlights: [
      "One image in, a full accessible design-token set out",
      "Every color pair is contrast-checked to WCAG AA/AAA",
      "Exports to CSS, Tailwind, and Figma variables",
      "Fine-tuned vision model runs on a single GPU",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "React"],
    links: {
      live: { href: "#" },
      source: { href: "#" },
    },
  },
];
