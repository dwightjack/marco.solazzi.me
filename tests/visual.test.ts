import percySnapshot from '@percy/playwright';
import { test } from '@playwright/test';

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
  });

  test('full page', async ({ page }) => {
    await percySnapshot(page, 'Full Page');
  });

  test('mobile side menu', async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 480 });
    await page.getByRole('button', { name: 'Toggle Navigation' }).click();
    const menu = page.getByRole('navigation', {
      name: 'Sections Navigation',
    });
    await menu.waitFor({ state: 'visible' });
    await percySnapshot(page, 'Side Menu');
  });
});

test.describe('blog', () => {
  test('index page', async ({ page }) => {
    await page.goto('/blog', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await percySnapshot(page, 'Index Page');
  });

  test('side menu', async ({ page }) => {
    await page.goto('/blog/demo', { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await percySnapshot(page, 'Blog Post Page');
  });
});
