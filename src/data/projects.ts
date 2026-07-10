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
    overview:
      "ResuMe LLM is a self-hosted assistant that lets visitors ask about my work in plain language instead of scrolling. It runs an open-weights model behind a retrieval layer over my resume, so every answer is grounded in real content — with no data leaving my own infrastructure.",
    highlights: [
      "Fully self-hosted open-weights model — no third-party APIs",
      "Retrieval-augmented generation over a curated resume corpus",
      "Streaming responses with graceful canned fallbacks",
      "Runs on a single GPU with a lightweight vector store",
    ],
    stack: ["Python", "Ollama", "FastAPI", "pgvector"],
    links: { live: "#", source: "#" },
  },
  {
    name: "Path to Recovery",
    kind: "Web App",
    description:
      "A guided platform that helps people navigate recovery with personalized plans, check-ins, and connections to local support resources.",
    gradient: "#0071e3, #00c6ff",
    tint: "#0071e3",
    tags: ["react", "health", "typescript"],
    year: "2024",
    role: "Full-Stack Developer",
    overview:
      "Path to Recovery is a web platform designed to make the recovery journey less overwhelming. It combines personalized care plans, daily check-ins, and a searchable directory of local support services so people always know their next step.",
    highlights: [
      "Personalized recovery plans with milestone tracking",
      "Daily check-ins with progress visualizations",
      "Searchable directory of local support resources",
      "Private and secure by design",
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    links: { live: "#", source: "#" },
  },
  {
    name: "Indigenous Supports from KHP",
    kind: "Community Platform",
    description:
      "A culturally-grounded resource hub connecting Indigenous youth with mental health and community supports from Kids Help Phone.",
    gradient: "#a06bff, #ff6ec7",
    tint: "#a06bff",
    tags: ["react", "accessibility", "community"],
    year: "2023",
    role: "Frontend Developer",
    overview:
      "Built in partnership with Kids Help Phone, this platform surfaces culturally-relevant mental health and community supports for Indigenous youth. The focus was on trust, accessibility, and meeting people where they are with content that reflects their communities.",
    highlights: [
      "Culturally-grounded resource directory",
      "Accessible, mobile-first experience (WCAG AA)",
      "Localized content across multiple communities",
      "Built in close partnership with Kids Help Phone",
    ],
    stack: ["React", "TypeScript", "Next.js", "Contentful"],
    links: { live: "#", source: "#" },
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
    overview:
      "Nimbus gives every pull request its own live URL. It watches your repo, builds an isolated environment, and tears it down when the PR merges — so reviewers test the real thing instead of reading diffs. It quietly became critical infrastructure for the team.",
    highlights: [
      "Per-PR preview environments in under 20 seconds",
      "Edge-cached routing across 12 global regions",
      "Cut staging costs ~60% with scale-to-zero",
      "Handled 400k+ ephemeral deploys in its first year",
    ],
    stack: ["Node.js", "AWS Lambda", "Terraform", "PostgreSQL"],
    links: { live: "#", source: "#" },
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
    overview:
      "Trailmix is for the moment the signal drops. It packs offline vector maps, GPS breadcrumb tracking, and community-reported trail conditions into a single app that works deep in the backcountry. The hardest part was making maps feel instant without a network.",
    highlights: [
      "Offline vector maps with on-device routing",
      "Crowd-sourced conditions sync when back in range",
      "20k+ downloads and a 4.8-star average rating",
      "Battery-aware tracking built for all-day hikes",
    ],
    stack: ["React Native", "Mapbox", "SQLite", "Expo"],
    links: { live: "#", source: "#" },
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
    overview:
      "Drop in a photo or logo and Palette returns a complete, WCAG-checked color system — primaries, neutrals, semantic states, the works. It pairs a fine-tuned vision model with a constraint solver so every generated pair actually passes contrast.",
    highlights: [
      "One image in, a full accessible design-token set out",
      "Every color pair is contrast-checked to WCAG AA/AAA",
      "Exports to CSS, Tailwind, and Figma variables",
      "Fine-tuned vision model runs on a single GPU",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "React"],
    links: { live: "#", source: "#" },
  },
];
