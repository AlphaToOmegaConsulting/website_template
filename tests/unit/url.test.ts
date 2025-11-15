/**
 * Unit tests for URL utilities
 * Tests base path handling for GitHub Pages deployment
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
    normalizeBasePath,
    isExternalUrl,
    isAbsoluteUrl,
    buildUrl,
    normalizePathname,
    isActivePath,
    getBaseUrl,
} from '../../src/utils/url';

describe('normalizeBasePath', () => {
    it('should return empty string for root path', () => {
        expect(normalizeBasePath('/')).toBe('');
    });

    it('should remove trailing slash from base path', () => {
        expect(normalizeBasePath('/my-repo/')).toBe('/my-repo');
        expect(normalizeBasePath('/alpha-web/')).toBe('/alpha-web');
    });

    it('should keep path without trailing slash unchanged', () => {
        expect(normalizeBasePath('/my-repo')).toBe('/my-repo');
    });

    it('should handle empty string', () => {
        expect(normalizeBasePath('')).toBe('');
    });
});

describe('isExternalUrl', () => {
    it('should detect http URLs as external', () => {
        expect(isExternalUrl('http://example.com')).toBe(true);
        expect(isExternalUrl('https://example.com')).toBe(true);
    });

    it('should detect special protocols as external', () => {
        expect(isExternalUrl('mailto:test@example.com')).toBe(true);
        expect(isExternalUrl('tel:+1234567890')).toBe(true);
        expect(isExternalUrl('ftp://example.com')).toBe(true);
    });

    it('should detect protocol-relative URLs as external', () => {
        expect(isExternalUrl('//example.com')).toBe(true);
    });

    it('should detect internal paths as not external', () => {
        expect(isExternalUrl('/fr/')).toBe(false);
        expect(isExternalUrl('/en/events')).toBe(false);
        expect(isExternalUrl('about')).toBe(false);
        expect(isExternalUrl('#anchor')).toBe(false);
    });
});

describe('isAbsoluteUrl', () => {
    it('should detect absolute paths', () => {
        expect(isAbsoluteUrl('/fr/')).toBe(true);
        expect(isAbsoluteUrl('/en/events')).toBe(true);
    });

    it('should detect relative paths', () => {
        expect(isAbsoluteUrl('events')).toBe(false);
        expect(isAbsoluteUrl('about.html')).toBe(false);
        expect(isAbsoluteUrl('../parent')).toBe(false);
    });
});

describe('buildUrl', () => {
    // Store original BASE_URL
    let originalBaseUrl: string | undefined;

    beforeEach(() => {
        originalBaseUrl = import.meta.env.BASE_URL;
    });

    afterEach(() => {
        // Restore original BASE_URL
        if (originalBaseUrl !== undefined) {
            import.meta.env.BASE_URL = originalBaseUrl;
        }
    });

    describe('with root base path', () => {
        beforeEach(() => {
            import.meta.env.BASE_URL = '/';
        });

        it('should return absolute paths unchanged', () => {
            expect(buildUrl('/fr/')).toBe('/fr/');
            expect(buildUrl('/en/events')).toBe('/en/events');
        });

        it('should prepend slash to relative paths', () => {
            expect(buildUrl('events')).toBe('/events');
            expect(buildUrl('about.html')).toBe('/about.html');
        });

        it('should return external URLs unchanged', () => {
            expect(buildUrl('https://example.com')).toBe('https://example.com');
            expect(buildUrl('mailto:test@example.com'))
                .toBe('mailto:test@example.com');
        });
    });

    describe('with subfolder base path', () => {
        beforeEach(() => {
            import.meta.env.BASE_URL = '/my-repo/';
        });

        it('should prepend base path to absolute paths', () => {
            expect(buildUrl('/fr/')).toBe('/my-repo/fr/');
            expect(buildUrl('/en/events')).toBe('/my-repo/en/events');
        });

        it('should prepend base path to relative paths', () => {
            expect(buildUrl('events')).toBe('/my-repo/events');
            expect(buildUrl('about.html')).toBe('/my-repo/about.html');
        });

        it('should return external URLs unchanged', () => {
            expect(buildUrl('https://example.com')).toBe('https://example.com');
        });

        it('should handle paths that already start with slash', () => {
            expect(buildUrl('/fr/')).toBe('/my-repo/fr/');
        });
    });

    describe('with base path override', () => {
        it('should use provided base path instead of env', () => {
            expect(buildUrl('/fr/', '/custom-base/')).toBe('/custom-base/fr/');
            expect(buildUrl('events', '/custom-base')).toBe('/custom-base/events');
        });
    });
});

describe('normalizePathname', () => {
    describe('with root base path', () => {
        it('should remove trailing slash except for root', () => {
            expect(normalizePathname('/')).toBe('/');
            expect(normalizePathname('/fr/')).toBe('/fr');
            expect(normalizePathname('/en/events/')).toBe('/en/events');
        });

        it('should ensure leading slash', () => {
            expect(normalizePathname('fr')).toBe('/fr');
            expect(normalizePathname('en/events')).toBe('/en/events');
        });
    });

    describe('with subfolder base path', () => {
        it('should remove base path and trailing slash', () => {
            expect(normalizePathname('/my-repo/fr/', '/my-repo/'))
                .toBe('/fr');
            expect(normalizePathname('/my-repo/en/events/', '/my-repo'))
                .toBe('/en/events');
        });

        it('should handle paths without base path', () => {
            expect(normalizePathname('/fr/', '/my-repo/'))
                .toBe('/fr');
        });
    });
});

describe('isActivePath', () => {
    describe('with root base path', () => {
        it('should exact match home pages', () => {
            expect(isActivePath('/fr/', '/fr/')).toBe(true);
            expect(isActivePath('/en/', '/en/')).toBe(true);
            expect(isActivePath('/', '/')).toBe(true);

            // Should not match home when on subpage
            expect(isActivePath('/fr/events', '/fr/')).toBe(false);
            expect(isActivePath('/en/about', '/en/')).toBe(false);
        });

        it('should prefix match other routes', () => {
            expect(isActivePath('/fr/events', '/fr/events')).toBe(true);
            expect(isActivePath('/fr/events/123', '/fr/events')).toBe(true);
            expect(isActivePath('/en/partners', '/en/partners')).toBe(true);
        });

        it('should not match different routes', () => {
            expect(isActivePath('/fr/events', '/fr/partners')).toBe(false);
            expect(isActivePath('/en/', '/fr/')).toBe(false);
        });

        it('should handle trailing slashes', () => {
            expect(isActivePath('/fr/events/', '/fr/events')).toBe(true);
            expect(isActivePath('/fr/events', '/fr/events/')).toBe(true);
        });
    });

    describe('with subfolder base path', () => {
        it('should exact match home pages with base path', () => {
            expect(isActivePath('/my-repo/fr/', '/fr/', '/my-repo/'))
                .toBe(true);
            expect(isActivePath('/my-repo/en/', '/en/', '/my-repo'))
                .toBe(true);

            // Should not match home when on subpage
            expect(isActivePath('/my-repo/fr/events', '/fr/', '/my-repo/'))
                .toBe(false);
        });

        it('should prefix match other routes with base path', () => {
            expect(isActivePath('/my-repo/fr/events', '/fr/events', '/my-repo/'))
                .toBe(true);
            expect(
                isActivePath('/my-repo/fr/events/123', '/fr/events', '/my-repo')
            ).toBe(true);
        });
    });
});

describe('getBaseUrl', () => {
    describe('without site URL', () => {
        it('should return only base path', () => {
            expect(getBaseUrl(undefined, '/')).toBe('');
            expect(getBaseUrl(undefined, '/my-repo/')).toBe('/my-repo');
        });
    });

    describe('with site URL', () => {
        it('should combine site origin and base path', () => {
            expect(getBaseUrl('https://example.com', '/'))
                .toBe('https://example.com');
            expect(getBaseUrl('https://example.com', '/my-repo/'))
                .toBe('https://example.com/my-repo');
            expect(getBaseUrl(new URL('https://example.com'), '/my-repo'))
                .toBe('https://example.com/my-repo');
        });

        it('should handle site URL with path', () => {
            expect(getBaseUrl('https://example.com/path', '/my-repo/'))
                .toBe('https://example.com/my-repo');
        });
    });
});
