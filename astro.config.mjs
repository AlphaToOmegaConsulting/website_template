import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// GitHub Pages configuration via environment variables
const site = process.env.PUBLIC_SITE_URL || '';
const repo = process.env.PUBLIC_REPO_NAME || '';

// https://astro.build/config
export default defineConfig({
  site,
  base: repo ? `/${repo}` : '/',

  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: {
          fr: 'fr-FR',
          en: 'en-US',
        },
      },
    }),
  ],
});
