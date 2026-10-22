import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { serveStatic } from "./static-server.mjs";
import assert from "node:assert/strict";

const directories = process.argv.slice(2);
if (!directories.length) throw new Error("Pass one or more build directories to measure.");
const builds = await Promise.all(directories.map(async (directory) => ({ directory, ...await serveStatic(directory) })));
let browser;
const results = [];
try {
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
  for (let iteration = 0; iteration < 5; iteration++) {
    for (const build of builds) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true });
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      await session.send("Network.enable");
      await session.send("Network.setCacheDisabled", { cacheDisabled: true });
      await session.send("Network.emulateNetworkConditions", { offline: false, latency: 40, downloadThroughput: 1_600_000, uploadThroughput: 750_000 });
      await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await page.addInitScript(() => {
        window.__metrics = { lcp: 0, cls: 0 };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) window.__metrics.lcp = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      const response = await page.goto(build.url, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, `${build.directory} did not serve a successful homepage`);
      assert.equal(await page.locator("h1").first().textContent(), "Mark Barbuto", `${build.directory} did not render the expected homepage`);
      await page.screenshot();
      await page.waitForTimeout(1500);
      const metrics = await page.evaluate(() => ({
        ...window.__metrics,
        images: performance.getEntriesByType("resource").filter((entry) => entry.initiatorType === "img").reduce((total, entry) => total + entry.encodedBodySize, 0),
        javascript: performance.getEntriesByType("resource").filter((entry) => entry.name.endsWith(".js")).reduce((total, entry) => total + entry.encodedBodySize, 0),
      }));
      assert(metrics.lcp > 0, `${build.directory} produced no LCP measurement`);
      results.push({ directory: build.directory, iteration, ...metrics });
      if (!iteration) {
        await mkdir(".audit/seo-aeo/performance", { recursive: true });
        await page.screenshot({ path: `.audit/seo-aeo/performance/${builds.indexOf(build)}-mobile.png` });
      }
      await context.close();
    }
  }
  const median = (values) => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
  const summary = builds.map(({ directory }) => ({ directory, ...Object.fromEntries(["lcp", "cls", "images", "javascript"].map((key) => [key, median(results.filter((row) => row.directory === directory).map((row) => row[key]))])) }));
  const report = { environment: { browser: browser.version(), viewport: "390x844", cpuRate: 4, latencyMs: 40, downloadBytesPerSecond: 1_600_000, cache: "disabled", samples: 5 }, results, summary };
  await mkdir(".audit/seo-aeo/performance", { recursive: true });
  await writeFile(".audit/seo-aeo/performance/results.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser?.close();
  await Promise.all(builds.map(({ server }) => new Promise((done) => server.close(done))));
}
