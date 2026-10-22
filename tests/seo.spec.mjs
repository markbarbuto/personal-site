import { test, expect } from "@playwright/test";

const projectPaths = ["vitae-ai", "path-to-recovery", "indigenous-supports-from-khp", "handwritten-digit-classifier"];

test("homepage has production identity and working discovery resources", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Mark Barbuto", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://markbarbuto.com/");
  for (const path of ["/robots.txt", "/sitemap.xml", "/og-image.png"]) {
    expect((await request.get(path)).status()).toBe(200);
  }
});

test("homepage and every case study are readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Mark Barbuto", exact: true })).toBeVisible();
    await expect(page.locator('a[href="/projects/"]')).not.toHaveCount(0);
    for (const slug of projectPaths) {
      const response = await page.goto(`/projects/${slug}/`);
      expect(response.status()).toBe(200);
      await expect(page.locator("h1")).not.toHaveText("");
      await expect(page.getByRole("heading", { name: "Highlights", exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Built with", exact: true })).toBeVisible();
    }
  } finally {
    await context.close();
  }
});

test("archive links to every direct-load case study", async ({ page }) => {
  await page.goto("/projects/");
  for (const slug of projectPaths) {
    const link = page.locator(`a[href="/projects/${slug}/"]`).first();
    await expect(link).toBeVisible();
  }
  await page.goto("/projects/vitae-ai/");
  await page.reload();
  await expect(page.locator("h1")).toHaveText("Vitae AI");
});

test("saved theme hydrates without errors and can be toggled", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript(() => localStorage.setItem("portfolio-theme", "dark"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  expect(errors.filter((error) => /hydration|Minified React error|didn't match|does not match/i.test(error))).toEqual([]);
});

test("project modal and filters retain their existing behavior", async ({ page }) => {
  await page.goto("/#projects");
  await page.locator('#projects a[href="/projects/vitae-ai/"]').click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: /View all projects/ }).click();
  await expect(page.getByRole("heading", { name: "Handwritten Digit Classifier", exact: true })).toBeVisible();
});

test("project navigation returns to homepage sections", async ({ page }) => {
  await page.goto("/projects/vitae-ai/");
  await page.getByRole("link", { name: "All projects", exact: true }).click();
  const experience = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Experience", exact: true });
  await expect(experience).toHaveAttribute("href", "/#experience");
  await experience.click();
  await expect(page.locator("#experience")).toBeInViewport();
});

test("archive project actions navigate to the actual homepage section", async ({ page }) => {
  await page.goto("/projects/");
  await page.locator('a[href="/projects/vitae-ai/"]').click();
  await page.getByRole("dialog").getByRole("button", { name: "View live" }).click();
  await expect(page).toHaveURL(/\/#me$/);
  await expect(page.getByRole("heading", { name: "Mark Barbuto", exact: true })).toBeVisible();
});

test("unknown routes and missing assets return genuine 404 responses", async ({ request }) => {
  for (const path of ["/projects/not-a-project/", "/not-a-page/", "/missing.png"]) {
    expect((await request.get(path)).status()).toBe(404);
  }
});

test("travel deep links restore after hydration", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/#travel-italy-2025", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("Italy");
  expect(errors).toEqual([]);
});

test("structured data describes the visible person and project", async ({ page }) => {
  await page.goto("/projects/vitae-ai/");
  const data = await page.locator('script[type="application/ld+json"]').first().textContent();
  const graph = JSON.parse(data)["@graph"];
  expect(graph.some((entity) => entity["@type"] === "Person" && entity.name === "Mark Barbuto")).toBeTruthy();
  expect(graph.some((entity) => entity["@type"] === "CreativeWork" && entity.name === "Vitae AI")).toBeTruthy();
  await expect(page.locator("h1")).toHaveText("Vitae AI");
});

test("demo assistant answers use the published work history", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Ask the assistant" }).fill("Tell me about your experience");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.locator('[aria-live="polite"]')).toContainText("BALANCED+");
  await expect(page.locator('[aria-live="polite"]')).not.toContainText("Northwind");
});

test("case study image focus opens and closes", async ({ page }) => {
  await page.goto("/projects/handwritten-digit-classifier/");
  const imageButton = page.getByRole("button", { name: /(?:Open|View|Enlarge).*image/i }).first();
  await expect(imageButton).toBeVisible();
  await imageButton.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
