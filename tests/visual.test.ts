import percySnapshot from '@percy/playwright';
import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
});

test('full page', async ({ page }) => {
  await percySnapshot(page, 'Full Page');
});

test('side menu', async ({ page }) => {
  await page.getByRole('button', { name: 'Toggle Menu' }).click();
  await page.waitForTimeout(1000);
  await percySnapshot(page, 'Side Menu');
});
