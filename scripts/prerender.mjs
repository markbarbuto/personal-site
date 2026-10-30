// Runs after `vite build` and `vite build --ssr`: writes the rendered page into dist/index.html along with
// the JSON-LD graph, and generates robots.txt, sitemap.xml, llms.txt and llms-full.txt from the same data.
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist`;
const ssrEntry = `${root}dist-ssr/entry-server.js`;

const { render, buildStructuredData, buildLlmsTxt, buildLlmsFullTxt, siteUrl } = await import(
  pathToFileURL(ssrEntry).href
);

const today = new Date().toISOString().slice(0, 10);
// "<" can't appear raw inside a script element, so escape it in the JSON.
const jsonLd = JSON.stringify(buildStructuredData(today)).replace(/</g, "\\u003c");

const template = await readFile(`${dist}/index.html`, "utf8");
const page = template
  .replace("<!--app-html-->", render())
  .replace("<!--structured-data-->", `<script type="application/ld+json">${jsonLd}</script>`);

if (page.includes("<!--app-html-->") || page.includes("<!--structured-data-->")) {
  throw new Error("index.html is missing the prerender placeholders.");
}

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;

await Promise.all([
  writeFile(`${dist}/index.html`, page),
  writeFile(`${dist}/robots.txt`, robots),
  writeFile(`${dist}/sitemap.xml`, sitemap),
  writeFile(`${dist}/llms.txt`, buildLlmsTxt()),
  writeFile(`${dist}/llms-full.txt`, buildLlmsFullTxt()),
]);
await rm(`${root}dist-ssr`, { recursive: true, force: true });

console.log(`Prerendered ${dist}/index.html (${page.length} bytes) and wrote crawl files.`);
