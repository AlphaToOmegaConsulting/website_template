import { test, expect } from '@playwright/test';

/**
 * Tests d'intégrité des liens
 * Vérifie que tous les liens internes pointent vers des pages existantes
 *
 * Ce test parcourt toutes les pages principales et vérifie que :
 * 1. Tous les liens internes dans le header sont valides
 * 2. Tous les liens internes dans le footer sont valides
 * 3. Aucun lien ne mène à une page 404
 */
test.describe('Link Integrity', () => {
  const pages = [
    '/fr/',
    '/en/',
    '/fr/demo/',
    '/en/demo/',
    '/fr/library/',
    '/en/library/',
    '/fr/library/primitives/',
    '/en/library/primitives/',
    '/fr/library/sections/',
    '/en/library/sections/',
    '/fr/library/layout/',
    '/en/library/layout/',
    '/fr/guides/',
    '/en/guides/',
  ];

  for (const pageUrl of pages) {
    test(`should have no broken links on ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);

      // Récupérer tous les liens internes (header + footer + nav)
      const allLinks = await page.locator('a[href^="/"]').all();
      const brokenLinks: { href: string; status: number | null; location: string }[] = [];

      for (const link of allLinks) {
        const href = await link.getAttribute('href');
        if (!href) continue;

        // Ignorer les ancres et les assets
        if (href.includes('#') || href.startsWith('/assets/') || href.startsWith('/_astro/')) {
          continue;
        }

        try {
          // Vérifier que le lien retourne 200
          const response = await page.request.get(href);
          const status = response.status();

          if (status !== 200) {
            const location = await link.evaluate(el => {
              if (el.closest('header')) return 'header';
              if (el.closest('footer')) return 'footer';
              if (el.closest('nav')) return 'nav';
              return 'body';
            });

            brokenLinks.push({ href, status, location });
          }
        } catch (error) {
          const location = await link.evaluate(el => {
            if (el.closest('header')) return 'header';
            if (el.closest('footer')) return 'footer';
            if (el.closest('nav')) return 'nav';
            return 'body';
          });

          brokenLinks.push({ href, status: null, location });
        }
      }

      // Le test échoue si des liens cassés sont trouvés
      if (brokenLinks.length > 0) {
        const errorMessage = brokenLinks
          .map(link => `  - ${link.href} (status: ${link.status ?? 'error'}, location: ${link.location})`)
          .join('\n');

        expect(brokenLinks, `Liens cassés trouvés sur ${pageUrl}:\n${errorMessage}`).toEqual([]);
      }
    });
  }

  test('should validate all navigation links exist and work', async ({ page }) => {
    // Tester que tous les liens de navigation fonctionnent depuis la page d'accueil
    await page.goto('/fr/');

    const navLinks = await page.locator('nav a[href^="/"]').all();
    expect(navLinks.length).toBeGreaterThan(0);

    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      if (!href) continue;

      const response = await page.request.get(href);
      expect(
        response.status(),
        `Navigation link ${href} should return 200`
      ).toBe(200);
    }
  });

  test('should validate all footer links exist and work', async ({ page }) => {
    // Tester que tous les liens du footer fonctionnent
    await page.goto('/fr/');

    const footerLinks = await page.locator('footer a[href^="/"]').all();

    for (const link of footerLinks) {
      const href = await link.getAttribute('href');
      if (!href) continue;

      // Ignorer les ancres et les assets
      if (href.includes('#') || href.startsWith('/assets/') || href.startsWith('/_astro/')) {
        continue;
      }

      const response = await page.request.get(href);
      expect(
        response.status(),
        `Footer link ${href} should return 200`
      ).toBe(200);
    }
  });

  test('should have matching navigation links between languages', async ({ page }) => {
    // Vérifier que FR et EN ont le même nombre de liens de navigation
    await page.goto('/fr/');
    const frNavLinks = await page.locator('nav a').count();

    await page.goto('/en/');
    const enNavLinks = await page.locator('nav a').count();

    expect(frNavLinks).toBe(enNavLinks);
  });

  test('should have matching footer links between languages', async ({ page }) => {
    // Vérifier que FR et EN ont le même nombre de liens dans le footer
    await page.goto('/fr/');
    const frFooterLinks = await page.locator('footer a[href^="/"]').count();

    await page.goto('/en/');
    const enFooterLinks = await page.locator('footer a[href^="/"]').count();

    expect(frFooterLinks).toBe(enFooterLinks);
  });

  test('should not have any 404 pages in main navigation paths', async ({ page }) => {
    const paths = [
      '/fr/',
      '/fr/demo/',
      '/fr/demo/events/',
      '/fr/demo/partners/',
      '/fr/library/',
      '/fr/guides/',
      '/en/',
      '/en/demo/',
      '/en/demo/events/',
      '/en/demo/partners/',
      '/en/library/',
      '/en/guides/',
    ];

    for (const path of paths) {
      const response = await page.goto(path);
      expect(
        response?.status(),
        `Path ${path} should return 200, not ${response?.status()}`
      ).toBe(200);
    }
  });
});
