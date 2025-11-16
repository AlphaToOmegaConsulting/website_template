# Theme Migration Guide

Complete guide for migrating from the Alpha WebCore template to a custom theme or updating an existing branded site.

## Table of Contents

1. [Overview](#overview)
2. [Quick Migration (10 Minutes)](#quick-migration-10-minutes)
3. [Full Customization](#full-customization)
4. [Common Scenarios](#common-scenarios)
5. [Advanced Customization](#advanced-customization)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The Alpha WebCore v3 template uses a **minimal token system** with just 10 CSS variables, making theme migration straightforward:

- **10 CSS variables** in `src/styles/tokens.css`
- **Brand classes** automatically generated from tokens
- **Tailwind integration** for spacing and utilities
- **Zero runtime cost** - all tokens compiled at build time

---

## Quick Migration (10 Minutes)

### Step 1: Update Brand Colors

Edit `src/styles/tokens.css`:

```css
:root {
  /* BRAND COLORS - Change these 5 tokens */
  --brand-primary: #1e40af;        /* Your primary color */
  --brand-primary-hover: #1e3a8a;  /* Darker shade */
  --brand-secondary: #64748b;      /* Secondary color */
  --brand-accent: #f59e0b;         /* Accent color (CTAs, highlights) */
  --brand-accent-hover: #d97706;   /* Darker shade */

  /* NEUTRAL COLORS - Usually keep these */
  --color-text: #1a1a1a;
  --color-text-muted: #64748b;
  --color-bg: #ffffff;
  --color-bg-alt: #f8fafc;

  /* VISUAL EFFECTS - Optional customization */
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --radius: 0.5rem;
}
```

### Step 2: Update Site Configuration

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: 'Your Company Name',
  description: 'Your company description',
  url: 'https://yourcompany.com',
  ogImage: '/og-default.jpg', // Update this image
  links: {
    twitter: 'https://twitter.com/yourcompany',
    github: 'https://github.com/yourcompany',
    linkedin: 'https://linkedin.com/company/yourcompany',
  },
};
```

### Step 3: Update Translations

Edit `src/config/i18n.ts`:

```typescript
export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      // ... customize labels
    },
    footer: {
      companyName: 'Your Company',
      tagline: 'Your tagline',
      // ... customize footer text
    },
  },
  fr: {
    // ... French translations
  },
};
```

### Step 4: Update Content

Edit JSON files in `src/content/sections/`:

```json
// src/content/sections/hero-home.json
{
  "type": "hero",
  "order": 1,
  "visible": true,
  "data": {
    "title": "Your Hero Title",
    "subtitle": "Your hero subtitle",
    "cta": {
      "label": "Get Started",
      "href": "/signup",
      "variant": "primary"
    }
  }
}
```

### Step 5: Build and Deploy

```bash
pnpm build
pnpm preview  # Preview locally
```

**Done!** Your theme is migrated.

---

## Full Customization

### Logo and Branding

#### Replace Logo

1. **Add your logo image** to `public/logo.svg` or `public/logo.png`

2. **Update Header component** (`src/components/Header.astro`):

```astro
<!-- Replace text logo with image -->
<a href={buildUrl('/' + currentLang)} class="flex items-center gap-2">
  <img src="/logo.svg" alt={siteConfig.name} class="h-8 w-auto" />
  <span class="font-bold text-xl text-brand-primary">{siteConfig.name}</span>
</a>
```

#### Custom Favicon

Replace files in `public/`:
- `favicon.svg` - Modern browsers
- `favicon.ico` - Legacy browsers
- `apple-touch-icon.png` - iOS devices

### Typography

#### Add Custom Fonts

1. **Add font files** to `public/fonts/` or use a font service

2. **Update `global.css`**:

```css
/* Add @font-face or import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

/* Update font family in tailwind.config.mjs */
```

3. **Update `tailwind.config.mjs`**:

```javascript
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

### Extended Token System

For more complex themes, extend the token system:

#### Add New Tokens

Edit `src/styles/tokens.css`:

```css
:root {
  /* Existing tokens... */

  /* Extended color system */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Extended spacing */
  --spacing-section: 6rem;
  --spacing-container: 1.5rem;

  /* Extended typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;

  /* Extended shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Extended radius */
  --radius-sm: 0.25rem;
  --radius: 0.5rem;
  --radius-lg: 1rem;
}

/* Utility classes */
.text-success { color: var(--color-success); }
.text-warning { color: var(--color-warning); }
.text-error { color: var(--color-error); }
.text-info { color: var(--color-info); }

.bg-success { background-color: var(--color-success); }
.bg-warning { background-color: var(--color-warning); }
.bg-error { background-color: var(--color-error); }
.bg-info { background-color: var(--color-info); }
```

#### Expose Tokens to Tailwind

Update `tailwind.config.mjs`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          'primary-hover': 'var(--brand-primary-hover)',
          secondary: 'var(--brand-secondary)',
          accent: 'var(--brand-accent)',
          'accent-hover': 'var(--brand-accent-hover)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        lg: 'var(--shadow-lg)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
      },
    },
  },
};
```

---

## Common Scenarios

### Scenario 1: Corporate Rebrand

**Goal**: Update all colors and logo to match new brand guidelines.

**Steps**:
1. Extract brand colors from brand guidelines
2. Update `tokens.css` with new colors
3. Replace logo files in `public/`
4. Update `siteConfig.name` and metadata
5. Test across all pages

**Time**: ~30 minutes

### Scenario 2: Dark Mode Support

**Goal**: Add dark mode toggle.

**Steps**:

1. **Add dark mode tokens** in `tokens.css`:

```css
:root {
  /* Light mode (default) */
  --brand-primary: #1e40af;
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
}

[data-theme="dark"] {
  /* Dark mode overrides */
  --brand-primary: #60a5fa;
  --color-bg: #0f172a;
  --color-text: #f8fafc;
}
```

2. **Add theme toggle** to `Header.astro`:

```astro
<button
  id="theme-toggle"
  class="p-2 rounded-lg hover:bg-gray-100"
  aria-label="Toggle theme"
>
  <span class="dark:hidden">🌙</span>
  <span class="hidden dark:inline">☀️</span>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  toggle?.addEventListener('click', () => {
    const current = html.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('theme', next);
  });

  // Load saved theme
  const saved = localStorage.getItem('theme');
  if (saved) html.dataset.theme = saved;
</script>
```

3. **Update Tailwind config** for dark mode:

```javascript
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  // ... rest of config
};
```

**Time**: ~1 hour

### Scenario 3: Multi-Brand Template

**Goal**: Maintain multiple branded sites from one codebase.

**Approach**:

1. **Create brand-specific token files**:

```
src/styles/
  ├── tokens.css (default)
  ├── tokens-brand-a.css
  └── tokens-brand-b.css
```

2. **Use environment variables** to switch:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

const brand = process.env.BRAND || 'default';

export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/tokens-${brand}.css";`,
        },
      },
    },
  },
});
```

3. **Build for each brand**:

```bash
BRAND=brand-a pnpm build
BRAND=brand-b pnpm build
```

**Time**: Initial setup ~2 hours, then automated

---

## Advanced Customization

### Custom Components

Create custom sections in `src/components/sections/`:

```astro
---
// CustomHero.astro
interface Props {
  title: string;
  customProp?: string;
}

const { title, customProp } = Astro.props;
---

<section class="py-24 bg-gradient-to-r from-brand-primary to-brand-accent">
  <div class="container mx-auto px-4">
    <h1 class="text-5xl font-bold text-white">{title}</h1>
    {customProp && <p class="text-white/90">{customProp}</p>}
  </div>
</section>
```

### Custom Layouts

Create alternative layouts in `src/layouts/`:

```astro
---
// AlternativeLayout.astro
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
}
---

<BaseLayout title={Astro.props.title}>
  <div class="custom-layout">
    <aside class="sidebar">
      <!-- Sidebar content -->
    </aside>
    <main class="main-content">
      <slot />
    </main>
  </div>
</BaseLayout>
```

### Override Primitives

To customize a primitive without breaking the original:

1. **Copy the primitive** to a new file:
```bash
cp src/components/primitives/Button.astro src/components/custom/CustomButton.astro
```

2. **Modify as needed**

3. **Import the custom version** in your pages:
```astro
import Button from '@/components/custom/CustomButton.astro';
```

---

## Troubleshooting

### Colors Not Updating

**Issue**: Changed tokens.css but colors stay the same.

**Solutions**:
1. Hard refresh browser (Cmd/Ctrl + Shift + R)
2. Clear `.astro` cache: `rm -rf .astro && pnpm dev`
3. Check CSS variable syntax (must use `var(--token-name)`)

### Logo Not Displaying

**Issue**: Logo image not showing.

**Solutions**:
1. Verify file path is correct (relative to `public/`)
2. Check file permissions
3. Ensure file format is supported (SVG, PNG, JPG)
4. Clear browser cache

### Fonts Not Loading

**Issue**: Custom fonts not rendering.

**Solutions**:
1. Check font file paths
2. Verify `@font-face` syntax
3. Ensure fonts are in `public/fonts/` or properly imported
4. Check browser console for 404 errors
5. Add `font-display: swap` to prevent FOIT

### Build Errors

**Issue**: Build fails after theme changes.

**Solutions**:
1. Check for syntax errors in CSS/TypeScript
2. Validate JSON files in `src/content/`
3. Run `pnpm typecheck` to find TypeScript errors
4. Check Astro logs for specific error messages

---

## Migration Checklist

Use this checklist when migrating:

- [ ] Update brand colors in `tokens.css`
- [ ] Update site config (`siteConfig` in `src/config/site.ts`)
- [ ] Update translations (`src/config/i18n.ts`)
- [ ] Replace logo files
- [ ] Update favicon
- [ ] Update OG image (`public/og-default.jpg`)
- [ ] Update content sections (`src/content/sections/*.json`)
- [ ] Update events content if applicable
- [ ] Update page metadata (titles, descriptions)
- [ ] Test all pages (home, about, events, etc.)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test accessibility (keyboard navigation, screen reader)
- [ ] Run build: `pnpm build`
- [ ] Run tests: `pnpm test && pnpm test:e2e`
- [ ] Deploy to staging
- [ ] Final QA
- [ ] Deploy to production

---

## Best Practices

### ✅ DO

- Keep tokens minimal (only add what you need)
- Use semantic color names (`--brand-primary`, not `--blue-500`)
- Test across different screen sizes
- Document custom tokens
- Version control your token files
- Test accessibility after color changes

### ❌ DON'T

- Don't hardcode colors in components
- Don't add too many token variations
- Don't skip testing after changes
- Don't forget to update OG images and favicons
- Don't modify primitive components directly (copy and extend instead)

---

## Resources

- **Token System**: [tokens.css](../src/styles/tokens.css)
- **Site Config**: [site.ts](../src/config/site.ts)
- **Translations**: [i18n.ts](../src/config/i18n.ts)
- **Primitives**: [PRIMITIVES.md](./PRIMITIVES.md)
- **Sections**: [SECTIONS.md](./SECTIONS.md)
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Astro Docs**: https://docs.astro.build

---

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review [Common Scenarios](#common-scenarios)
- Open an issue on GitHub
