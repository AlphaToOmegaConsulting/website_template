/**
 * E2E tests for base path navigation
 * Tests GitHub Pages deployment compatibility (root and subfolder)
 */

import { test, expect } from '@playwright/test';

/**
 * These tests verify that navigation works correctly
 * whether the site is deployed at root (/) or in a subfolder (/repo-name/)
 *
 * To test with different base paths:
 * 1. Update astro.config.mjs with desired base path
 * 2. Run: pnpm build && pnpm preview
 * 3. Run: pnpm test:e2e
 */

test.describe('Base path navigation - Root deployment (/)', () => {
    test.beforeEach(async ({ page }) => {
        // Visit home page
        await page.goto('/');
    });

    test('should navigate to French home page', async ({ page }) => {
        await page.goto('/fr/');
        await expect(page).toHaveURL('/fr/');
        await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    });

    test('should navigate to English home page', async ({ page }) => {
        await page.goto('/en/');
        await expect(page).toHaveURL('/en/');
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('should navigate between pages using header links', async ({ page }) => {
        await page.goto('/fr/');

        // Click on Events link
        await page.click('nav a[href*="events"]');
        await expect(page).toHaveURL(/\/fr\/events/);

        // Click on home link
        await page.click('nav a[href*="/fr/"]');
        await expect(page).toHaveURL('/fr/');
    });

    test('should highlight active navigation link correctly', async ({ page }) => {
        await page.goto('/fr/');

        // Home link should be active (exact match)
        const homeLink = page.locator('nav a[href*="/fr/"]').first();
        await expect(homeLink).toHaveAttribute('aria-current', 'page');

        // Navigate to events
        await page.goto('/fr/events');

        // Home link should NOT be active
        await expect(homeLink).not.toHaveAttribute('aria-current', 'page');

        // Events link should be active
        const eventsLink = page.locator('nav a[href*="events"]').first();
        await expect(eventsLink).toHaveAttribute('aria-current', 'page');
    });

    test('should switch language correctly', async ({ page }) => {
        await page.goto('/fr/');

        // Click language switcher
        const langSwitcher = page.locator('.language-switcher a');
        await langSwitcher.click();

        // Should navigate to English version
        await expect(page).toHaveURL('/en/');
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    });

    test('should have correct hreflang links in head', async ({ page }) => {
        await page.goto('/fr/');

        // Check for alternate language links
        const frLink = page.locator('link[hreflang="fr"]');
        const enLink = page.locator('link[hreflang="en"]');
        const defaultLink = page.locator('link[hreflang="x-default"]');

        await expect(frLink).toHaveCount(1);
        await expect(enLink).toHaveCount(1);
        await expect(defaultLink).toHaveCount(1);
    });

    test('should navigate footer links correctly', async ({ page }) => {
        await page.goto('/fr/');

        // Click on a footer link
        await page.click('footer a[href*="events"]');
        await expect(page).toHaveURL(/\/fr\/events/);
    });

    test('should load logo link to home page', async ({ page }) => {
        await page.goto('/fr/events');

        // Click logo to return home
        await page.click('header a:has-text("Logo")');
        await expect(page).toHaveURL('/fr/');
    });
});

test.describe('Base path navigation - Consistent across languages', () => {
    test('should maintain navigation structure in both languages', async ({ page }) => {
        // Check French navigation
        await page.goto('/fr/');
        const frNavLinks = await page.locator('nav a').count();

        // Check English navigation
        await page.goto('/en/');
        const enNavLinks = await page.locator('nav a').count();

        // Should have same number of nav links
        expect(frNavLinks).toBe(enNavLinks);
    });

    test('should have parallel routes for both languages', async ({ page }) => {
        const routes = ['/', '/events/', '/partners/'];

        for (const route of routes) {
            // Test French route
            const frResponse = await page.goto(`/fr${route}`);
            expect(frResponse?.status()).toBe(200);

            // Test English route
            const enResponse = await page.goto(`/en${route}`);
            expect(enResponse?.status()).toBe(200);
        }
    });
});

test.describe('Base path navigation - Active link detection', () => {
    test('should only mark home as active on home page', async ({ page }) => {
        await page.goto('/fr/');

        // Home should be active
        const homeLink = page.locator('nav a[aria-current="page"]');
        await expect(homeLink).toHaveCount(1);
        await expect(homeLink).toContainText(/Accueil|Home/);
    });

    test('should not mark home as active on subpages', async ({ page }) => {
        await page.goto('/fr/events');

        // Check that home link is NOT marked as active
        const homeLink = page.locator('nav a[href*="/fr/"]').first();
        await expect(homeLink).not.toHaveAttribute('aria-current', 'page');

        // Events link should be active
        const activeLink = page.locator('nav a[aria-current="page"]');
        await expect(activeLink).toHaveCount(1);
        await expect(activeLink).toContainText(/Événements|Events/);
    });

    test('should mark nested routes as active', async ({ page }) => {
        // This tests prefix matching for nested routes
        await page.goto('/fr/twt/landing/');

        const activeLink = page.locator('nav a[aria-current="page"]');
        await expect(activeLink).toHaveCount(1);
        await expect(activeLink).toHaveAttribute('href', /\/twt\/landing/);
    });
});

test.describe('Base path navigation - Mobile menu', () => {
    test('should open and close mobile menu', async ({ page }) => {
        // Set viewport to mobile size
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/fr/');

        // Mobile menu should be hidden initially
        const mobileMenu = page.locator('#mobile-menu');
        await expect(mobileMenu).toHaveClass(/hidden/);

        // Click mobile menu button
        await page.click('#mobile-menu-button');

        // Menu should be visible
        await expect(mobileMenu).not.toHaveClass(/hidden/);

        // Click button again to close
        await page.click('#mobile-menu-button');

        // Menu should be hidden again
        await expect(mobileMenu).toHaveClass(/hidden/);
    });

    test('should navigate using mobile menu', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/fr/');

        // Open mobile menu
        await page.click('#mobile-menu-button');

        // Click on events link in mobile menu
        await page.click('#mobile-menu a[href*="events"]');

        // Should navigate to events page
        await expect(page).toHaveURL(/\/fr\/events/);
    });
});

test.describe('Base path navigation - External links', () => {
    test('should not modify external links', async ({ page }) => {
        await page.goto('/fr/');

        // Find social links in footer (these are external: #)
        const socialLinks = page.locator('footer a[href="#"]');
        const count = await socialLinks.count();

        // All should have href="#" (placeholder for external links)
        for (let i = 0; i < count; i++) {
            const href = await socialLinks.nth(i).getAttribute('href');
            expect(href).toBe('#');
        }
    });
});
