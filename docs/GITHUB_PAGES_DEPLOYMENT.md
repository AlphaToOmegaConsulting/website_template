# GitHub Pages Deployment Guide

This template is natively compatible with GitHub Pages deployment, supporting both root and subfolder configurations.

## Table of Contents

- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [Content Guidelines](#content-guidelines)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Option 1: Root Deployment (Custom Domain or username.github.io)

For deployment at the root of your domain:

1. Update `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://yourdomain.com', // or https://username.github.io
  base: '/',
  // ... rest of config
});
```

2. Build and deploy:
```bash
pnpm build
```

### Option 2: Subfolder Deployment (Repository Pages)

For deployment in a repository subfolder (e.g., `https://username.github.io/my-repo/`):

1. Update `astro.config.mjs`:
```js
export default defineConfig({
  site: 'https://username.github.io',
  base: '/my-repo/', // Replace with your repository name
  // ... rest of config
});
```

2. Build and deploy:
```bash
pnpm build
```

## Configuration

### Site and Base Path

The template uses two key configuration values:

- **`site`**: Your full domain (e.g., `https://example.com`)
- **`base`**: The base path for your site:
  - Root deployment: `'/'`
  - Subfolder deployment: `'/repository-name/'`

### Important: Always Use Trailing Slash

When configuring a subfolder deployment, always include the trailing slash:

✅ Correct: `base: '/my-repo/'`
❌ Incorrect: `base: '/my-repo'`

## How It Works

### Automatic URL Resolution

The template includes a centralized URL management system ([src/utils/url.ts](../src/utils/url.ts)) that:

1. **Automatically prefixes internal links** with the base path
2. **Leaves external links unchanged** (http://, https://, mailto:, etc.)
3. **Handles active link detection** regardless of base path
4. **Generates correct canonical URLs** and metadata

### Components with Base Path Support

All link components automatically handle base paths:

- **ButtonLink**: Styled button links in CTAs and sections
- **Navigation**: Header navigation menu
- **LanguageSwitcher**: Language toggle component
- **Footer**: Footer links
- **Header**: Logo link

Example - ButtonLink automatically resolves paths:

```astro
<!-- In your content or component -->
<ButtonLink href="/fr/events">
  Voir les événements
</ButtonLink>

<!-- Renders as (root deployment): -->
<a href="/fr/events">...</a>

<!-- Renders as (subfolder deployment /my-repo/): -->
<a href="/my-repo/fr/events">...</a>
```

### Active Link Detection

Navigation automatically highlights the current page, correctly handling:

- **Exact match** for home pages (`/`, `/fr/`, `/en/`)
- **Prefix match** for other routes (e.g., `/fr/events` matches `/fr/events/detail`)
- **Base path normalization** for accurate comparison

## Content Guidelines

### Writing Links in Content Files

**Rule: Always use relative paths in content files (JSON, Markdown)**

In `src/content/sections/*.json`:

```json
{
  "button": {
    "text": "Register Now",
    "href": "/en/events"
  }
}
```

✅ **DO**: Use relative paths like `/en/events`, `/fr/partners`
❌ **DON'T**: Include base path like `/my-repo/en/events`
❌ **DON'T**: Include repository name in content files

**Why?** Components automatically resolve these paths with the configured base path. This keeps your content portable across different deployments.

### External Links

External links work as expected - no modifications needed:

```json
{
  "href": "https://example.com"
}
```

## Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Manual Deployment

1. Build the site:
```bash
pnpm build
```

2. Deploy the `dist` folder to GitHub Pages:
   - Via GitHub Actions (recommended)
   - Via GitHub Desktop
   - Via command line: `git subtree push --prefix dist origin gh-pages`

## Testing

### Test with Different Base Paths

The template includes comprehensive tests for base path handling.

#### 1. Unit Tests (URL Utilities)

Test URL resolution logic:

```bash
pnpm test
```

Tests cover:
- Base path normalization
- URL building (root vs subfolder)
- Active link detection
- External URL handling

#### 2. E2E Tests (Navigation)

Test actual navigation behavior:

```bash
# Start preview server
pnpm build && pnpm preview

# Run E2E tests (in another terminal)
pnpm test:e2e
```

Tests cover:
- Navigation between pages
- Language switching
- Active link highlighting
- Mobile menu functionality

#### 3. Manual Testing

Test locally with different base paths:

**Root deployment:**
```js
// astro.config.mjs
base: '/',
```
```bash
pnpm build && pnpm preview
# Visit http://localhost:4321/
```

**Subfolder deployment:**
```js
// astro.config.mjs
base: '/test-repo/',
```
```bash
pnpm build && pnpm preview --base /test-repo
# Visit http://localhost:4321/test-repo/
```

## Troubleshooting

### Links Not Working After Deployment

**Symptom**: Clicking links results in 404 errors

**Solution**: Check your `base` configuration in `astro.config.mjs`:
- If deployed at root: `base: '/'`
- If deployed in subfolder: `base: '/repo-name/'` (with trailing slash)

### Styles or Images Not Loading

**Symptom**: CSS or images return 404 errors

**Solution**: Ensure `base` is set correctly. Astro automatically handles asset paths when `base` is configured.

### Active Link Not Highlighting

**Symptom**: Current page not highlighted in navigation

**Solution**: This is handled automatically. If issues persist:
1. Check that `currentPath` is passed to Navigation component
2. Verify the Header component passes `Astro.url.pathname`
3. Check browser console for errors

### Language Switcher Not Working

**Symptom**: Language switcher doesn't navigate correctly

**Solution**: Verify `alternateUrls` are defined in page frontmatter:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';

// Define alternate language versions (relative paths)
const alternateUrls = {
  fr: '/fr/',
  en: '/en/'
};
---

<BaseLayout
  lang="fr"
  alternateUrls={alternateUrls}
  ...
>
```

### Testing Locally with Subfolder Base

**Symptom**: Local preview doesn't respect base path

**Solution**: Use the `--base` flag with preview:

```bash
pnpm build && pnpm preview --base /my-repo
```

Or use the dev server (it automatically handles base):

```bash
pnpm dev
```

## Advanced Topics

### Multi-Brand Deployments

When duplicating this template for multiple brands:

1. Clone the repository with a new name
2. Update `astro.config.mjs` with the new repository name:
```js
base: '/new-brand-repo/'
```

3. Update content in `src/content/`
4. Deploy to new GitHub repository

Each brand deployment is independent and maintains its own base path configuration.

### Custom Domain Setup

When using a custom domain:

1. Configure your domain in GitHub repository settings
2. Update `astro.config.mjs`:
```js
site: 'https://yourdomain.com',
base: '/',
```

3. Add a `public/CNAME` file with your domain:
```
yourdomain.com
```

## Support

For issues or questions:

- Check the [tests](../tests/) for usage examples
- Review the [URL utilities](../src/utils/url.ts) source code
- Open an issue in the repository

---

**Template Philosophy**: Simplicity, minimalism, no over-engineering. This base path system is designed to be transparent - write your content naturally, and the template handles deployment complexity.
