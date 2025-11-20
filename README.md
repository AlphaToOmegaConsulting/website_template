# Astro Minimal Multi-Brand Template

A minimal, multi-brand static website template built with Astro, TypeScript, and Tailwind CSS.

This template uses a **minimal token system** with just 10 CSS variables, making it extremely easy to customize for different brands while maintaining a clean, simple architecture.

## Features

- **Minimal Token System**: Only 10 CSS variables to define your brand
- **Multi-Brand Ready**: Duplicate and customize by changing one file
- **GitHub Pages Ready**: Native support for root and subfolder deployment
- **IA-Friendly**: Simple, predictable code structure
- **TypeScript Strict**: Type-safe throughout
- **i18n Ready**: Built-in French/English support
- **Accessible**: Focus on a11y best practices
- **SEO Optimized**: Meta tags, sitemap, hreflang
- **Modern Stack**: Astro 5, Tailwind CSS 4, TypeScript 5

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start development server

```bash
pnpm dev
```

Visit http://localhost:4321

### 3. Build for production

```bash
pnpm build
```

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── primitives/        # 5 base UI components
│   │   │   ├── Button.astro
│   │   │   ├── ButtonLink.astro
│   │   │   ├── Card.astro
│   │   │   ├── Dialog.astro
│   │   │   └── Input.astro
│   │   ├── sections/          # 6 page sections
│   │   │   ├── Hero.astro
│   │   │   ├── Features.astro
│   │   │   ├── CTA.astro
│   │   │   ├── Events.astro
│   │   │   ├── About.astro
│   │   │   └── Team.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   └── LanguageSwitcher.astro
│   ├── content/               # Content Collections
│   │   ├── config.ts          # Schemas (pragmatic z.any())
│   │   ├── events/            # Event markdown files
│   │   ├── pages/             # Page content
│   │   └── sections/          # Section configurations
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Main layout with SEO
│   │   └── SectionLayout.astro # Section wrapper
│   ├── pages/
│   │   ├── en/                # English pages
│   │   ├── fr/                # French pages
│   │   └── index.astro        # Root redirect
│   ├── styles/
│   │   ├── tokens.css         # 10 CSS variables (ONLY FILE TO EDIT FOR NEW BRAND)
│   │   └── global.css         # Global styles + Tailwind
│   └── utils/
│       ├── date-formatter.ts
│       └── url.ts             # Base path utilities (GitHub Pages)
├── docs/                      # 📚 All documentation (see docs/README.md)
│   ├── README.md              # Documentation index
│   ├── MULTI_BRAND_GUIDE.md   # Multi-brand setup guide
│   ├── DEVELOPMENT.md         # Development workflow
│   ├── GITHUB_PAGES_DEPLOYMENT.md  # Deployment guide
│   └── ...                    # Technical docs & analyses
├── public/                    # Static assets
├── scripts/                   # Testing scripts
├── tests/                     # E2E and unit tests
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## The Minimal Token System

The entire visual identity is defined by **10 CSS variables** in `src/styles/tokens.css`:

```css
:root {
  /* BRAND COLORS (5 tokens) */
  --brand-primary: #334155;
  --brand-primary-hover: #1e293b;
  --brand-secondary: #64748b;
  --brand-accent: #3b82f6;
  --brand-accent-hover: #2563eb;

  /* NEUTRAL COLORS (4 tokens) */
  --color-text: #1a1a1a;
  --color-text-muted: #64748b;
  --color-bg: #ffffff;
  --color-bg-alt: #f8fafc;

  /* VISUAL EFFECTS (2 tokens) */
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --radius: 0.5rem;
}
```

### Brand Classes

The template provides 9 utility classes based on these tokens:

```css
/* Text colors */
.text-brand-primary
.text-brand-secondary
.text-brand-accent

/* Background colors */
.bg-brand-primary
.bg-brand-secondary
.bg-brand-accent

/* Border colors */
.border-brand-primary
.border-brand-secondary
.border-brand-accent
```

## Creating a New Brand

See [docs/MULTI_BRAND_GUIDE.md](docs/MULTI_BRAND_GUIDE.md) for detailed instructions.

**Quick version:**

1. Copy the entire project to a new folder
2. Edit `src/styles/tokens.css` (change 3-5 colors)
3. Update `astro.config.mjs` (site URL)
4. Update `package.json` (name)
5. Build: `pnpm build`

**That's it!** Your new brand is ready.

## Available Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:4321)
pnpm build            # Build for production
pnpm preview          # Preview production build

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm typecheck        # TypeScript type checking

# Testing
pnpm test             # Run unit tests (Vitest)
pnpm test:e2e         # Run E2E tests (Playwright)
pnpm lighthouse       # Run Lighthouse audit
pnpm a11y-audit       # Run accessibility audit
pnpm check-links      # Check for broken links
```

## Content Collections

This template uses Astro Content Collections with **pragmatic validation**:

### Pages Collection

```typescript
// src/content/pages/en/home.md
---
title: "Home"
description: "Welcome to our website"
lang: "en"
publishDate: 2024-01-01
---
```

### Events Collection

```typescript
// src/content/events/en/conference-2024.md
---
title: "Tech Conference 2024"
date: 2024-06-15
location: "Paris, France"
lang: "en"
tags: ["conference", "tech"]
featured: true
---
```

### Sections Collection

```json
// src/content/sections/hero-home.json
{
  "type": "hero",
  "order": 1,
  "visible": true,
  "data": {
    "title": "Welcome",
    "subtitle": "Build amazing things",
    "cta": {
      "text": "Get Started",
      "url": "/en/events"
    }
  }
}
```

**Note**: Sections use `z.any()` for the `data` field, providing maximum flexibility without over-engineering validation.

## Component Architecture

### Primitives (5 components)

Low-level, reusable UI components:
- `Button.astro` - Interactive button (3 variants)
- `ButtonLink.astro` - Link styled as button (3 variants)
- `Card.astro` - Content container (3 variants)
- `Dialog.astro` - Modal dialog with a11y
- `Input.astro` - Form input with validation

### Sections (6 components)

High-level page sections:
- `Hero.astro` - Hero section (2 layouts)
- `Features.astro` - Feature grid/list
- `CTA.astro` - Call-to-action (2 variants)
- `Events.astro` - Event listing (collection-aware)
- `About.astro` - About section with stats
- `Team.astro` - Team member grid

## Styling Philosophy

This template follows a **minimal brand + Tailwind** approach:

✅ **DO**: Use brand classes for brand colors
```astro
<h1 class="text-brand-primary">Title</h1>
<button class="bg-brand-accent hover:bg-blue-700">Click</button>
```

✅ **DO**: Use Tailwind classes for everything else
```astro
<div class="container mx-auto px-4 py-16">
  <p class="text-xl text-gray-600 mb-8">Content</p>
</div>
```

❌ **DON'T**: Create semantic abstraction layers
```astro
<!-- BAD: Over-engineered -->
<div class="section-bg elevation-md text-primary">
```

## i18n (Internationalization)

The template supports multiple languages through:

1. **URL Structure**: `/en/` and `/fr/` routes
2. **Content Collections**: Filtered by `lang` field
3. **hreflang Links**: Automatic alternate language links
4. **Language Switcher**: Component in header

To add a new language:

1. Create new route folder: `src/pages/es/`
2. Add content with `lang: "es"` in frontmatter
3. Update `BaseLayout.astro` alternateUrls
4. Add locale to `astro.config.mjs` sitemap

## SEO Features

- Meta tags (title, description, OG, Twitter)
- Sitemap generation with i18n
- hreflang alternate links
- Semantic HTML structure
- Focus on Core Web Vitals
- Lighthouse CI configured

## Accessibility

- Focus ring on all interactive elements
- ARIA labels where needed
- Semantic HTML
- Color contrast compliance
- Keyboard navigation support
- Screen reader friendly
- `a11y-audit` script included

## Testing

### Unit Tests (Vitest)
```bash
pnpm test
```

### E2E Tests (Playwright)
```bash
pnpm test:e2e
```

### Lighthouse Audit
```bash
pnpm lighthouse
```

### Accessibility Audit
```bash
pnpm a11y-audit
```

## TypeScript Configuration

Strict mode enabled with Astro defaults:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- Full type safety across the codebase

## Documentation

All documentation is organized in the **`docs/`** folder:

- 📖 **[docs/README.md](docs/README.md)** - Documentation index and navigation guide
- 🚀 **[docs/MULTI_BRAND_GUIDE.md](docs/MULTI_BRAND_GUIDE.md)** - How to create new brands
- 🔧 **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Development workflow and tools
- 🌐 **[docs/GITHUB_PAGES_DEPLOYMENT.md](docs/GITHUB_PAGES_DEPLOYMENT.md)** - GitHub Pages deployment
- 📘 **[docs/alpha_web_core_stack_v2.md](docs/alpha_web_core_stack_v2.md)** - Complete technical documentation

For a complete list of all documentation files, see **[docs/README.md](docs/README.md)**.

## Deployment

This template builds to static files (`output: 'static'`). Deploy to:

- **GitHub Pages**: Native support for root and subfolder deployment. See [GitHub Pages Deployment Guide](docs/GITHUB_PAGES_DEPLOYMENT.md)
- **Vercel**: Zero config, connect Git repo
- **Netlify**: Zero config, drag & drop `dist/` folder
- **Cloudflare Pages**: Connect Git repo
- **Any static host**: Upload `dist/` folder

### GitHub Pages Configuration

The template includes automatic base path handling for GitHub Pages deployment:

**Root deployment (custom domain):**
```js
// astro.config.mjs
base: '/'
```

**Subfolder deployment (repository pages):**
```js
// astro.config.mjs
base: '/repository-name/'
```

All internal links are automatically resolved with the configured base path. See the [full documentation](docs/GITHUB_PAGES_DEPLOYMENT.md) for details.

## Why This Template?

### ✅ Minimal
- 10 tokens (vs 50+ in complex systems)
- 1 token file (vs 6+ files)
- Simple architecture (no over-engineering)

### ✅ Multi-Brand
- Duplicate project + change 1 file = new brand
- No runtime theme switching complexity
- Clear separation of concerns

### ✅ IA-Friendly
- Predictable code structure
- Pragmatic validation (`z.any()` where needed)
- Clear naming conventions
- No abstraction layers

### ✅ Production-Ready
- TypeScript strict mode
- ESLint + Prettier configured
- Tests (Vitest + Playwright)
- Lighthouse + a11y audits
- SEO optimized

## Getting Started

1. **First time?** Read this README for an overview
2. **Want to customize?** See [docs/MULTI_BRAND_GUIDE.md](docs/MULTI_BRAND_GUIDE.md)
3. **Ready to develop?** Check [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
4. **Need to deploy?** Follow [docs/GITHUB_PAGES_DEPLOYMENT.md](docs/GITHUB_PAGES_DEPLOYMENT.md)
5. **Want all the details?** Browse [docs/](docs/) folder

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
