# Design Document - Alpha Web Core

## Overview

Alpha Web Core est un template Astro pragmatique et multi-marque, conçu pour être réutilisé sur des sites de 20-50 pages. Le système utilise :

1. **Minimal Token Layer** : 5-10 CSS variables pour les couleurs de marque
2. **Tailwind Utilities** : Utilisation directe de Tailwind pour layout, spacing, shadows, borders
3. **Semantic Brand Classes** : Quelques classes pour les couleurs de marque (`.text-brand-primary`, `.bg-brand-primary`)
4. **Strict Content Schemas** : Validation Zod pour garantir la cohérence du contenu

Cette architecture permet de changer les couleurs de marque rapidement via CSS variables ou Tailwind config, tout en gardant le code simple et AI-friendly.

## Architecture

### System Layers

```
┌─────────────────────────────────────────────────────────────┐
│                   Theme Layer (Simple)                       │
│  tokens.css - 5-10 CSS variables for brand colors           │
│  OR Tailwind config theme extension                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Component Layer (Astro + Tailwind)              │
│  Hero.astro, Features.astro, CTA.astro, etc.                │
│  Uses: .text-brand-primary + standard Tailwind utilities    │
│  (rounded-lg, shadow-md, p-4, etc.)                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Content Layer (Strict Schemas)                  │
│  Zod schemas - Validate content structure                    │
│  Discriminated union for type-safe sections                 │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
apps/website/
├── src/
│   ├── styles/
│   │   ├── global.css                    # Main entry point
│   │   └── tokens.css                    # 5-10 CSS variables for brand colors
│   ├── content/
│   │   ├── config.ts                     # Updated with strict schemas
│   │   ├── schemas/
│   │   │   ├── sections-registry.ts      # Section type enum
│   │   │   ├── hero-schema.ts            # Hero section schema
│   │   │   ├── features-schema.ts        # Features section schema
│   │   │   ├── cta-schema.ts             # CTA section schema
│   │   │   ├── events-schema.ts          # Events section schema
│   │   │   ├── about-schema.ts           # About section schema
│   │   │   └── team-schema.ts            # Team section schema
│   │   └── sections/
│   │       └── *.json                    # Section content files
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.astro                # Uses brand classes + Tailwind
│   │   │   ├── Features.astro            # Uses brand classes + Tailwind
│   │   │   ├── CTA.astro                 # Uses brand classes + Tailwind
│   │   │   ├── Events.astro              # Uses brand classes + Tailwind
│   │   │   ├── About.astro               # Uses brand classes + Tailwind
│   │   │   └── Team.astro                # Uses brand classes + Tailwind
│   │   ├── Header.astro                  # Uses brand classes + Tailwind
│   │   ├── Footer.astro                  # Uses brand classes + Tailwind
│   │   └── primitives/
│   │       └── *.astro                   # Refactored primitives
│   └── layouts/
│       └── BaseLayout.astro              # Updated (no Google Fonts)
└── tailwind.config.mjs                   # Exposes brand colors
```

## Components and Interfaces

### 1. Minimal Token System

#### Brand Tokens (`tokens.css`)

Simple CSS variables for brand colors only (5-10 variables):

```css
:root {
  /* Brand colors - customize these for each project */
  --brand-primary: #334155;      /* Main brand color */
  --brand-primary-hover: #1e293b;
  --brand-secondary: #64748b;    /* Secondary brand color */
  --brand-accent: #3b82f6;       /* Accent/CTA color */
  
  /* Neutral colors */
  --color-text: #1a1a1a;
  --color-text-muted: #64748b;
  --color-bg: #ffffff;
  --color-bg-alt: #f8fafc;
}
```

#### Minimal Semantic Classes

Just a few brand-related classes:

```css
/* Brand color utilities */
.text-brand-primary { color: var(--brand-primary); }
.text-brand-secondary { color: var(--brand-secondary); }
.text-brand-accent { color: var(--brand-accent); }

.bg-brand-primary { background-color: var(--brand-primary); }
.bg-brand-secondary { background-color: var(--brand-secondary); }
.bg-brand-accent { background-color: var(--brand-accent); }

.border-brand-primary { border-color: var(--brand-primary); }

/* Hover states */
.hover-brand-primary:hover { background-color: var(--brand-primary-hover); }
```

**Everything else uses standard Tailwind:**
- Layout: `flex`, `grid`, `container`, etc.
- Spacing: `p-4`, `m-8`, `gap-6`, etc.
- Shadows: `shadow-md`, `shadow-lg`, etc.
- Borders: `rounded-lg`, `border`, etc.
- Text: `text-gray-600`, `text-white`, etc.

### 2. Simple Theme System

#### Option A: CSS Variables (Recommended)

Just change the values in `tokens.css`:

**Default (Neutral):**
```css
:root {
  --brand-primary: #334155;
  --brand-primary-hover: #1e293b;
  --brand-secondary: #64748b;
  --brand-accent: #3b82f6;
}
```

**Brand Example (Blue Tech):**
```css
:root {
  --brand-primary: #2563eb;
  --brand-primary-hover: #1d4ed8;
  --brand-secondary: #7c3aed;
  --brand-accent: #06b6d4;
}
```

#### Option B: Tailwind Config

Alternatively, define brand colors in `tailwind.config.mjs`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#334155',
          secondary: '#64748b',
          accent: '#3b82f6',
        },
      },
    },
  },
};
```

Then use: `bg-brand-primary`, `text-brand-accent`, etc.

### 3. Content Collection Schemas

#### Section Registry (`schemas/sections-registry.ts`)

Central definition of all section types:

```typescript
export enum SectionType {
  HERO = 'hero',
  ABOUT = 'about',
  FEATURES = 'features',
  EVENTS = 'events',
  CTA = 'cta',
  TEAM = 'team',
}

export const SECTION_TYPES = Object.values(SectionType);
```

#### Discriminated Union Schema

```typescript
import { z } from 'astro:content';
import { SectionType } from './sections-registry';
import { heroDataSchema } from './hero-schema';
import { featuresDataSchema } from './features-schema';
import { ctaDataSchema } from './cta-schema';
import { eventsDataSchema } from './events-schema';
import { aboutDataSchema } from './about-schema';
import { teamDataSchema } from './team-schema';

export const sectionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(SectionType.HERO),
    order: z.number(),
    visible: z.boolean().default(true),
    data: heroDataSchema,
  }),
  z.object({
    type: z.literal(SectionType.FEATURES),
    order: z.number(),
    visible: z.boolean().default(true),
    data: featuresDataSchema,
  }),
  z.object({
    type: z.literal(SectionType.CTA),
    order: z.number(),
    visible: z.boolean().default(true),
    data: ctaDataSchema,
  }),
  z.object({
    type: z.literal(SectionType.EVENTS),
    order: z.number(),
    visible: z.boolean().default(true),
    data: eventsDataSchema,
  }),
  z.object({
    type: z.literal(SectionType.ABOUT),
    order: z.number(),
    visible: z.boolean().default(true),
    data: aboutDataSchema,
  }),
  z.object({
    type: z.literal(SectionType.TEAM),
    order: z.number(),
    visible: z.boolean().default(true),
    data: teamDataSchema,
  }),
]);
```

#### Individual Section Schemas

**Hero Schema (`schemas/hero-schema.ts`):**
```typescript
import { z } from 'astro:content';

export const heroDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(['primary', 'secondary']).default('primary'),
  }).optional(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }).optional(),
  variant: z.enum(['default', 'centered', 'split']).default('default'),
});
```

**Features Schema (`schemas/features-schema.ts`):**
```typescript
import { z } from 'astro:content';

export const featuresDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  features: z.array(z.object({
    icon: z.string().optional(),
    title: z.string(),
    description: z.string(),
  })),
  layout: z.enum(['grid', 'list']).default('grid'),
  columns: z.enum([2, 3, 4]).default(3),
});
```

**CTA Schema (`schemas/cta-schema.ts`):**
```typescript
import { z } from 'astro:content';

export const ctaDataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  primaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  secondaryCta: z.object({
    label: z.string(),
    href: z.string(),
  }).optional(),
  variant: z.enum(['default', 'emphasized']).default('default'),
});
```

**Events Schema (`schemas/events-schema.ts`):**
```typescript
import { z } from 'astro:content';

export const eventsDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  displayMode: z.enum(['upcoming', 'featured', 'all']).default('upcoming'),
  limit: z.number().optional(),
  showFilters: z.boolean().default(false),
});
```

**About Schema (`schemas/about-schema.ts`):**
```typescript
import { z } from 'astro:content';

export const aboutDataSchema = z.object({
  title: z.string(),
  content: z.string(), // HTML content
  image: z.object({
    src: z.string(),
    alt: z.string(),
    position: z.enum(['left', 'right']).default('right'),
  }).optional(),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).optional(),
});
```

### 4. Component Refactoring Pattern

#### Before (Hardcoded Brand Colors):
```astro
<section class="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
  <div class="container">
    <h1 class="text-4xl font-bold text-primary-600 mb-4">
      {title}
    </h1>
    <button class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg">
      {cta}
    </button>
  </div>
</section>
```

#### After (Brand Classes + Tailwind):
```astro
<section class="py-16 md:py-24 bg-white">
  <div class="container">
    <h1 class="text-4xl font-bold text-brand-primary mb-4">
      {title}
    </h1>
    <button class="bg-brand-accent hover-brand-primary text-white px-6 py-3 rounded-lg shadow-md">
      {cta}
    </button>
  </div>
</section>
```

**Key Changes:**
- Replace `primary-600` → `brand-primary`
- Keep Tailwind utilities: `py-16`, `rounded-lg`, `shadow-md`, etc.
- Use standard gray colors: `text-gray-600`, `bg-gray-50`, etc.
- Only brand-specific colors use CSS variables

### 5. Tailwind Configuration

#### Pragmatic `tailwind.config.mjs`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Expose brand colors via CSS variables
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          accent: 'var(--brand-accent)',
        },
      },
      // Use system fonts
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        heading: ['system-ui', '-apple-system', 'sans-serif'],
      },
      // Keep standard Tailwind utilities for everything else
    },
  },
  plugins: [],
};
```

**That's it!** Use standard Tailwind for:
- Spacing: `p-4`, `m-8`, `gap-6`
- Shadows: `shadow-md`, `shadow-lg`
- Borders: `rounded-lg`, `border`
- Colors: `bg-white`, `text-gray-600`, `bg-gray-50`

## Data Models

### Section Content Model

```typescript
type SectionContent = {
  type: SectionType;
  order: number;
  visible: boolean;
  data: HeroData | FeaturesData | CTAData | EventsData | AboutData | TeamData;
};
```

### Theme Model

```typescript
type Theme = {
  name: string;
  colors: {
    surface: Record<string, string>;
    text: Record<string, string>;
    interactive: Record<string, string>;
    border: Record<string, string>;
    status: Record<string, string>;
  };
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  radius: Record<string, string>;
  typography: {
    fontFamily: Record<string, string>;
    fontSize: Record<string, string>;
    lineHeight: Record<string, string>;
  };
};
```

## Error Handling

### Schema Validation Errors

When content doesn't match the strict schemas:

```typescript
// In content/config.ts
import { defineCollection } from 'astro:content';
import { sectionSchema } from './schemas/sections-registry';

const sectionsCollection = defineCollection({
  type: 'data',
  schema: sectionSchema,
});

// Astro will throw detailed Zod errors at build time
// Example error:
// [ERROR] Invalid section data in features-home.json:
//   - Expected 'grid' | 'list', received 'carousel' at data.layout
//   - Missing required field 'title' at data
```

### Missing Token Errors

If a component references a non-existent token:

```css
/* This will fall back to initial value (usually transparent or inherit) */
.my-component {
  background-color: var(--color-nonexistent, #ff0000); /* Fallback to red for debugging */
}
```

### Theme Loading Errors

If a theme file is missing or malformed:

```css
/* global.css should have fallback */
@import './tokens/base.css';
@import './themes/theme-neutral.css' layer(theme);
@import './tokens/semantic.css';

/* If theme file fails, base tokens provide defaults */
```

## Testing Strategy

### Manual Testing (Recommended)

**Theme Switching:**
1. Change brand colors in `tokens.css`
2. Run `pnpm dev` and visually verify pages
3. Check that brand colors appear correctly
4. Verify layout and functionality remain intact

**Content Validation:**
- Astro build will fail if content doesn't match schemas
- Fix any Zod validation errors during build

**Accessibility:**
- Use existing a11y-audit script: `pnpm a11y-audit`
- Verify contrast ratios meet WCAG AA standards

### Optional Automated Tests

If you want automated tests, keep them simple:

```typescript
// tests/unit/schemas.test.ts - Validate schemas work
import { heroDataSchema } from '../src/content/schemas/hero-schema';

test('hero schema accepts valid data', () => {
  const valid = { title: 'Welcome', variant: 'default' };
  expect(() => heroDataSchema.parse(valid)).not.toThrow();
});
```

**Skip complex tests like:**
- Visual regression testing
- Codebase scanning for forbidden classes
- Token validation tests
- Component isolation tests

## Migration Strategy

### Phase 1: Token System Setup
1. Create token files structure
2. Define base tokens
3. Create neutral theme
4. Update global.css imports

### Phase 2: Semantic Classes
1. Define semantic utility classes
2. Update Tailwind config
3. Test token exposure

### Phase 3: Component Refactoring
1. Refactor one section at a time
2. Replace hardcoded classes with semantic classes
3. Test each component in isolation

### Phase 4: Schema Refactoring
1. Create section registry
2. Define individual schemas
3. Update content/config.ts
4. Migrate existing content files

### Phase 5: Cleanup
1. Remove test pages
2. Remove Google Fonts
3. Update documentation
4. Create example themes

### Phase 6: Validation
1. Test theme switching
2. Run visual regression tests
3. Verify no hardcoded styles remain
4. Update README

## Performance Considerations

### CSS Bundle Size

- Base tokens: ~2KB
- Semantic classes: ~3KB
- Theme file: ~1KB
- Total CSS overhead: ~6KB (minimal impact)

### Runtime Performance

- CSS variables have negligible performance impact
- No JavaScript required for theming
- Theme switching requires page reload (no runtime overhead)

### Build Performance

- Strict schemas add ~100ms to build time
- Type checking ensures correctness
- No impact on development server speed

## Security Considerations

### Content Injection

Strict schemas prevent injection of:
- Inline styles
- Script tags
- Arbitrary HTML attributes
- External resource URLs (unless validated)

### XSS Prevention

```typescript
// All content is sanitized through Zod schemas
const aboutDataSchema = z.object({
  content: z.string().transform(sanitizeHtml), // Custom sanitization
});
```

### Theme File Validation

```typescript
// Validate theme files contain only CSS custom properties
// No arbitrary CSS or JavaScript
```

## Extensibility

### Adding New Themes

1. Create new theme file in `styles/themes/`
2. Override token values
3. Import in `global.css`
4. No component changes needed

### Adding New Sections

1. Define schema in `schemas/`
2. Add to discriminated union in `sections-registry.ts`
3. Create component in `components/sections/`
4. Use semantic classes only

### Adding New Tokens

1. Add to `tokens/base.css`
2. Create semantic class in `tokens/semantic.css`
3. Expose in Tailwind config if needed
4. Document in README

## Documentation Requirements

### README Updates

- Architecture overview with diagram
- Token system explanation
- How to create a theme
- How to switch themes
- Component development guidelines
- Content schema documentation

### Inline Documentation

- Comments in token files explaining purpose
- JSDoc comments on schema exports
- Component prop documentation
- Example usage in component files
