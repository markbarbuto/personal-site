---
name: add-project
description: Add a new project to this portfolio's projects section from supplied project information and assets, including its logo. Derive logo-based branding, populate header links, and generate Highlights, Built with, and Tags using the existing data and layout.
---

# Add a project

Implement a new item in this repository's `#projects` section from the user's project information and assets. Follow the existing card and project detail layout.

## Inputs

Expect the project name, purpose, features, the user's contribution, technologies, year, logo, and any screenshots, header artwork, or relevant URLs. Use information from the conversation and supplied documents or repository when available. Ask only for essential missing facts or assets, especially the logo needed to derive branding. Do not invent features, outcomes, metrics, technologies, roles, dates, URLs, or release status. Generate editorial copy and design choices from supported facts without requiring the user to author every field.

## Read the current implementation

Resolve these paths from the repository root and treat current code as authoritative:

- `src/data/projects.ts`: `projects: Project[]` and existing project entries. Vitae AI demonstrates oxblood branding; Path to Recovery and Indigenous Supports demonstrate structured content and link states.
- `src/types/content.ts`: `Project`, `ProjectLinks`, and `ProjectContentBlock` schemas.
- `src/components/ProjectsSection.tsx`: project cards, ordering, initial three-item limit, tag filtering, and detail opening.
- `src/components/ProjectDetail.tsx`: header artwork and actions, content blocks, Highlights, Built with, Tags, and image overlays.
- `src/components/Chips.tsx`, `src/components/BlueAction.tsx`, and `src/index.css`: shared chips, actions, and project tint styles.
- `public/project-assets/`: existing logo, banner, and screenshot conventions.

## Prepare assets and branding

Inspect the supplied logo and imagery before choosing colours, crops, or alt text. Store assets under `public/project-assets/<project-slug>/` with descriptive lowercase hyphenated names; reference them as `/project-assets/<project-slug>/<filename>`. Use browser-supported formats, preserve logo proportions and transparency, and avoid overwriting other projects' files.

Derive a restrained palette from the logo's recognisable brand colours, excluding incidental whitespace or transparent backgrounds. Sample colours with available local tooling when helpful; visually verify the choice. Create darker or lighter tonal variants rather than unrelated hues. A monochrome logo can use a neutral palette unless supplied brand guidance establishes another accent. Follow explicit brand guidance when provided.

Set `gradient` to comma-separated CSS colour stops, not a complete `linear-gradient(...)`, and `tint` to a CSS colour. Vitae AI uses `gradient: "#5a1414, #7a1f1f"` and `tint: "#9b1c1c"`; use this as an example of a cohesive family, not a default palette. The current card CSS mixes tint at 10% with white in light mode and 18% with `#19191f` in dark mode. Verify the resulting card remains legible and recognisably branded in both themes; retain shared action and chip styling.

Populate `images.card` with a suitable logo/icon asset and `images.detailHeader` with supplied header artwork when available. The current card image uses `object-cover` at 140px square on desktop; the header uses `object-cover` at 3:1. Prepare padded, correctly proportioned compositions from existing assets when needed so the logo or wordmark is not clipped. Use available local image or vector tooling for simple composition; preserve the supplied logo rather than redesigning it. If no header image is suitable, omit `detailHeader` to use the existing branded gradient fallback. Add accurate alt text for every image.

## Build the project entry

Add one `Project` object to `projects` in `src/data/projects.ts`. Populate `name`, `kind`, `description`, `gradient`, `tint`, `images`, `tags`, `year`, `role`, `content`, `highlights`, `stack`, and `links` according to the current type. Keep names unique because cards use them as React keys. Honour requested ordering; otherwise preserve existing relative order and place the new project where it fits the current editorial order. Array order determines which three projects are initially visible.

- Write a concise card `description` and a fuller `content` overview covering purpose, useful behaviour, and the user's contribution. Match the site's plain, personal tone. Prefer `ProjectContentBlock[]` even for paragraph-only content: the legacy string renderer adds placeholder gallery panels. Include screenshots or galleries where they support the story; use only real supplied assets, and use code blocks only when relevant.
- Generate `highlights` as a short set of distinct, concrete capabilities, engineering decisions, or supported outcomes. Match the density of existing entries; avoid repeating the overview or claiming unsupported impact.
- Generate `stack` for the **Built with** section using supported languages, frameworks, services, and tools with their proper display names. Deduplicate entries and select the technologies that materially explain the build.
- Generate `tags` as a focused set of lowercase discovery labels without a leading `#`, using existing spellings where relevant (for example `ai`, `react-native`, `typescript`). Tags feed both card chips and the global filter; combine useful domain and technology labels without turning the stack into an exhaustive tag list.

## Put links in the header

Use `project.links` for primary project actions so `ProjectDetail` renders them beside or below the title using its existing responsive layout:

- `live: { href, label? }` for a deployed site, demo, or app store listing. Use a descriptive label such as `View on the App Store` when the default `View live` would be misleading. Same-page destinations use existing hash navigation only when appropriate.
- `source: { href, label? }` for a supplied public repository, or `{ private: true }` only when confirmed private. The private state currently renders no source action; do not fabricate a public URL.
- `comingSoon: true` only when supported by the supplied status, not merely because no live URL was provided.

Omit unavailable actions. The current schema supports one live and one source action; never add unrecognised fields expecting them to render. If the user supplies multiple primary destinations that genuinely belong in the header, make a minimal, backwards-compatible extension to `ProjectLinks` and the shared header action renderer, preserving current action styles and responsive behaviour. Supporting references can use content link blocks. Avoid duplicating the primary header actions in the body.

Adding the data should create the card, detail view, metadata sections, and filters automatically. Reuse existing components and preserve typography, spacing, rounded corners, shadows, focus behaviour, overlays, and light/dark styles. Avoid project-specific layout branches when the data model already supports the content.

## Verify and deliver

- Check facts against the supplied material, unique project names, valid colour values, supported link states, deduplicated stack/tags/highlights, and real asset paths with matching filename case.
- Run existing build and lint scripts (`npm.cmd run build` and `npm.cmd run lint` on Windows). Distinguish pre-existing failures from new issues.
- When browser preview is available, inspect `#projects` on desktop and mobile in both themes. Check card tint and logo crops, title/action wrapping, header artwork, working header links, Highlights/Built with/Tags, tag filtering, View all visibility, keyboard card opening, closing, and image overlays. Report any visual checks that could not be performed.
- Summarize the new project, chosen palette and its relationship to the logo, assets, links, and validation. Implement the local site change; commit, push, or deploy only when requested.
