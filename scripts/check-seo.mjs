// Asserts the SEO/AEO essentials on a production build. Run after `npm run build`:
//   npm run check:seo            (checks ./dist)
//   node scripts/check-seo.mjs <dir>
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = "https://markbarbuto.com/";
const dist = process.argv[2] ?? "dist";
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(file) {
  const path = join(dist, file);
  return existsSync(path) ? readFileSync(path, "utf8") : null;
}

function attr(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

const meta = (html, key) =>
  attr(html, new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]+content="([^"]*)"`, "i"));

function visibleText(html) {
  return html
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const html = read("index.html");
if (!html) {
  console.error(`check-seo: ${join(dist, "index.html")} not found. Run \`npm run build\` first.`);
  process.exit(1);
}

// Head metadata
const title = attr(html, /<title>([^<]*)<\/title>/i);
const description = meta(html, "description");
check(title && title.length >= 20 && title.length <= 60, `<title> should be 20-60 characters, got ${JSON.stringify(title)}`);
check(
  description && description.length >= 70 && description.length <= 160,
  `meta description should be 70-160 characters, got ${description?.length ?? "none"}`,
);
check(/<html[^>]+lang="en"/i.test(html), '<html> is missing lang="en"');
check(attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i) === siteUrl, `canonical must be ${siteUrl}`);
check(meta(html, "og:url") === siteUrl, `og:url must be ${siteUrl}`);
check(!/noindex/i.test(meta(html, "robots") ?? ""), "meta robots must not contain noindex");
for (const key of ["og:title", "og:description", "og:image", "twitter:card", "twitter:image"]) {
  check(meta(html, key), `missing <meta> ${key}`);
}
const ogImage = meta(html, "og:image");
if (ogImage?.startsWith(siteUrl)) {
  check(existsSync(join(dist, ogImage.slice(siteUrl.length))), `og:image file ${ogImage} is not in the build`);
}

// Prerendered body: crawlers that don't run JavaScript only see this.
const rootHtml = html.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/i)?.[1] ?? "";
const text = visibleText(rootHtml);
const wordCount = text.split(" ").filter(Boolean).length;
check(wordCount >= 200, `#root has ${wordCount} words of prerendered text; expected at least 200 (is prerendering broken?)`);
check((rootHtml.match(/<h1[\s>]/gi) ?? []).length === 1, "prerendered page should have exactly one <h1>");
check((rootHtml.match(/<h2[\s>]/gi) ?? []).length >= 4, "prerendered page should have at least 4 <h2> section headings");
const imagesWithoutAlt = (rootHtml.match(/<img(?![^>]*\balt=)[^>]*>/gi) ?? []).length;
check(imagesWithoutAlt === 0, `${imagesWithoutAlt} <img> tags have no alt attribute`);

// Structured data
const jsonLdSource = attr(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
let graph = [];
try {
  graph = JSON.parse(jsonLdSource ?? "")["@graph"] ?? [];
} catch {
  failures.push("JSON-LD is missing or is not valid JSON");
}
const person = graph.find((node) => node["@type"] === "Person");
check(person, "JSON-LD has no Person node");
check(graph.some((node) => node["@type"] === "ProfilePage"), "JSON-LD has no ProfilePage node");
if (person) {
  check(person.url === siteUrl, `Person.url must be ${siteUrl}`);
  check(person.sameAs?.length > 0, "Person.sameAs should list LinkedIn/GitHub");
  for (const fact of [person.name, person.jobTitle, person.worksFor?.name]) {
    check(fact && text.includes(fact), `JSON-LD says ${JSON.stringify(fact)}, but the visible page doesn't`);
  }
}
const ids = new Set(graph.map((node) => node["@id"]).filter(Boolean));
for (const ref of JSON.stringify(graph).matchAll(/\{"@id":"([^"]+)"\}/g)) {
  check(ids.has(ref[1]), `JSON-LD references ${ref[1]}, which no node defines`);
}

// Crawl files
const robots = read("robots.txt");
check(robots, "robots.txt is missing");
check(robots?.includes(`Sitemap: ${siteUrl}sitemap.xml`), "robots.txt should point to the sitemap");
check(!/^Disallow:\s*\/\s*$/m.test(robots ?? ""), "robots.txt blocks the whole site");
check(read("sitemap.xml")?.includes(`<loc>${siteUrl}</loc>`), `sitemap.xml should list ${siteUrl}`);
for (const file of ["llms.txt", "llms-full.txt"]) {
  check(read(file)?.startsWith("# "), `${file} is missing or doesn't start with a "# " heading`);
}

if (failures.length > 0) {
  console.error(`check-seo: ${failures.length} problem(s) in ${dist}:\n${failures.map((f) => `  ✗ ${f}`).join("\n")}`);
  process.exit(1);
}
console.log(`check-seo: all checks passed (${wordCount} prerendered words, ${graph.length} JSON-LD nodes).`);
