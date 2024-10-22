import { test, expect } from '@playwright/test';

test.describe('home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('has tagline', async ({ page }) => {
    await expect(page.getByText('こんにちは！')).toHaveAttribute('lang', 'ja');
  });

  test.describe('side menu', () => {
    test('desktop visibility', async ({ page }) => {
      const menu = page.getByRole('navigation', {
        name: 'Sections Navigation',
      });
      await expect(menu).toHaveClass(/--inline/);
      await expect(menu).toBeVisible();
    });
    test('mobile side menu toggle', async ({ page }) => {
      await page.setViewportSize({ width: 640, height: 480 });
      const toggler = page.getByRole('button', { name: 'Toggle Navigation' });

      await toggler.click();
      const menu = page.getByRole('navigation', {
        name: 'Sections Navigation',
      });
      await expect(menu).not.toHaveAttribute('inert');
      await expect(menu).toBeInViewport();

      await toggler.click();

      await expect(menu).toHaveAttribute('inert');
      await expect(menu).not.toBeInViewport();
    });
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
});

test.describe('blog', () => {
  test('navigate to blog list', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.getByText('personal blog').first().click();
    await page.waitForURL('**/blog');
    expect(await page.getByRole('article').count()).toBeGreaterThan(0);
  });

  test('navigate to blog entry', async ({ page }) => {
    await page.goto('/blog');
    await page.evaluate(() => localStorage.clear());
    await page.getByText('Demo').click();
    await page.waitForURL(/\/demo/, { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Demo');
  });
});
