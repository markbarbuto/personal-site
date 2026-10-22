import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { createServer } from "vite";
import sharp from "sharp";

const loader = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const { publishedPages, metadataForPage } = await loader.ssrLoadModule("/src/pages.ts");
  const titles = new Set();
  const paths = new Set();
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  for (const page of publishedPages) {
    assert(!paths.has(page.path), `Duplicate page path ${page.path}`);
    paths.add(page.path);
    const html = await readFile(resolve("dist", `.${page.path}`, "index.html"), "utf8");
    const metadata = metadataForPage(page);
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${page.path} needs one canonical`);
    assert(html.includes(`href="${metadata.canonical}"`), `${page.path} needs its own production canonical`);
    assert(!html.includes("markbarbuto.github.io"), `${page.path} contains the old identity`);
    assert(!html.includes('<div id="root"></div>'), `${page.path} has no initial content`);
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${page.path} needs one main heading`);
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert(title && !titles.has(title), `${page.path} needs a unique title`);
    titles.add(title);
    assert(/name="description"\s+content="[^"]+"/.test(html), `${page.path} needs a description`);
    assert(html.includes('name="twitter:image"'), `${page.path} needs a Twitter preview`);
    assert(sitemap.includes(`<loc>${metadata.canonical}</loc>`), `${page.path} is missing from sitemap`);
    const structured = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    assert(structured.length, `${page.path} needs structured data`);
    for (const [, json] of structured) {
      const data = JSON.parse(json);
      assert.equal(data["@context"], "https://schema.org");
      assert(data["@graph"].some((entity) => entity["@type"] === "Person" && entity.name === "Mark Barbuto"));
    }
    if (page.kind === "project") {
      assert(html.includes(page.project.name), `${page.path} lacks its name`);
      assert(html.includes("Highlights") && html.includes("Built with"), `${page.path} lacks its case study`);
    }
    const isPreview = process.env.VERCEL_ENV === "preview";
    assert.equal(/name="robots"\s+content="noindex/.test(html), isPreview, `${page.path} indexing policy disagrees with build environment`);
    for (const [, source] of html.matchAll(/(?:src|href)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const file = resolve("dist", `.${source}`, source.endsWith("/") ? "index.html" : "");
      assert((await stat(file)).isFile(), `${page.path} references missing resource ${source}`);
    }
  }
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, publishedPages.length, "Sitemap must match published pages");
  const robots = await readFile("dist/robots.txt", "utf8");
  assert(robots.includes("Sitemap: https://markbarbuto.com/sitemap.xml"));
  assert(!/Disallow:\s*\/\s*$/m.test(robots), "Public content must remain crawlable");
  const notFound = await readFile("dist/404.html", "utf8");
  assert(notFound.includes("noindex"), "404 must be excluded from indexing");
  assert(!notFound.includes('rel="canonical"'), "404 must not canonicalize to a fake page");
  const image = await sharp("dist/og-image.png").metadata();
  assert.equal(image.width, 1200);
  assert.equal(image.height, 630);
  console.log(`SEO checks passed for ${publishedPages.length} pages, sitemap, robots, 404, structured data, and social image.`);
} finally {
  await loader.close();
}
