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

The chat area is named the Assistant module in code because the user-facing feature is an assistant, even though the future implementation will be backed by a self-hosted open-weights LLM.

Current files:

- `src/components/assistant/AssistantModule.tsx` - chat UI and state
- `src/components/assistant/PromptChips.tsx` - suggested prompts
- `src/services/assistantClient.ts` - demo response service and future integration boundary
- `src/types/assistant.ts` - request/response/message types

For now, the assistant returns local canned demo responses. No network call is made in this iteration.

## Future Lightweight RAG Assistant

Recommended future architecture:

- Keep this frontend as a static GitHub Pages site.
- Host a small Assistant API on an Oracle Cloud VM.
- Use a lightweight self-hosted RAG setup instead of a heavy always-on model stack.
- Start with a small quantized open-weights instruct model through Ollama or `llama.cpp` server.
- Keep the source corpus small: resume, project notes, interests, and a short bio.
- Use retrieval so each request sends only relevant snippets to the model.
- Start with Markdown/JSON documents plus a small vector index such as FAISS, Chroma, or SQLite-backed embeddings.
- If Oracle free-tier resources are tight, use retrieval plus template answers first and add generation only where it improves the experience.
- Keep the model server private on the VM. Expose only the Assistant API.
- Put HTTPS in front of the API with Caddy or Nginx.
- Add strict CORS for the portfolio domain, rate limiting, request size limits, and conservative logging.

The frontend should eventually call:

```ts
fetch(`${import.meta.env.VITE_ASSISTANT_API_URL}/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message, history }),
});
```

Do not put secret keys or private credentials in Vite environment variables. Any `VITE_*` variable is bundled into public frontend code.

## Deployment

The site is live on Vercel at:

```text
https://markbarbuto.com/
```

`index.html` declares `https://markbarbuto.com/` as the canonical URL, so the copy that `.github/workflows/deploy.yml` publishes to GitHub Pages is not indexed separately.

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
