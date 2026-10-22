# Portfolio

Mark Barbuto's portfolio at [markbarbuto.com](https://markbarbuto.com), built with React, TypeScript, and Vite and hosted on Vercel.

## Develop locally

```sh
npm ci
npm run dev
```

Build the static pages and preview the production output.

```sh
npm run build
npm run preview
```

The build renders the homepage, project archive, and each case study into HTML before deployment. React hydrates those pages to enable filters, project dialogs, galleries, theme controls, travel details, and the assistant. Direct project links work without JavaScript.

## Edit content

- `src/data/site.ts` owns the production origin and default metadata.
- `src/data/profile.ts` owns the biography and contact links.
- `src/data/experience.ts` owns professional history.
- `src/data/skills.ts` owns skill groups.
- `src/data/projects.ts` owns project slugs, descriptions, content, and links.
- `src/data/fun/` owns interests and travel content.
- `src/pages.ts` derives published routes, metadata, and structured data.

Keep project slugs stable when renaming titles. Adding a project automatically adds its page and sitemap entry. Existing project and travel authoring skills remain under `.agents/skills/`.

## Verify changes

```sh
npm run lint
npm run build
npm run check:seo
npm run test:assistant
npx playwright install chromium
npm run test:browser
```

The SEO check validates generated content, canonicals, links, metadata, structured data, discovery files, and the social image. Browser tests run against static output on desktop and mobile, including JavaScript-disabled pages and hydration behavior. Browser artifacts stay under `.audit/seo-aeo/`.

Set `PLAYWRIGHT_CHANNEL=chrome` to use an installed Chrome browser instead of Playwright's bundled Chromium when required by the local environment.

## Update images

Keep original image assets as source files. Regenerate optimized variants and the social preview when source images change.

```sh
npm run images:optimize
npm run images:social
```

`scripts/optimize-images.mjs` records the chosen image widths. Components reference the generated WebP files. The social image is a 1200 by 630 PNG generated from vector text and the existing portrait.

## Configure the assistant

Set `VITE_ASSISTANT_API_URL` to use an external API. The frontend sends a POST request to its `/chat` endpoint. When the URL is absent, the demo answers from the same public profile, experience, project, skill, and interest data used by the site. Unsupported demo questions receive an explicit unknown-answer response.

The external API and its retrieval corpus are separate from this repository. Review its answers against the published facts before describing it as an active integration. Keep model services private behind the API and use HTTPS, appropriate CORS, request limits, and rate limits.

Vite variables are bundled into public browser code. Never put credentials in `VITE_*` variables.

## Deploy to Vercel

`vercel.json` sets `npm run build` and the `dist` output directory. Published pages use trailing slashes. The deployment contains real documents and `404.html`; it does not rewrite unknown URLs to the homepage.

All canonical URLs use `https://markbarbuto.com/`. Preview builds with `VERCEL_ENV=preview` include noindex metadata. Vercel also normally supplies preview noindex headers. Confirm actual deployment headers and hostname redirects after release.

The GitHub workflow verifies builds and generated content. Production deployment remains controlled by the Vercel project. See [SEO and AEO operations](docs/seo-aeo.md) for release checks and account tasks.
