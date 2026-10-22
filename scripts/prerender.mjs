import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const template = await readFile("dist/index.html", "utf8");
const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { renderPage, publishedPages } = await server.ssrLoadModule("/src/entry-server.tsx");
  const { site } = await server.ssrLoadModule("/src/data/site.ts");
  for (const page of [...publishedPages, { kind: "not-found", path: "/404/" }]) {
    const { html, metadata } = renderPage(page.path);
    const robots = process.env.VERCEL_ENV === "preview" ? "noindex, nofollow" : metadata.robots;
    const head = [
      `<title>${escapeHtml(metadata.title)}</title>`,
      `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
      `<meta name="robots" content="${robots}" />`,
      `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:image" content="${escapeHtml(metadata.image)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Mark Barbuto, full-stack software developer" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
      `<meta name="twitter:image" content="${escapeHtml(metadata.image)}" />`,
      ...(metadata.canonical ? [`<link rel="canonical" href="${escapeHtml(metadata.canonical)}" />`, `<meta property="og:url" content="${escapeHtml(metadata.canonical)}" />`] : []),
      `<script type="application/ld+json">${JSON.stringify(metadata.structuredData).replace(/</g, "\\u003c")}</script>`,
    ].join("\n    ");
    const destination = page.kind === "not-found" ? resolve("dist/404.html") : resolve("dist", `.${page.path}`, "index.html");
    await mkdir(resolve(destination, ".."), { recursive: true });
    await writeFile(destination, template.replace("<!--page-head-->", head).replace("<!--app-html-->", html));
  }
  const urls = publishedPages.map((page) => `<url><loc>${escapeHtml(new URL(page.path, site.origin).href)}</loc></url>`).join("");
  await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`);
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
  console.log(`Prerendered ${publishedPages.length} published pages and the 404 document.`);
} finally {
  await server.close();
}
