import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    name: "Vitae AI",
    kind: "Self-Hosted AI",
    description:
      "A privately-hosted LLM that answers questions about my resume, career, projects, and interests. It's the engine behind the chat at the top of this page.",
    gradient: "#ff8a5c, #ffd166",
    tint: "#ff8a5c",
    tags: ["ai", "rag", "selfhosted", "python", "llama-cpp", "oracle-cloud"],
    year: "2025",
    role: "Designer & Engineer",
    content:
      "Vitae AI is a self-hosted assistant designed to answer questions about my resume, career, projects, and interests in plain language. It uses retrieval-augmented generation to search a curated knowledge base before generating a response, so answers can be grounded in the same documents and context I use to describe my work. The model runtime is built around llama.cpp and is privately hosted in Oracle Cloud, keeping the system lightweight while avoiding reliance on a third-party hosted LLM API.",
    highlights: [
      "Privately hosted assistant with context from my resume, career history, projects, and interests",
      "Retrieval-augmented generation over a curated personal knowledge base",
      "Lightweight llama.cpp model runtime hosted in Oracle Cloud",
      "Designed for future integration with the portfolio chat assistant",
    ],
    stack: ["Python", "llama.cpp", "FastAPI", "RAG", "Oracle Cloud"],
    links: {
      live: { href: "#me" },
      source: { href: "https://github.com/markbarbuto/vitae-ai" },
      comingSoon: true,
    },
  },
  {
    name: "Path to Recovery",
    kind: "Mobile App",
    description:
      "A physiotherapy-adjacent mobile app for self-triage, guided assessments, and recovery routines for physical pain and discomfort.",
    gradient: "#050505, #3a3a3c",
    tint: "#4b5563",
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
      "An offline-first app built for Kids Help Phone providing offline-first access to wellness resources for Indigenous youth in rural regions across Canada.",
		gradient: "#172a72, #f9893d",
		tint: "#2f63d8",
		images: {
			card: {
				src: "/project-assets/indigenous-supports-khp.png",
				alt: "Indigenous Supports from Kids Help Phone app icon",
			},
			detailHeader: {
				src: "/project-assets/indigenous-supports-khp/header.png",
				alt: "Indigenous Supports from KHP mobile app screens",
			},
		},
		tags: [
			"mobile",
			"kidshelpphone",
			"react-native",
			"typescript",
			".net",
			"sql",
			"azure",
			"offline-first",
		],
		year: "2026",
		role: "Lead Full-Stack Developer",
		content: [
			{
				type: "paragraph",
				text:
					"Indigenous Supports from KHP is a cross-platform mobile app created with Kids Help Phone for Indigenous youth across Canada. It provides access to over 100 mental health and wellness articles, including selected content in Indigenous languages, alongside direct support options and tools that can be used offline.",
			},
			{
				type: "paragraph",
				text:
					"The app was built — in close collaboration with Kids Help Phone and feedback from Indigenous communities — in response to the limited availability of mental health and wellness resources in rural and remote communities, where internet access may be slow, intermittent, or unavailable. Its offline-first design keeps core content and personal wellness tools available on the device instead of requiring a continuous connection.",
			},
			{
				type: "link",
				href: "https://www.instagram.com/p/DZdDxibEf-N/",
				label: "View the Kids Help Phone launch post on Instagram",
			},
			{
				type: "paragraph",
				text:
					"Its main features include a browsable content library, My Wellness Bundle — a guided safety-plan questionnaire, direct access to Kids Help Phone support — calling, texting, or online messaging, and the Resources Around Me module — nearby and virtual support services across Canada.",
			},
			{
				type: "gallery",
				images: [
					{
						src: "/project-assets/indigenous-supports-khp/content-library-combined.jpg",
						alt: "Home screen and wellness content in the Indigenous Supports from KHP app",
						caption:
							"Wellness resources remain available locally after they have been synchronized.",
					},
					{
						src: "/project-assets/indigenous-supports-khp/support-tools-combined.jpg",
						alt: "My Wellness Bundle and Direct Support screens in the Indigenous Supports from KHP app",
						caption:
							"My Wellness Bundle helps users create a personal wellness and safety plan, while Direct Support connects them with Kids Help Phone.",
					},
				],
			},
			{
				type: "paragraph",
				text:
					"The mobile application was built with React Native, TypeScript, Expo Router and WatermelonDB (built on top of SQLite). When an internet connection is available, its synchronization engine pulls updates from the content management system and applies them to the local database, allowing previously synchronized resources to continue working offline.",
			},
      {
				type: "paragraph",
				text:
					"Since data privacy, anonymonity and accessibility are key considerations for Kids Help Phone, the app adheres to strict data protection standards and privacy regulations, including compliance with PIPEDA, OCAP, WCAG 2.0, and other applicable laws.",
			},
			{
				type: "paragraph",
				text:
					"The supporting backend is a custom headless CMS built with .NET 8 and SQL Server, hosted in Azure using Azure App Services with deployment slots.",
			},
			{
				type: "paragraph",
				text:
					"To make synchronization more efficient and reliable, I implemented an incremental delta-sync process based on change data capture. After the initial download, the client sends the timestamp of its last successful synchronization. The .NET API responds only with records created, updated, or deleted since that time instead of repeatedly transferring the complete dataset. This reduces network usage and synchronization time, which is important especiialy internet connection is unreliable.",
			},
			{
				type: "code",
				language: "json",
				code: `{
  "sync_timestamp": "2026-07-13T04:15:00Z",
  "data": {
    "created": [
      {
        "id": "id1",
        "title": "Article 1",
        "content": "...",
        "updated_at": "2026-07-13T02:10:00Z"
      }
    ],
    "updated": [
      {
        "id": "id2",
        "title": "Article 2",
        "content": "...",
        "updated_at": "2026-07-13T03:45:00Z"
      }
    ],
    "deleted": [ "id3" ]
  }
}`,
			},
		],
		highlights: [
			"Anonymous, offline-first access to over 100 wellness articles, locally available safety plan, and direct support options",
			"Incremental delta sync using created, updated, and deleted change sets",
			"React Native, Expo Router, and Redux Toolkit for cross-platform mobile development",
			"WatermelonDB and SQLite storage with local encryption of sensitive data",
			".NET 8, Azure Functions, and SQL Server backend hosted in Azure",
			"Developed with Kids Help Phone and feedback from Indigenous communities",
		],
		stack: [
			"React Native",
			"TypeScript",
			"Expo",
			"Expo Router",
			"Redux Toolkit",
			"i18next",
			"WatermelonDB",
			"SQLite",
			"NativeWind",
			"Gluestack UI",
			"Azure",
			"Application Insights",
			".NET 8",
			"Entity Framework Core",
			"SQL Server",
			"Azure Devops",
			"Fastlane",
		],
		links: {
			live: {
				href: "https://apps.apple.com/ca/app/indigenous-supports-from-khp/id6760955357",
				label: "View on the App Store",
			},
			source: {
				private: true,
			},
		},
	},
];
