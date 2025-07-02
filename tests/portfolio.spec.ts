import { test, expect } from "@playwright/test";

// Test responsive design
test.describe("Responsive Design", () => {
  test("portfolio displays correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Test mobile navigation
    await expect(page.getByRole("navigation")).toBeVisible();
    await expect(page.getByText("Home")).toBeVisible();
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
    await expect(h1).toContainText("Home");
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

    // Test tab navigation
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeVisible();
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

    // Test navigation to projects
    const projectLink = page.getByRole("link", { name: /projects/i });
    if (await projectLink.isVisible()) {
      await projectLink.click();
      await expect(page).toHaveURL(/.*projects.*/);
    }
  });
});

// Test contact functionality
test.describe("Contact", () => {
  test("contact information is accessible", async ({ page }) => {
    await page.goto("/");

    // Test social links
    const githubLink = page.getByRole("link", { name: /github/i });
    const emailLink = page.getByRole("link", { name: /email/i });

    if (await githubLink.isVisible()) {
      await expect(githubLink).toHaveAttribute("href", /github\.com/);
    }

    if (await emailLink.isVisible()) {
      await expect(emailLink).toHaveAttribute("href", /mailto:/);
    }
  });
});
