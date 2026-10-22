import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: ".audit/seo-aeo/browser",
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:4174",
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    screenshot: "on",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
  webServer: {
    command: "node scripts/static-server.mjs dist 4174",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
