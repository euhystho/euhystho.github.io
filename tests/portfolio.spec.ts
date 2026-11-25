import { test, expect } from "@playwright/test";
import axe from "axe-core";

// Test responsive design
test.describe("Responsive Design", () => {
  test("portfolio displays correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Test mobile navigation
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("portfolio displays correctly on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    // Test layout adjustments
    await expect(page.getByRole("main")).toBeVisible();
  });
});

// Test accessibility
test.describe("Accessibility", () => {
  test("has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("messy");
    await expect(h1).toHaveCount(1);

    const headings = await page
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((headings) =>
        headings.map((heading) => ({
          level: Number(heading.tagName.slice(1)),
          text: heading.textContent?.trim(),
        })),
      );
    for (let index = 1; index < headings.length; index += 1) {
      expect(
        headings[index].level,
        `${headings[index].text} follows ${headings[index - 1].text}`,
      ).toBeLessThanOrEqual(headings[index - 1].level + 1);
    }
  });

  test.describe("SEO and page structure", () => {
    for (const route of ["/", "/about", "/projects"]) {
      test(`${route} has a title, canonical URL, and one page heading`, async ({
        page,
      }) => {
        await page.goto(route);

        await expect(page).toHaveTitle(/\S+/);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          /^https:\/\/eugenehysthompson\.com\//,
        );
        await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);

        const headings = await page
          .locator("h1, h2, h3, h4, h5, h6")
          .evaluateAll((headings) =>
            headings.map((heading) => ({
              level: Number(heading.tagName.slice(1)),
              text: heading.textContent?.trim(),
            })),
          );
        for (let index = 1; index < headings.length; index += 1) {
          expect(
            headings[index].level,
            `${headings[index].text} follows ${headings[index - 1].text}`,
          ).toBeLessThanOrEqual(headings[index - 1].level + 1);
        }
      });
    }
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");

    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute("alt", /.+/);
    }
  });

  test("navigation is keyboard accessible", async ({ page }) => {
    await page.goto("/");

    const projectLink = page.getByRole("link", {
      name: "projects",
      exact: true,
    });
    await projectLink.focus();
    await expect(projectLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/projects/);

    await page.goto("/");
    await page.setViewportSize({ width: 375, height: 667 });
    const menuToggle = page.getByRole("checkbox", {
      name: "Toggle navigation menu",
    });
    await menuToggle.focus();
    await expect(menuToggle).toBeFocused();
    await page.keyboard.press("Space");
    await expect(menuToggle).toBeChecked();
  });
});

test.describe("Axe accessibility audit", () => {
  for (const colorScheme of ["light", "dark"] as const) {
    for (const route of [
      "/",
      "/about",
      "/projects",
      "/missing-page-for-test",
    ]) {
      test(`axe audit passes on ${route} in ${colorScheme} mode`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme });
        await page.goto(route);
        await page.addScriptTag({ content: axe.source });

        const violations = await page.evaluate(async () => {
          const axeApi = (
            window as unknown as Window & {
              axe: {
                run: (
                  context: Document,
                  options: {
                    runOnly: { type: "tag"; values: string[] };
                  },
                ) => Promise<{
                  violations: {
                    id: string;
                    help: string;
                    nodes: {
                      target: string[];
                      failureSummary?: string;
                    }[];
                  }[];
                }>;
              };
            }
          ).axe;

          const results = await axeApi.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
            },
          });

          return results.violations.map(({ id, help, nodes }) => ({
            id,
            help,
            nodes: nodes.map(({ target, failureSummary }) => ({
              target,
              failureSummary,
            })),
          }));
        });

        expect(violations).toEqual([]);
      });
    }
  }
});

test.describe("404 page interactions", () => {
  test("uses the supplied artwork and removes the curtain after its reveal", async ({
    page,
  }) => {
    await page.goto("/missing-page-for-test");

    await expect(page.locator("#curtain-overlay")).toHaveAttribute(
      "data",
      "/svg/error_curtains.svg",
    );
    await expect(page.locator(".pet-bunny")).toHaveAttribute(
      "src",
      "/svg/mayhem_the_bunny.svg",
    );
    await expect(page.locator("#curtain-overlay")).toBeVisible();
    await expect(page.locator("#curtain-overlay")).toHaveCount(0, {
      timeout: 2_000,
    });
  });

  test("respects reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/missing-page-for-test");

    await expect(page.locator(".curtain-overlay")).toBeHidden();
    await expect(page.locator(".pet-bunny")).toBeHidden();
    await expect(page.locator(".static-bunny")).toBeVisible();
  });

  test("offers music choices and supports petting Mayhem", async ({ page }) => {
    await page.goto("/missing-page-for-test");

    await page.getByRole("button", { name: "Mayhem", exact: true }).click();
    const musicDialog = page.getByRole("dialog", { name: "Listen to MAYHEM" });
    await expect(musicDialog).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() =>
          Array.from(document.fonts).some(
            (font) =>
              font.family.includes("New Rocker") && font.status === "loaded",
          ),
        ),
      )
      .toBe(true);
    await expect(
      musicDialog.getByRole("link", { name: "Apple Music" }),
    ).toHaveAttribute("href", /music\.apple\.com/);
    await expect(
      musicDialog.getByRole("link", { name: "Spotify" }),
    ).toHaveAttribute("href", /open\.spotify\.com/);
    await page.keyboard.press("Escape");
    await expect(musicDialog).not.toBeVisible();

    await page.getByRole("button", { name: "Pet Mayhem the Bunny" }).click();
    await expect(page.getByRole("status")).toContainText(
      "Mayhem enjoyed that!",
    );
  });
});

// Test performance
test.describe("Performance", () => {
  test("page loads within reasonable time", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    const loadTime = Date.now() - startTime;

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });
});

// Test project pages
test.describe("Project Pages", () => {
  test("project links work correctly", async ({ page }) => {
    await page.goto("/");

    const menuToggle = page.getByRole("checkbox", {
      name: "Toggle navigation menu",
    });
    if (await menuToggle.isVisible()) {
      await menuToggle.focus();
      await page.keyboard.press("Space");
    }

    // Test navigation to projects
    const projectLink = page.getByRole("link", {
      name: "projects",
      exact: true,
    });
    if (await projectLink.isVisible()) {
      await projectLink.click();
      await expect(page).toHaveURL(/.*projects.*/);
    }
  });
});
