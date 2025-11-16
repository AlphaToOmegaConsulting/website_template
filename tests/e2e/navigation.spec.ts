import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between French pages', async ({ page }) => {
    // Start at French homepage
    await page.goto('/fr/');
    await expect(page).toHaveTitle(/Tech Women/);

    // Navigate to events page
    await page.click('a[href="/fr/events/"]');
    await expect(page).toHaveURL(/\/fr\/events/);
    await expect(page.locator('h1')).toContainText(/événements/i);

    // Navigate to partners page
    await page.click('a[href="/fr/partners/"]');
    await expect(page).toHaveURL(/\/fr\/partners/);
    await expect(page.locator('h1')).toContainText(/partenaires/i);

    // Navigate back to homepage
    await page.click('a[href="/fr/"]');
    await expect(page).toHaveURL('/fr/');
  });

  test('should navigate between English pages', async ({ page }) => {
    // Start at English homepage
    await page.goto('/en/');
    await expect(page).toHaveTitle(/Tech Women/);

    // Navigate to events page
    await page.click('a[href="/en/events/"]');
    await expect(page).toHaveURL(/\/en\/events/);
    await expect(page.locator('h1')).toContainText(/events/i);

    // Navigate to partners page
    await page.click('a[href="/en/partners/"]');
    await expect(page).toHaveURL(/\/en\/partners/);
    await expect(page.locator('h1')).toContainText(/partners/i);

    // Navigate back to homepage
    await page.click('a[href="/en/"]');
    await expect(page).toHaveURL('/en/');
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
    expect(['A', 'BUTTON']).toContain(focusedElement);

    // Check that navigation has proper ARIA attributes
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should highlight active page in navigation', async ({ page }) => {
    await page.goto('/fr/events/');

    // Check that the events link has an active state
    const eventsLink = page.locator('nav a[href="/fr/events/"]');
    await expect(eventsLink).toHaveAttribute('aria-current', 'page');
  });
});
