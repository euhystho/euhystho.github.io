import { test, expect } from '@playwright/test';

// Homepage tests
test('homepage loads and shows main heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Hello Everyone');
});

test('homepage has navigation bar', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation')).toBeVisible();
});

test('homepage has footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('contentinfo')).toBeVisible();
});

// About page tests
test('about page loads and shows correct heading', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('about page has profile image', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('img[alt*="Eugene"]')).toBeVisible();
});
