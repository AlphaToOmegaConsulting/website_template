/**
 * URL utilities for base path management
 * Compatible with GitHub Pages deployment (root or subfolder)
 */

/**
 * Normalize base path by removing trailing slash (except for root "/")
 * @param base - The base path from import.meta.env.BASE_URL
 * @returns Normalized base path
 */
export function normalizeBasePath(base: string): string {
    if (!base || base === '/') {
        return '';
    }
    return base.endsWith('/') ? base.slice(0, -1) : base;
}

/**
 * Check if URL is external
 * @param url - URL to check
 * @returns true if URL is external (http://, https://, mailto:, tel:, etc.)
 */
export function isExternalUrl(url: string): boolean {
    return /^([a-z][a-z0-9+.-]*:|\/\/)/.test(url);
}

/**
 * Check if URL is absolute (starts with /)
 * @param url - URL to check
 * @returns true if URL is absolute
 */
export function isAbsoluteUrl(url: string): boolean {
    return url.startsWith('/');
}

/**
 * Build URL with base path for internal navigation
 * Handles:
 * - External URLs (returned unchanged)
 * - Absolute URLs (prefixed with base path)
 * - Relative URLs (prefixed with base path)
 *
 * @param path - The path to build (e.g., "/fr/", "events", "https://example.com")
 * @param base - Optional base path override (defaults to import.meta.env.BASE_URL)
 * @returns Complete URL with base path applied if needed
 */
export function buildUrl(path: string, base?: string): string {
    // External URLs are returned as-is
    if (isExternalUrl(path)) {
        return path;
    }

    // Get and normalize base path
    const basePath = normalizeBasePath(
        base ?? import.meta.env.BASE_URL ?? '/'
    );

    // For absolute paths, prepend base path
    if (isAbsoluteUrl(path)) {
        // Ensure no double slashes
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return basePath ? `${basePath}${normalizedPath}` : normalizedPath;
    }

    // For relative paths, prepend base path + /
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    return basePath ? `${basePath}/${normalizedPath}` : `/${normalizedPath}`;
}

/**
 * Normalize pathname for comparison (removes base path and trailing slash)
 * Useful for active link detection
 *
 * @param pathname - The pathname to normalize (from Astro.url.pathname)
 * @param base - Optional base path override (defaults to import.meta.env.BASE_URL)
 * @returns Normalized pathname for comparison
 */
export function normalizePathname(pathname: string, base?: string): string {
    const basePath = normalizeBasePath(
        base ?? import.meta.env.BASE_URL ?? '/'
    );

    let normalized = pathname;

    // Remove base path if present
    if (basePath && normalized.startsWith(basePath)) {
        normalized = normalized.slice(basePath.length);
    }

    // Ensure starts with /
    if (!normalized.startsWith('/')) {
        normalized = `/${normalized}`;
    }

    // Remove trailing slash (except for root)
    if (normalized !== '/' && normalized.endsWith('/')) {
        normalized = normalized.slice(0, -1);
    }

    return normalized;
}

/**
 * Check if a path matches the current pathname
 * Handles exact match for home pages and prefix match for other routes
 *
 * @param currentPathname - Current page pathname (from Astro.url.pathname)
 * @param linkPath - The link path to check
 * @param base - Optional base path override
 * @returns true if the link should be marked as active
 */
export function isActivePath(
    currentPathname: string,
    linkPath: string,
    base?: string
): boolean {
    const normalizedCurrent = normalizePathname(currentPathname, base);
    const normalizedLink = normalizePathname(linkPath, base);

    // Exact match for home pages (/, /fr/, /en/)
    const homePages = ['/', '/fr', '/en'];
    if (homePages.includes(normalizedLink)) {
        return normalizedCurrent === normalizedLink;
    }

    // Prefix match for other routes
    return normalizedCurrent.startsWith(normalizedLink);
}

/**
 * Get base URL for the site (protocol + domain + base path)
 * @param site - Site URL from Astro.site
 * @param base - Base path from import.meta.env.BASE_URL
 * @returns Complete base URL
 */
export function getBaseUrl(site?: string | URL, base?: string): string {
    const siteUrl = site ? new URL(site).origin : '';
    const basePath = normalizeBasePath(base ?? import.meta.env.BASE_URL ?? '/');
    return `${siteUrl}${basePath}`;
}
