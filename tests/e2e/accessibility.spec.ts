import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Tests d'accessibilité avec axe-playwright
 * Vérifie les violations WCAG sur les pages principales
 */
test.describe('Accessibility Tests', () => {
  test('should not have accessibility violations on French homepage', async ({ page }) => {
    await page.goto('/fr/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on English homepage', async ({ page }) => {
    await page.goto('/en/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on French events page', async ({ page }) => {
    await page.goto('/fr/events/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on English events page', async ({ page }) => {
    await page.goto('/en/events/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on French 404 page', async ({ page }) => {
    await page.goto('/fr/404');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on English 404 page', async ({ page }) => {
    await page.goto('/en/404');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy on homepage', async ({ page }) => {
    await page.goto('/fr/');

    // Check that h1 exists
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);

    // Check heading hierarchy
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const headingViolations = accessibilityScanResults.violations.filter(
      v => v.id.includes('heading')
    );

    expect(headingViolations).toEqual([]);
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/fr/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('should have accessible forms', async ({ page }) => {
    await page.goto('/fr/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const formViolations = accessibilityScanResults.violations.filter(
      v => v.id.includes('label') || v.id.includes('form')
    );

    expect(formViolations).toEqual([]);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/fr/');

    // Check that nav element exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check that navigation links are accessible
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('nav')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have accessible language switcher', async ({ page }) => {
    await page.goto('/fr/');

    // Check that language links have proper attributes
    const langLinks = page.locator('a[hreflang]');
    const count = await langLinks.count();
    expect(count).toBeGreaterThan(0);

    // Check for accessibility violations in language switcher
    const accessibilityScanResults = await new AxeBuilder({ page })
      .analyze();

    const langViolations = accessibilityScanResults.violations.filter(
      v => v.nodes.some(node => node.html.includes('hreflang'))
    );

    expect(langViolations).toEqual([]);
  });
});
