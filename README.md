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

This project is configured for GitHub Pages at:

```text
https://markbarbuto.github.io/
```

Vite uses `base: "/"` in `vite.config.ts`.

The GitHub Actions workflow at `.github/workflows/deploy.yml` builds `dist` and deploys it with official GitHub Pages actions. In the GitHub repository settings, configure Pages to deploy from GitHub Actions.
