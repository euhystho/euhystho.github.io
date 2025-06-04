import { test, expect } from "@playwright/test";

// Homepage tests
test("homepage loads and shows main heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 2 })).toContainText(
    "Turning complex data into intuitive solutions",
  );
});

test("homepage has navigation bar", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation")).toBeVisible();
});

test("homepage has footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

// Theme toggle tests
test("theme toggle switches between light and dark", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /theme|dark|light/i });
  // Get initial theme
  const initialTheme = await page.evaluate(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  await toggle.click();
  const toggledTheme = await page.evaluate(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  expect(toggledTheme).not.toBe(initialTheme);
});

test("theme toggle persists after reload", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /theme|dark|light/i });
  await toggle.click();
  const toggledTheme = await page.evaluate(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  await page.reload();
  const themeAfterReload = await page.evaluate(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  expect(themeAfterReload).toBe(toggledTheme);
});
