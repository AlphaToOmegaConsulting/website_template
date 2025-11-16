/**
 * Site Configuration
 *
 * Central configuration file for site-wide settings.
 * Customize these values for each project deployment.
 *
 * This follows Alpha WebCore v3 principles:
 * - All brand-specific content is externalized
 * - Easy to customize per project
 * - No hardcoded business logic
 */

export const siteConfig = {
  // Site Identity
  name: 'My Company',
  tagline: 'Your tagline here',
  description: 'A modern multilingual website built with Astro, TypeScript, and Tailwind CSS.',

  // URLs and Paths
  url: 'https://example.com',
  baseUrl: '/', // For GitHub Pages or subdirectory deployments

  // SEO & Social
  seo: {
    defaultOgImage: '/og-default.jpg',
    twitterHandle: '@mycompany',
  },

  // Contact & Social Links
  social: {
    twitter: 'https://twitter.com/mycompany',
    linkedin: 'https://linkedin.com/company/mycompany',
    github: 'https://github.com/mycompany',
  },

  // i18n Configuration
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
  },

  // Features flags (optional)
  features: {
    enableBlog: false,
    enableEvents: true,
    enablePartners: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
