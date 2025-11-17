import { test, expect } from '@playwright/test';

/**
 * Tests de navigation générique
 * Vérifie la navigation de base entre les pages FR/EN sans dépendre du contenu spécifique
 */
test.describe('Navigation', () => {
  test('should navigate to French homepage', async ({ page }) => {
    await page.goto('/fr/');

    // Verify page loads and has a title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Verify h1 exists
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('should navigate to English homepage', async ({ page }) => {
    await page.goto('/en/');

    // Verify page loads and has a title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Verify h1 exists
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('should switch languages using language switcher', async ({ page }) => {
    // Start at French homepage
    await page.goto('/fr/');

    // Switch to English
    const englishLink = page.locator('a[hreflang="en"]');
    await englishLink.click();
    await expect(page).toHaveURL('/en/');

    // Switch back to French
    const frenchLink = page.locator('a[hreflang="fr"]');
    await frenchLink.click();
    await expect(page).toHaveURL('/fr/');
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/fr/');

    // Check that navigation is keyboard accessible
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);

    // Check that navigation exists and is visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate to demo page from French homepage', async ({ page }) => {
    await page.goto('/fr/');

    // Look for demo link in navigation
    const demoLink = page.locator('nav a[href*="/fr/demo"]').first();
    await expect(demoLink).toBeVisible();
    await demoLink.click();
    await expect(page).toHaveURL(/\/fr\/demo/);
  });

  test('should navigate to demo page from English homepage', async ({ page }) => {
    await page.goto('/en/');

    // Look for demo link in navigation
    const demoLink = page.locator('nav a[href*="/en/demo"]').first();
    await expect(demoLink).toBeVisible();
    await demoLink.click();
    await expect(page).toHaveURL(/\/en\/demo/);
  });
});
