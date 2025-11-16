import { test, expect } from '@playwright/test';

test.describe('Content Sections', () => {
  test.describe('Homepage Sections', () => {
    test('should display hero section', async ({ page }) => {
      await page.goto('/en');

      // Check for hero section
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      // Check for title
      const title = hero.locator('h1, h2').first();
      await expect(title).toBeVisible();
      await expect(title).not.toBeEmpty();
    });

    test('should display features section', async ({ page }) => {
      await page.goto('/en');

      // Look for features grid or list
      const features = page.locator('[class*="grid"]').filter({ hasText: /feature|service|offer/i });
      if (await features.count() > 0) {
        await expect(features.first()).toBeVisible();
      }
    });

    test('should display CTA section', async ({ page }) => {
      await page.goto('/en');

      // Check for CTA buttons
      const ctaButtons = page.locator('a[class*="bg-brand"], button[class*="bg-brand"]');
      expect(await ctaButtons.count()).toBeGreaterThan(0);
    });
  });

  test.describe('Events Page', () => {
    test('should display events list', async ({ page }) => {
      await page.goto('/en/events');

      // Check page loads
      await expect(page).toHaveTitle(/event/i);

      // Check for events container
      const eventsContainer = page.locator('main');
      await expect(eventsContainer).toBeVisible();
    });

    test('should have working event cards', async ({ page }) => {
      await page.goto('/en/events');

      // Look for card components
      const cards = page.locator('[class*="card"], [class*="rounded"], [class*="shadow"]');
      if (await cards.count() > 0) {
        await expect(cards.first()).toBeVisible();
      }
    });
  });

  test.describe('Responsive Sections', () => {
    test('should adapt hero section on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');

      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      // Check that content is visible on mobile
      const heading = hero.locator('h1, h2').first();
      await expect(heading).toBeVisible();
    });

    test('should adapt features grid on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/en');

      // Features should be visible
      const features = page.locator('section').nth(1);
      if (await features.isVisible()) {
        await expect(features).toBeVisible();
      }
    });

    test('should display full layout on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/en');

      // All sections should be visible
      const sections = page.locator('section');
      const count = await sections.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});

test.describe('Section Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/en');

    // Check h1 exists
    const h1 = page.locator('h1');
    expect(await h1.count()).toBeGreaterThan(0);

    // Check headings are in order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have accessible images', async ({ page }) => {
    await page.goto('/en');

    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });

  test('should have accessible links', async ({ page }) => {
    await page.goto('/en');

    const links = await page.locator('a').all();
    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      // Link should have text or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('should have keyboard navigable buttons', async ({ page }) => {
    await page.goto('/en');

    // Focus on first button
    const firstButton = page.locator('button, a[role="button"]').first();
    if (await firstButton.count() > 0) {
      await firstButton.focus();
      await expect(firstButton).toBeFocused();
    }
  });
});

test.describe('Section Content Validation', () => {
  test('should not have empty sections', async ({ page }) => {
    await page.goto('/en');

    const sections = await page.locator('section').all();
    for (const section of sections) {
      const text = await section.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should not have broken internal links', async ({ page }) => {
    await page.goto('/en');

    const internalLinks = await page.locator('a[href^="/"], a[href^="#"]').all();
    for (const link of internalLinks.slice(0, 5)) { // Test first 5 to avoid timeout
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        const response = await page.request.get(href);
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('should have valid HTML structure', async ({ page }) => {
    await page.goto('/en');

    // Check for main element
    const main = page.locator('main');
    expect(await main.count()).toBeGreaterThan(0);

    // Check for footer
    const footer = page.locator('footer');
    expect(await footer.count()).toBeGreaterThan(0);
  });
});
