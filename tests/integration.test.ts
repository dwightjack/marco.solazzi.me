import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('has tagline', async ({ page }) => {
  await expect(page.getByText('こんにちは！')).toHaveAttribute('lang', 'ja');
});

test('side menu toggle', async ({ page }) => {
  const menu = page.getByRole('navigation', {
    name: 'Sections Navigation',
    includeHidden: true,
  });

  await expect(menu).toHaveAttribute('inert');
  await expect(menu).not.toBeInViewport();

  await page.getByRole('button', { name: 'Toggle Menu' }).click();

  await expect(menu).not.toHaveAttribute('inert');
  await expect(menu).toBeInViewport();
});

test('color theme toggler', async ({ page }) => {
  const html = page.locator('html');
  const initialTheme = await html.getAttribute('data-theme');
  const initialBrand = await html.evaluate((element) =>
    window.getComputedStyle(element).getPropertyValue('--color-brand-hue'),
  );

  await page.getByRole('button', { name: 'Change the color theme' }).click();

  // theme and hue has changed
  expect(await html.getAttribute('data-theme')).not.toBe(initialTheme);
  await expect(html).not.toHaveCSS('--color-brand-hue', initialBrand);
});
