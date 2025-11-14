# Design Document

## Overview

Ce document décrit l'architecture et le design d'un site web multilingue statique construit avec Astro, TypeScript et Tailwind CSS. Le système adopte une approche component-driven avec un monorepo pnpm, des Content Collections typées, et un design system minimal mais extensible.

### Key Design Principles

- **Static-first**: Génération de pages statiques pour des performances optimales
- **Type-safe**: TypeScript strict avec validation Zod pour tous les contenus
- **Accessible**: Composants conformes WCAG AA avec support clavier et ARIA
- - **Progressive Enhancement**: Fonctionnalités de base sans JavaScript client
- **Content-driven**: Séparation claire entre contenu (Markdown/JSON) et présentation (composants)
- **Modular**: Architecture en sections réutilisables pour faciliter la composition

## Architecture

### Monorepo Structure

```
/
├── apps/
│   └── website/                 # Application Astro principale
│       ├── src/
│       │   ├── components/
│       │   │   ├── primitives/  # Button, Card, Input, etc.
│       │   │   └── sections/    # Hero, About, Features, etc.
│       │   ├── content/
│       │   │   ├── config.ts    # Schémas Zod
│       │   │   ├── pages/       # Content collections pages
│       │   │   ├── sections/    # Content collections sections
│       │   │   ├── events/      # Content collections events
│       │   │   └── data/        # Data collections (JSON)
│       │   ├── layouts/
│       │   │   ├── BaseLayout.astro
│       │   │   └── SectionLayout.astro
│       │   ├── pages/
│       │   │   ├── fr/          # Pages françaises
│       │   │   └── en/          # Pages anglaises
│       │   └── styles/
│       │       └── global.css   # Tailwind imports + tokens
│       ├── public/
│       ├── astro.config.mjs
│       ├── tailwind.config.mjs
│       └── tsconfig.json
├── packages/                    # Packages partagés (futurs)
├── pnpm-workspace.yaml
└── package.json
```

### Technology Stack

- **Build Tool**: Astro 4.x (SSG mode)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 3.x
- **Validation**: Zod 3.x
- **Package Manager**: pnpm 8.x avec workspaces
- **Accessibility**: Radix UI primitives (code copié, pas de runtime dependency)
- **Testing**: Vitest pour les tests unitaires, Playwright pour E2E (optionnel)
- **Linting**: ESLint + Prettier

## Components and Interfaces

### Design System Primitives

#### Button Component

```typescript
// src/components/primitives/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}
```

**Design Decisions:**
- Utilise les classes Tailwind pour les variants
- Support du disabled state avec aria-disabled
- Pas de JavaScript requis pour le rendu de base
- Classes composables via la prop `class`

#### Card Component

```typescript
// src/components/primitives/Card.astro
interface Props {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  class?: string;
}
```

**Design Decisions:**
- Container flexible avec slot pour le contenu
- Variants basés sur les ombres et bordures Tailwind
- Responsive par défaut

#### Input Component

```typescript
// src/components/primitives/Input.astro
interface Props {
  type?: 'text' | 'email' | 'password' | 'number';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  class?: string;
}
```

**Design Decisions:**
- Label toujours visible (pas de placeholder-only)
- Support des états error avec aria-invalid et aria-describedby
- Focus visible avec ring Tailwind

#### Dialog Component (Radix-inspired)

```typescript
// src/components/primitives/Dialog.astro
interface Props {
  id: string;
  title: string;
  description?: string;
  triggerLabel: string;
}
```

**Design Decisions:**
- Code copié de shadcn/ui (Radix patterns)
- Utilise dialog HTML natif avec polyfill si nécessaire
- Gestion du focus trap et ESC key
- aria-labelledby et aria-describedby pour l'accessibilité

### Section Components

#### Hero Section

```typescript
// src/components/sections/Hero.astro
interface Props {
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  image?: {
    src: string;
    alt: string;
  };
  background?: 'default' | 'gradient' | 'image';
}
```

#### About Section

```typescript
// src/components/sections/About.astro
interface Props {
  title: string;
  content: string; // Markdown supporté
  image?: {
    src: string;
    alt: string;
    position?: 'left' | 'right';
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
}
```

#### Features Section

```typescript
// src/components/sections/Features.astro
interface Props {
  title: string;
  subtitle?: string;
  features: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  layout?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}
```

#### Events Section

```typescript
// src/components/sections/Events.astro
interface Props {
  title: string;
  events: Array<{
    id: string;
    title: string;
    date: Date;
    location: string;
    description: string;
    link?: string;
  }>;
  displayMode?: 'upcoming' | 'past' | 'all';
  limit?: number;
}
```

#### CTA Section

```typescript
// src/components/sections/CTA.astro
interface Props {
  title: string;
  description?: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  background?: 'default' | 'accent' | 'gradient';
}
```

### Layouts

#### BaseLayout

```typescript
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description: string;
  lang: 'fr' | 'en';
  alternateUrls?: {
    fr?: string;
    en?: string;
  };
  ogImage?: string;
  noindex?: boolean;
}
```

**Responsibilities:**
- HTML structure de base (html, head, body)
- Meta tags (title, description, OG, Twitter)
- hreflang links pour i18n
- Header et Footer globaux
- Scripts globaux (analytics, etc.)

#### SectionLayout

```typescript
// src/layouts/SectionLayout.astro
interface Props {
  width?: 'narrow' | 'default' | 'wide' | 'full';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: string; // Tailwind class
  class?: string;
}
```

**Responsibilities:**
- Container avec max-width responsive
- Padding vertical et horizontal
- Grille responsive si nécessaire

## Data Models

### Content Collections Schemas

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Page Collection
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['fr', 'en']),
    publishDate: z.date(),
    updateDate: z.date().optional(),
    draft: z.boolean().default(false),
    seo: z.object({
      ogImage: z.string().optional(),
      noindex: z.boolean().default(false),
    }).optional(),
  }),
});

// Section Collection
const sectionsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    type: z.enum(['hero', 'about', 'features', 'events', 'cta']),
    order: z.number(),
    visible: z.boolean().default(true),
    data: z.record(z.any()), // Flexible data per section type
  }),
});

// Event Collection
const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    location: z.string(),
    description: z.string(),
    lang: z.enum(['fr', 'en']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    registrationUrl: z.string().url().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  sections: sectionsCollection,
  events: eventsCollection,
};
```

### Data Collections

```typescript
// src/content/data/authors.json
[
  {
    "id": "john-doe",
    "name": "John Doe",
    "role": "Developer",
    "avatar": "/images/authors/john-doe.jpg",
    "bio": "...",
    "social": {
      "twitter": "johndoe",
      "github": "johndoe"
    }
  }
]

// Schema in config.ts
const authorsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    avatar: z.string(),
    bio: z.string(),
    social: z.object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
  }),
});
```

## Internationalization Strategy

### Approach: Duplicated Routes

**Rationale**: Pour un site avec 2 langues et un nombre limité de pages, la duplication d'arborescence est plus simple que le routing i18n dynamique. Cela évite la complexité runtime et facilite le SEO.

### Implementation

```
src/pages/
├── fr/
│   ├── index.astro           # /fr/
│   ├── twt/
│   │   └── landing.astro     # /fr/twt/landing
│   ├── events/
│   │   └── index.astro       # /fr/events
│   └── partners/
│       └── index.astro       # /fr/partners
└── en/
    ├── index.astro           # /en/
    ├── twt/
    │   └── landing.astro     # /en/twt/landing
    ├── events/
    │   └── index.astro       # /en/events
    └── partners/
        └── index.astro       # /en/partners
```

### Content Organization

```
src/content/
├── pages/
│   ├── fr/
│   │   ├── home.md
│   │   └── about.md
│   └── en/
│       ├── home.md
│       └── about.md
├── events/
│   ├── fr/
│   │   └── event-1.md
│   └── en/
│       └── event-1.md
```

### hreflang Implementation

```astro
---
// Dans BaseLayout.astro
const { alternateUrls } = Astro.props;
---
<head>
  {alternateUrls?.fr && (
    <link rel="alternate" hreflang="fr" href={alternateUrls.fr} />
  )}
  {alternateUrls?.en && (
    <link rel="alternate" hreflang="en" href={alternateUrls.en} />
  )}
  <link rel="alternate" hreflang="x-default" href={alternateUrls?.fr || alternateUrls?.en} />
</head>
```

### Language Switcher Component

```typescript
// src/components/LanguageSwitcher.astro
interface Props {
  currentLang: 'fr' | 'en';
  alternateUrls: {
    fr?: string;
    en?: string;
  };
}
```

## Styling System

### Tailwind Configuration

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#...',
          // ... palette complète
          900: '#...',
        },
        secondary: { /* ... */ },
        accent: { /* ... */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        section: {
          sm: '3rem',
          md: '5rem',
          lg: '7rem',
          xl: '10rem',
        },
      },
      maxWidth: {
        narrow: '640px',
        default: '1024px',
        wide: '1280px',
      },
    },
  },
  plugins: [],
};
```

### Design Tokens

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 0.5rem;
    --focus-ring: 2px solid theme('colors.primary.500');
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  .focus-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2;
  }
}
```

## Error Handling

### Build-time Validation

- **Content Collections**: Zod valide tous les frontmatters au build
- **TypeScript**: Mode strict détecte les erreurs de types
- **Dead Links**: Script custom vérifie les liens internes

```typescript
// scripts/check-links.ts
// Parcourt toutes les pages buildées et vérifie les liens internes
```

### Runtime Error Handling

- **404 Pages**: Pages 404 personnalisées par langue (`/fr/404.astro`, `/en/404.astro`)
- **Image Loading**: Attributs `loading="lazy"` et fallbacks pour images manquantes
- **Form Validation**: Validation HTML5 native + messages d'erreur accessibles

### Development Experience

```typescript
// astro.config.mjs
export default defineConfig({
  // Fail fast en dev si erreur de contenu
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Traiter les warnings comme des erreurs en CI
          if (process.env.CI && warning.code === 'UNUSED_EXTERNAL_IMPORT') {
            throw new Error(warning.message);
          }
          warn(warning);
        },
      },
    },
  },
});
```

## Testing Strategy

### Unit Tests (Vitest)

**Scope**: Fonctions utilitaires, helpers, transformations de données

```typescript
// src/utils/__tests__/date-formatter.test.ts
import { describe, it, expect } from 'vitest';
import { formatEventDate } from '../date-formatter';

describe('formatEventDate', () => {
  it('formats date in French locale', () => {
    const date = new Date('2024-03-15');
    expect(formatEventDate(date, 'fr')).toBe('15 mars 2024');
  });
});
```

### Component Tests (Vitest + Testing Library)

**Scope**: Composants primitifs avec logique (si JavaScript client)

```typescript
// src/components/primitives/__tests__/Button.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/astro';
import Button from '../Button.astro';

describe('Button', () => {
  it('renders with correct variant classes', () => {
    const { container } = render(Button, {
      props: { variant: 'primary' },
      slots: { default: 'Click me' },
    });
    expect(container.querySelector('button')).toHaveClass('bg-primary-500');
  });
});
```

### E2E Tests (Playwright) - Optionnel

**Scope**: Parcours utilisateur critiques, navigation, formulaires

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate between pages', async ({ page }) => {
  await page.goto('/fr/');
  await page.click('a[href="/fr/events"]');
  await expect(page).toHaveURL('/fr/events');
  await expect(page.locator('h1')).toContainText('Événements');
});
```

### Accessibility Tests

**Scope**: Tous les composants et pages

```typescript
// tests/a11y/primitives.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('Button component has no a11y violations', async ({ page }) => {
  await page.goto('/storybook/button'); // ou page de test
  await injectAxe(page);
  await checkA11y(page);
});
```

### Visual Regression Tests - Optionnel

**Scope**: Composants du design system

```typescript
// tests/visual/primitives.spec.ts
import { test, expect } from '@playwright/test';

test('Button variants match snapshots', async ({ page }) => {
  await page.goto('/storybook/button');
  await expect(page).toHaveScreenshot('button-variants.png');
});
```

### Performance Tests

**Scope**: Pages principales

```typescript
// scripts/lighthouse-ci.ts
// Exécute Lighthouse sur les pages principales
// Vérifie scores > 95 pour Performance, Accessibility, Best Practices, SEO
```

## Build and Deployment

### Build Process

```bash
# Development
pnpm -w run dev          # Lance le dev server

# Production build
pnpm -w run build        # Build statique dans dist/
pnpm -w run preview      # Preview du build

# Quality checks
pnpm -w run lint         # ESLint
pnpm -w run format       # Prettier
pnpm -w run typecheck    # TypeScript
pnpm -w run test         # Vitest
pnpm -w run test:e2e     # Playwright
```

### CI Pipeline

```yaml
# .github/workflows/ci.yml (exemple)
name: CI
on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      - run: pnpm -w run lint
      - run: pnpm -w run typecheck
      - run: pnpm -w run test
      - run: pnpm -w run build
      - run: pnpm -w run check-links
      
      - name: Run Lighthouse CI
        run: pnpm -w run lighthouse-ci
```

### Deployment Targets

- **Vercel**: Configuration zero, support Astro natif
- **Netlify**: Configuration via `netlify.toml`
- **Cloudflare Pages**: Support SSG Astro
- **GitHub Pages**: Build + deploy via Actions

```javascript
// astro.config.mjs - Exemple pour GitHub Pages
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name',
});
```

## Performance Optimizations

### Image Optimization

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="Hero image"
  width={1200}
  height={600}
  format="webp"
  loading="lazy"
  decoding="async"
/>
```

### Code Splitting

- Astro fait du code splitting automatique par page
- Composants avec JavaScript client utilisent `client:load`, `client:visible`, ou `client:idle`

### Font Loading

```astro
---
// Dans BaseLayout.astro
---
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"
    rel="stylesheet"
  >
</head>
```

### Critical CSS

Astro inline automatiquement le CSS critique. Configuration additionnelle possible via Vite.

## Security Considerations

### Content Security Policy

```astro
---
// Dans BaseLayout.astro
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // Ajuster selon besoins
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
  "font-src 'self' fonts.gstatic.com",
  "img-src 'self' data: https:",
].join('; ');
---
<head>
  <meta http-equiv="Content-Security-Policy" content={csp}>
</head>
```

### Input Sanitization

- Utiliser `set:html` avec précaution dans Astro
- Valider et sanitizer les inputs de formulaires côté serveur
- Utiliser Zod pour valider les données de Content Collections

### Dependencies

```bash
# Audit régulier des dépendances
pnpm audit

# Mise à jour automatique des dépendances de sécurité
# Via Dependabot ou Renovate
```

## Monitoring and Analytics

### Performance Monitoring

- **Lighthouse CI**: Audits automatiques en CI
- **Web Vitals**: Tracking des Core Web Vitals (optionnel)

### Analytics

```astro
---
// Dans BaseLayout.astro
const { ANALYTICS_ID } = import.meta.env;
---
{ANALYTICS_ID && (
  <script is:inline define:vars={{ id: ANALYTICS_ID }}>
    // Code analytics (Plausible, Fathom, etc.)
  </script>
)}
```

### Error Tracking

- **Sentry**: Pour tracker les erreurs JavaScript (si composants interactifs)
- **Build Logs**: Monitoring des erreurs de build en CI

## Future Enhancements

### Phase 2 Considerations

- **CMS Integration**: Intégration avec un headless CMS (Sanity, Contentful)
- **Search**: Ajout d'une recherche avec Pagefind ou Algolia
- **Blog**: Extension avec une section blog complète
- **Newsletter**: Intégration formulaire newsletter
- **Dark Mode**: Support du thème sombre
- **Animations**: Ajout d'animations avec View Transitions API d'Astro

### Scalability

- **Shared Packages**: Extraction de composants réutilisables dans `packages/`
- **Multiple Sites**: Support de plusieurs sites dans le monorepo
- **API Routes**: Utilisation des endpoints Astro pour des fonctionnalités dynamiques légères
