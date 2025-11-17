import { test, expect } from '@playwright/test';

/**
 * Tests de validation des liens dans le header
 * Vérifie que tous les liens présents dans la navigation fonctionnent
 * et ne mènent pas à des pages 404
 */
test.describe('Header Links Validation', () => {
  const pagesToTest = [
    { url: '/fr/', lang: 'fr' },
    { url: '/en/', lang: 'en' },
    { url: '/fr/events/', lang: 'fr' },
    { url: '/en/events/', lang: 'en' },
    { url: '/fr/partners/', lang: 'fr' },
    { url: '/en/partners/', lang: 'en' },
  ];

  for (const pageConfig of pagesToTest) {
    test(`should have all working navigation links on ${pageConfig.url}`, async ({ page }) => {
      // Charger la page
      await page.goto(pageConfig.url);

      // Récupérer tous les liens dans le header (nav + logo + language switcher)
      const headerLinks = await page.locator('header a').all();

      expect(headerLinks.length).toBeGreaterThan(0);

      const brokenLinks: { href: string; status: number | null }[] = [];

      // Vérifier chaque lien
      for (const link of headerLinks) {
        const href = await link.getAttribute('href');

        if (!href) continue;

        // Ignorer les liens externes et les ancres
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
          continue;
        }

        try {
          // Naviguer vers le lien et vérifier le status
          const response = await page.request.get(href);
          const status = response.status();

          if (status !== 200) {
            brokenLinks.push({ href, status });
          }
        } catch (error) {
          brokenLinks.push({ href, status: null });
        }
      }

      // Le test échoue si des liens cassés sont trouvés
      if (brokenLinks.length > 0) {
        const brokenLinksMessage = brokenLinks
          .map(link => `  - ${link.href} (status: ${link.status ?? 'error'})`)
          .join('\n');

        expect(brokenLinks, `Liens cassés trouvés sur ${pageConfig.url}:\n${brokenLinksMessage}`).toEqual([]);
      }
    });
  }

  test('should validate logo link works on French homepage', async ({ page }) => {
    await page.goto('/fr/');

    // Trouver le lien du logo
    const logoLink = page.locator('header a').filter({ hasText: 'Logo' }).first();
    await expect(logoLink).toBeVisible();

    const href = await logoLink.getAttribute('href');
    expect(href).toBeTruthy();

    // Vérifier que le lien fonctionne
    const response = await page.request.get(href!);
    expect(response.status()).toBe(200);
  });

  test('should validate logo link works on English homepage', async ({ page }) => {
    await page.goto('/en/');

    // Trouver le lien du logo
    const logoLink = page.locator('header a').filter({ hasText: 'Logo' }).first();
    await expect(logoLink).toBeVisible();

    const href = await logoLink.getAttribute('href');
    expect(href).toBeTruthy();

    // Vérifier que le lien fonctionne
    const response = await page.request.get(href!);
    expect(response.status()).toBe(200);
  });

  test('should validate all navigation items are clickable and lead to valid pages', async ({ page }) => {
    await page.goto('/fr/');

    // Récupérer tous les liens de navigation (dans l'élément nav)
    const navLinks = await page.locator('nav a').all();

    expect(navLinks.length).toBeGreaterThan(0);

    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      const text = await link.textContent();

      // Vérifier que le lien a un href
      expect(href, `Le lien "${text}" devrait avoir un attribut href`).toBeTruthy();

      // Ignorer les liens externes
      if (href!.startsWith('http://') || href!.startsWith('https://')) {
        continue;
      }

      // Vérifier que la page existe (status 200)
      const response = await page.request.get(href!);
      expect(
        response.status(),
        `Le lien "${text}" (${href}) devrait retourner un status 200, mais a retourné ${response.status()}`
      ).toBe(200);
    }
  });

  test('should have consistent navigation links across French pages', async ({ page }) => {
    const frenchPages = ['/fr/', '/fr/events/', '/fr/partners/'];
    let firstPageNavLinks: string[] | null = null;

    for (const pageUrl of frenchPages) {
      await page.goto(pageUrl);

      // Récupérer les hrefs de navigation
      const navLinks = await page.locator('nav a').all();
      const hrefs = await Promise.all(navLinks.map(link => link.getAttribute('href')));
      const cleanHrefs = hrefs.filter(Boolean).sort();

      if (firstPageNavLinks === null) {
        firstPageNavLinks = cleanHrefs as string[];
      } else {
        // Vérifier que la navigation est cohérente
        expect(
          cleanHrefs,
          `La navigation sur ${pageUrl} devrait être identique aux autres pages FR`
        ).toEqual(firstPageNavLinks);
      }
    }
  });

  test('should have consistent navigation links across English pages', async ({ page }) => {
    const englishPages = ['/en/', '/en/events/', '/en/partners/'];
    let firstPageNavLinks: string[] | null = null;

    for (const pageUrl of englishPages) {
      await page.goto(pageUrl);

      // Récupérer les hrefs de navigation
      const navLinks = await page.locator('nav a').all();
      const hrefs = await Promise.all(navLinks.map(link => link.getAttribute('href')));
      const cleanHrefs = hrefs.filter(Boolean).sort();

      if (firstPageNavLinks === null) {
        firstPageNavLinks = cleanHrefs as string[];
      } else {
        // Vérifier que la navigation est cohérente
        expect(
          cleanHrefs,
          `La navigation sur ${pageUrl} devrait être identique aux autres pages EN`
        ).toEqual(firstPageNavLinks);
      }
    }
  });
});
