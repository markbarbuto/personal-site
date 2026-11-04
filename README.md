# Portfolio

A Vite + React + TypeScript personal portfolio converted from the reference HTML.

## Local Development

```bash
npm install
npm run dev
```

Build and preview the production output:

```bash
npm run build
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Content Editing

Portfolio content is stored in typed data modules:

- `src/data/profile.ts` - name, initials, title, email, social links, about copy, nav
- `src/data/experience.ts` - work history
- `src/data/skills.ts` - skill groups and icons
- `src/data/projects.ts` - project cards and detail pages
- `src/data/fun.ts` - fun cards and expandable detail copy
- `src/data/prompts.ts` - suggested assistant prompts

The components in `src/components` are mostly presentational. This keeps placeholder content easy to replace without editing JSX.

## Assistant Module

The chat area streams answers from Vitae, Mark's self-hosted assistant backend. The browser never talks to the backend directly. It posts to the Vercel Function `api/chat.ts`, which validates the request, adds the edge secret and the visitor's IP, and pipes the backend's server-sent events back unbuffered.

Files:

- `api/chat.ts` - Vercel Function that proxies `POST /api/chat` to `${VITAE_BACKEND_URL}/chat`
- `src/components/assistant/AssistantModule.tsx` - chat UI and state
- `src/components/assistant/PromptChips.tsx` - suggested prompts
- `src/services/assistantClient.ts` - streaming client and server-sent event parser
- `src/types/assistant.ts` - request, message, and stream event types

The function needs two server-side environment variables, set in Vercel and never prefixed with `VITE_`:

- `VITAE_BACKEND_URL` - base URL of the backend
- `VITAE_EDGE_SECRET` - shared secret the backend checks in the `X-Edge-Secret` header

When either is missing or the backend is unreachable, the function returns 502 and the chat shows an offline message with Mark's email.

## Deployment

The site is live on Vercel at:

```text
https://markbarbuto.com/
```

## SEO and answer engines

`npm run build` prerenders the page so crawlers that don't run JavaScript (including AI answer engines) read the full content. After the client and SSR builds, `scripts/prerender.mjs`:

- renders `src/entry-server.tsx` into `dist/index.html`, which the client then hydrates
- injects a schema.org JSON-LD graph (`src/seo/structuredData.ts`): `Person`, `ProfilePage`, `WebSite`, and one node per project
- writes `robots.txt`, `sitemap.xml`, `llms.txt`, and `llms-full.txt` (`src/seo/llmsText.ts`)

All of these are generated from the `src/data` modules, so editing content there updates them too. Components must render without touching `window` during render, since the prerender step runs in Node.

### Checks

`.github/workflows/seo.yml` runs on every pull request and push to `main`:

- `npm run check:seo` (`scripts/check-seo.mjs`) asserts the essentials on `dist`: canonical URL, title and description, prerendered content and headings, image alt text, valid JSON-LD that matches the visible page, and the crawl files.
- Lighthouse CI (`lighthouserc.json`) runs three times and fails on SEO below 100, accessibility or best practices below 90, performance below 75, layout shift above 0.1, or page weight above about 700 KB. Reports are attached to the run as the `lighthouse-reports` artifact.

Run both locally before pushing:

```bash
npm run build
npm run check:seo
npx @lhci/cli@0.14.0 autorun
```
