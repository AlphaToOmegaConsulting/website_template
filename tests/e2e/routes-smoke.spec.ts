import { test, expect } from '@playwright/test';

/**
 * Smoke tests des routes principales
 * Vérifie que les routes principales chargent correctement avec un status OK
 */
test.describe('Routes smoke tests', () => {
    const routes = {
        fr: [
            '/',
            '/fr/',
            '/fr/events/',
            '/fr/components',
        ],
        en: [
            '/en/',
            '/en/events/',
            '/en/components',
        ],
    };

    test.describe('French routes', () => {
        for (const route of routes.fr) {
            test(`should load ${route} successfully`, async ({ page }) => {
                const response = await page.goto(route);

                // Vérifie que la page charge avec un status OK
                expect(response?.status()).toBe(200);

                // Vérifie que la page contient du HTML
                const html = await page.content();
                expect(html).toContain('<!DOCTYPE html>');
                expect(html).toContain('<html');

                // Vérifie que lang="fr" est présent pour les routes FR
                if (!route.startsWith('/en')) {
                    expect(html).toMatch(/<html[^>]*lang=["']fr["']/);
                }
            });
        }
    });

    test.describe('English routes', () => {
        for (const route of routes.en) {
            test(`should load ${route} successfully`, async ({ page }) => {
                const response = await page.goto(route);

                // Vérifie que la page charge avec un status OK
                expect(response?.status()).toBe(200);

                // Vérifie que la page contient du HTML
                const html = await page.content();
                expect(html).toContain('<!DOCTYPE html>');
                expect(html).toContain('<html');

                // Vérifie que lang="en" est présent
                expect(html).toMatch(/<html[^>]*lang=["']en["']/);
            });
        }
    });

    test.describe('404 pages', () => {
        test('should handle FR 404 page', async ({ page }) => {
            const response = await page.goto('/fr/page-qui-nexiste-pas');

            // La page 404 doit être servie (status 200 ou 404 selon config Astro)
            expect(response?.status()).toBeGreaterThanOrEqual(200);

            const html = await page.content();
            expect(html).toMatch(/<html[^>]*lang=["']fr["']/);
        });

        test('should handle EN 404 page', async ({ page }) => {
            const response = await page.goto('/en/page-that-does-not-exist');

            expect(response?.status()).toBeGreaterThanOrEqual(200);

            const html = await page.content();
            expect(html).toMatch(/<html[^>]*lang=["']en["']/);
        });
    });

    test.describe('Basic accessibility checks', () => {
        test('should have proper document structure on FR homepage', async ({
            page,
        }) => {
            await page.goto('/fr');

            // Vérifie la présence des éléments structurels de base
            const h1Count = await page.locator('h1').count();
            expect(h1Count).toBeGreaterThan(0);

            // Vérifie la présence du title
            const title = await page.title();
            expect(title).toBeTruthy();
            expect(title.length).toBeGreaterThan(0);
        });

        test('should have proper document structure on EN homepage', async ({
            page,
        }) => {
            await page.goto('/en');

            // Vérifie la présence des éléments structurels de base
            const h1Count = await page.locator('h1').count();
            expect(h1Count).toBeGreaterThan(0);

            // Vérifie la présence du title
            const title = await page.title();
            expect(title).toBeTruthy();
            expect(title.length).toBeGreaterThan(0);
        });
    });
});
