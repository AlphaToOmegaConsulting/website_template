import { test, expect } from '@playwright/test';

/**
 * Tests E2E du LanguageSwitcher
 * Vérifie le bon fonctionnement du basculement entre FR et EN
 */
test.describe('LanguageSwitcher functionality', () => {
    test.describe('FR → EN switching', () => {
        test('should switch from FR homepage to EN homepage', async ({
            page,
        }) => {
            // Démarre sur la page d'accueil FR
            await page.goto('/fr/');

            // Vérifie qu'on est bien sur la page FR
            const htmlLangBefore = await page.locator('html').getAttribute('lang');
            expect(htmlLangBefore).toBe('fr');

            // Trouve et clique sur le LanguageSwitcher
            const languageSwitcher = page.locator(
                'a[hreflang="en"], a[href*="/en"]'
            ).first();
            await expect(languageSwitcher).toBeVisible();

            await languageSwitcher.click();

            // Attend la navigation
            await page.waitForLoadState('networkidle');

            // Vérifie qu'on est maintenant sur la page EN
            expect(page.url()).toContain('/en');
            const htmlLangAfter = await page.locator('html').getAttribute('lang');
            expect(htmlLangAfter).toBe('en');
        });

        test('should switch from FR events page to EN events page', async ({
            page,
        }) => {
            await page.goto('/fr/events/');

            // Vérifie la langue initiale
            const htmlLangBefore = await page.locator('html').getAttribute('lang');
            expect(htmlLangBefore).toBe('fr');

            // Clique sur le LanguageSwitcher
            const languageSwitcher = page.locator(
                'a[hreflang="en"], a[href*="/en"]'
            ).first();
            await expect(languageSwitcher).toBeVisible();
            await languageSwitcher.click();

            await page.waitForLoadState('networkidle');

            // Vérifie qu'on est sur la même page mais en EN
            expect(page.url()).toContain('/en/events');
            const htmlLangAfter = await page.locator('html').getAttribute('lang');
            expect(htmlLangAfter).toBe('en');
        });

        test('should switch from FR partners page to EN partners page', async ({
            page,
        }) => {
            await page.goto('/fr/partners/');

            const htmlLangBefore = await page.locator('html').getAttribute('lang');
            expect(htmlLangBefore).toBe('fr');

            const languageSwitcher = page.locator(
                'a[hreflang="en"], a[href*="/en"]'
            ).first();
            await expect(languageSwitcher).toBeVisible();
            await languageSwitcher.click();

            await page.waitForLoadState('networkidle');

            expect(page.url()).toContain('/en/partners');
            const htmlLangAfter = await page.locator('html').getAttribute('lang');
            expect(htmlLangAfter).toBe('en');
        });
    });

    test.describe('EN → FR switching', () => {
        test('should switch from EN homepage to FR homepage', async ({
            page,
        }) => {
            // Démarre sur la page d'accueil EN
            await page.goto('/en/');

            // Vérifie qu'on est bien sur la page EN
            const htmlLangBefore = await page.locator('html').getAttribute('lang');
            expect(htmlLangBefore).toBe('en');

            // Trouve et clique sur le LanguageSwitcher
            const languageSwitcher = page.locator(
                'a[hreflang="fr"], a[href*="/fr"]'
            ).first();
            await expect(languageSwitcher).toBeVisible();

            await languageSwitcher.click();

            // Attend la navigation
            await page.waitForLoadState('networkidle');

            // Vérifie qu'on est maintenant sur la page FR
            expect(page.url()).toContain('/fr');
            const htmlLangAfter = await page.locator('html').getAttribute('lang');
            expect(htmlLangAfter).toBe('fr');
        });

        test('should switch from EN events page to FR events page', async ({
            page,
        }) => {
            await page.goto('/en/events/');

            const htmlLangBefore = await page.locator('html').getAttribute('lang');
            expect(htmlLangBefore).toBe('en');

            const languageSwitcher = page.locator(
                'a[hreflang="fr"], a[href*="/fr"]'
            ).first();
            await expect(languageSwitcher).toBeVisible();
            await languageSwitcher.click();

            await page.waitForLoadState('networkidle');

            expect(page.url()).toContain('/fr/events');
            const htmlLangAfter = await page.locator('html').getAttribute('lang');
            expect(htmlLangAfter).toBe('fr');
        });

        test('should switch from EN partners page to FR partners page', async ({
            page,
        }) => {
            await page.goto('/en/partners/');

            const htmlLangBefore = await page.locator('html').getAttribute('lang');
            expect(htmlLangBefore).toBe('en');

            const languageSwitcher = page.locator(
                'a[hreflang="fr"], a[href*="/fr"]'
            ).first();
            await expect(languageSwitcher).toBeVisible();
            await languageSwitcher.click();

            await page.waitForLoadState('networkidle');

            expect(page.url()).toContain('/fr/partners');
            const htmlLangAfter = await page.locator('html').getAttribute('lang');
            expect(htmlLangAfter).toBe('fr');
        });
    });

    test.describe('LanguageSwitcher UI', () => {
        test('should display language switcher with proper labels on FR page', async ({
            page,
        }) => {
            await page.goto('/fr/');

            // Le LanguageSwitcher doit être visible
            const languageSwitcher = page.locator('.language-switcher a').first();
            await expect(languageSwitcher).toBeVisible();

            // Vérifie la présence de l'icône globe
            const globeIcon = languageSwitcher.locator('svg');
            await expect(globeIcon).toBeVisible();

            // Vérifie que le texte contient "English" ou "EN"
            const text = await languageSwitcher.textContent();
            expect(text).toMatch(/English|EN/);
        });

        test('should display language switcher with proper labels on EN page', async ({
            page,
        }) => {
            await page.goto('/en/');

            const languageSwitcher = page.locator('.language-switcher a').first();
            await expect(languageSwitcher).toBeVisible();

            const globeIcon = languageSwitcher.locator('svg');
            await expect(globeIcon).toBeVisible();

            // Vérifie que le texte contient "Français" ou "FR"
            const text = await languageSwitcher.textContent();
            expect(text).toMatch(/Français|FR/);
        });

        test('should have proper aria-label on language switcher', async ({
            page,
        }) => {
            await page.goto('/fr/');

            const languageSwitcher = page.locator('.language-switcher a').first();
            const ariaLabel = await languageSwitcher.getAttribute('aria-label');

            // L'aria-label doit être défini et non vide
            expect(ariaLabel).toBeTruthy();
            expect(ariaLabel?.length).toBeGreaterThan(0);
        });

        test('should have keyboard accessibility', async ({ page }) => {
            await page.goto('/fr/');

            // Focus sur le LanguageSwitcher via le clavier
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');

            // Trouve le LanguageSwitcher
            const languageSwitcher = page.locator('.language-switcher a').first();

            // Vérifie qu'il peut recevoir le focus
            const isFocusable = await languageSwitcher.evaluate(el => {
                return document.activeElement === el ||
                    el.tabIndex >= 0;
            });

            expect(isFocusable).toBeTruthy();
        });
    });

    test.describe('Edge cases', () => {
        test('should maintain correct language after page refresh', async ({
            page,
        }) => {
            await page.goto('/fr/');

            // Bascule vers EN
            const languageSwitcher = page.locator(
                'a[hreflang="en"], a[href*="/en"]'
            ).first();
            await languageSwitcher.click();
            await page.waitForLoadState('networkidle');

            // Rafraîchit la page
            await page.reload();
            await page.waitForLoadState('networkidle');

            // Vérifie qu'on est toujours en EN
            const htmlLang = await page.locator('html').getAttribute('lang');
            expect(htmlLang).toBe('en');
            expect(page.url()).toContain('/en');
        });

        test('should handle direct navigation to language-specific URLs', async ({
            page,
        }) => {
            // Navigation directe vers une URL FR
            await page.goto('/fr/events/');
            let htmlLang = await page.locator('html').getAttribute('lang');
            expect(htmlLang).toBe('fr');

            // Navigation directe vers une URL EN
            await page.goto('/en/events/');
            htmlLang = await page.locator('html').getAttribute('lang');
            expect(htmlLang).toBe('en');
        });
    });
});
