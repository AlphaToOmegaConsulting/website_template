# CMS Integration Guide

Complete guide for integrating the Alpha WebCore v3 template with popular Content Management Systems (CMS).

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Security Considerations](#security-considerations)
4. [CMS Options](#cms-options)
   - [Headless CMS (Recommended)](#headless-cms-recommended)
   - [Git-based CMS](#git-based-cms)
   - [Traditional CMS](#traditional-cms)
5. [Integration Patterns](#integration-patterns)
6. [Step-by-Step Guides](#step-by-step-guides)
7. [API Reference](#api-reference)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Alpha WebCore v3 template is designed for easy CMS integration through:

- **Content Collections** - Astro's built-in content management
- **Strict Validation** - Zod schemas for all content types
- **HTML Sanitization** - Built-in XSS protection
- **Type Safety** - Full TypeScript support
- **Flexible Data Sources** - Supports JSON, Markdown, APIs

---

## Architecture

### Current Setup

```
Content Sources (Built-in)
├── src/content/sections/*.json    → Section configurations
├── src/content/events/*.md         → Event content (Markdown)
└── src/content/pages/*.md          → Page content (Markdown)
                                    ↓
                              Content Collections
                              (with Zod validation)
                                    ↓
                              Components (Astro)
                                    ↓
                              Static HTML (Build)
```

### With CMS Integration

```
External CMS (Contentful, Strapi, etc.)
                ↓
            API Fetch (at build time)
                ↓
        Transform to Collection Format
                ↓
        Validate with Zod Schemas
                ↓
        Sanitize HTML Content
                ↓
        Components (Astro)
                ↓
        Static HTML (Build)
```

---

## Security Considerations

### HTML Sanitization

All HTML content from CMS **must be sanitized** to prevent XSS attacks.

**Built-in Sanitizer**: `src/utils/html-sanitizer.ts`

```typescript
import { sanitizeHtml } from '@/utils/html-sanitizer';

// Sanitize CMS content before rendering
const cleanContent = sanitizeHtml(cmsContent);
```

**Features**:
- Removes `<script>` tags
- Removes event handlers (`onclick`, etc.)
- Removes dangerous protocols (`javascript:`, `data:`)
- Allows safe HTML tags (p, h1-h6, a, img, etc.)
- Configurable allowed tags and attributes

**Example**:

```typescript
// Input from CMS
const maliciousContent = '<p>Hello</p><script>alert("XSS")</script>';

// Sanitized output
const clean = sanitizeHtml(maliciousContent);
// Result: '<p>Hello</p>'
```

### Validation

All CMS data **must pass Zod validation** before being used.

**Schema Location**: `src/content/config.ts`

```typescript
// Example: Hero section schema
const heroDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(['primary', 'secondary', 'ghost']).optional(),
  }).optional(),
  // ... etc
});
```

**Validation happens automatically** when using Astro Content Collections.

For API data, validate manually:

```typescript
import { heroDataSchema } from '@/content/config';

const data = await fetchFromCMS();
const validated = heroDataSchema.parse(data); // Throws if invalid
```

---

## CMS Options

### Headless CMS (Recommended)

Best for: Teams needing a user-friendly editor + static site performance.

**Top Choices**:

| CMS | Best For | Pros | Cons |
|-----|----------|------|------|
| **Contentful** | Enterprise, scalable | Great API, CDN, versioning | Pricing can be high |
| **Sanity** | Real-time, customization | Live preview, GROQ queries | Learning curve |
| **Strapi** | Self-hosted, flexibility | Open source, free, GraphQL | Requires server |
| **Directus** | SQL-based, developer-friendly | SQL database, REST + GraphQL | More technical |

**Workflow**:
1. Content editors use CMS UI
2. Build fetches from CMS API
3. Astro generates static pages
4. Deploy to CDN

### Git-based CMS

Best for: Developer-friendly teams, simple workflows.

**Top Choices**:

| CMS | Best For | Pros | Cons |
|-----|----------|------|------|
| **Decap CMS** (Netlify CMS) | GitHub-based | Free, Git workflow | Limited UI |
| **Tina CMS** | Visual editing | Great DX, live preview | Newer, smaller ecosystem |
| **Forestry** | Markdown sites | Simple, Git-based | Discontinued (moving to Tina) |

**Workflow**:
1. Editors use CMS UI → commits to Git
2. Git hook triggers build
3. Astro reads from `src/content/`
4. Deploy

### Traditional CMS

Best for: Existing infrastructure, dynamic content.

**Top Choices**:

| CMS | Best For | Pros | Cons |
|-----|----------|------|------|
| **WordPress (Headless)** | Existing WP sites | Huge plugin ecosystem | Can be slow |
| **Drupal (Headless)** | Enterprise, complex | Powerful, flexible | Complex setup |

---

## Integration Patterns

### Pattern 1: Build-Time API Fetch (Recommended)

Fetch CMS content at build time for maximum performance.

**File**: `src/content/loaders/cms-loader.ts`

```typescript
import { z } from 'astro/zod';

export async function loadSectionsFromCMS() {
  const response = await fetch('https://your-cms.com/api/sections');
  const data = await response.json();

  // Transform to match Content Collection schema
  return data.map((item: any) => ({
    id: item.id,
    type: item.type,
    order: item.order,
    visible: item.visible,
    data: item.fields,
  }));
}
```

**Usage in Page**:

```astro
---
import { loadSectionsFromCMS } from '@/content/loaders/cms-loader';
import Hero from '@/components/sections/Hero.astro';

const sections = await loadSectionsFromCMS();
const heroSection = sections.find(s => s.type === 'hero');
---

{heroSection && <Hero {...heroSection.data} />}
```

**Pros**: Fast, secure, cacheable
**Cons**: Requires rebuild to update content

### Pattern 2: Hybrid (API + Static)

Static pages + API for dynamic content (events, news).

**Example**: Static site + events from API

```astro
---
// src/pages/en/events/index.astro
import { getUpcomingEvents } from '@/api/events';

const events = await getUpcomingEvents();
---

<section>
  {events.map(event => (
    <article>
      <h2>{event.title}</h2>
      <p>{event.date}</p>
    </article>
  ))}
</section>
```

**Pros**: Best of both worlds
**Cons**: More complex setup

### Pattern 3: Full API Integration

All content from CMS API.

**Not recommended** for this template (defeats static-first approach), but possible with Astro's Server-Side Rendering (SSR).

---

## Step-by-Step Guides

### Integration with Contentful

**Step 1: Install Contentful SDK**

```bash
pnpm add contentful
```

**Step 2: Create Contentful Client**

```typescript
// src/lib/contentful.ts
import { createClient } from 'contentful';

export const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});
```

**Step 3: Create Content Loader**

```typescript
// src/content/loaders/contentful.ts
import { client } from '@/lib/contentful';
import { sanitizeHtml } from '@/utils/html-sanitizer';

export async function loadHeroSections() {
  const entries = await client.getEntries({
    content_type: 'heroSection',
  });

  return entries.items.map(item => {
    const fields = item.fields as any;

    return {
      id: item.sys.id,
      type: 'hero' as const,
      order: fields.order || 1,
      visible: fields.visible !== false,
      data: {
        title: fields.title,
        subtitle: fields.subtitle,
        cta: fields.cta ? {
          label: fields.cta.label,
          href: fields.cta.href,
          variant: fields.cta.variant || 'primary',
        } : undefined,
      },
    };
  });
}
```

**Step 4: Use in Page**

```astro
---
import { loadHeroSections } from '@/content/loaders/contentful';
import Hero from '@/components/sections/Hero.astro';

const sections = await loadHeroSections();
const hero = sections[0]; // or filter/sort as needed
---

{hero && <Hero {...hero.data} />}
```

**Step 5: Environment Variables**

Create `.env`:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

### Integration with Strapi

**Step 1: Install Axios**

```bash
pnpm add axios
```

**Step 2: Create Strapi Client**

```typescript
// src/lib/strapi.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.STRAPI_URL || 'http://localhost:1337',
  headers: {
    Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
  },
});

export async function getSections() {
  const response = await api.get('/api/sections?populate=*');
  return response.data.data;
}
```

**Step 3: Transform Data**

```typescript
// src/content/loaders/strapi.ts
import { getSections } from '@/lib/strapi';
import { sanitizeHtml } from '@/utils/html-sanitizer';

export async function loadSectionsFromStrapi() {
  const sections = await getSections();

  return sections.map((section: any) => {
    const { attributes } = section;

    return {
      id: section.id.toString(),
      type: attributes.type,
      order: attributes.order,
      visible: attributes.visible !== false,
      data: transformSectionData(attributes.type, attributes.data),
    };
  });
}

function transformSectionData(type: string, data: any) {
  // Sanitize HTML fields
  if (data.content) {
    data.content = sanitizeHtml(data.content);
  }

  if (data.description) {
    data.description = sanitizeHtml(data.description);
  }

  return data;
}
```

### Integration with Decap CMS (Netlify CMS)

**Step 1: Install Decap CMS**

```bash
pnpm add decap-cms-app
```

**Step 2: Create Admin Page**

```astro
---
// src/pages/admin/index.astro
---

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

**Step 3: Configure CMS**

Create `public/admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "sections"
    label: "Sections"
    folder: "src/content/sections"
    create: true
    fields:
      - { label: "Type", name: "type", widget: "select", options: ["hero", "features", "cta"] }
      - { label: "Order", name: "order", widget: "number" }
      - { label: "Visible", name: "visible", widget: "boolean", default: true }
      - label: "Data"
        name: "data"
        widget: "object"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Subtitle", name: "subtitle", widget: "string", required: false }

  - name: "events"
    label: "Events"
    folder: "src/content/events/en"
    create: true
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Location", name: "location", widget: "string" }
      - { label: "Description", name: "description", widget: "text" }
      - { label: "Body", name: "body", widget: "markdown" }
```

**Step 4: Access Admin**

Navigate to `/admin` and log in with Netlify Identity.

---

## API Reference

### HTML Sanitizer

```typescript
import { sanitizeHtml, stripHtml, escapeHtml } from '@/utils/html-sanitizer';

// Sanitize HTML (remove dangerous tags/attributes)
const clean = sanitizeHtml(dirtyHtml);

// Custom allowed tags
const clean = sanitizeHtml(dirtyHtml, {
  allowedTags: ['p', 'strong', 'em'],
  allowedAttributes: {
    'a': ['href', 'title'],
  },
});

// Strip all HTML
const text = stripHtml(htmlContent); // Returns plain text

// Escape HTML
const safe = escapeHtml(userInput); // Escapes special characters
```

### Schema Validation

```typescript
import { z } from 'astro/zod';

// Import existing schemas
import { heroDataSchema } from '@/content/config';

// Validate data
try {
  const validated = heroDataSchema.parse(cmsData);
  // Use validated data
} catch (error) {
  console.error('Validation error:', error);
}

// Or use safeParse (doesn't throw)
const result = heroDataSchema.safeParse(cmsData);
if (result.success) {
  // result.data is validated
} else {
  console.error(result.error);
}
```

---

## Troubleshooting

### CMS Content Not Displaying

**Issue**: Fetched data from CMS but not showing on page.

**Solutions**:
1. Check network request in browser DevTools
2. Verify API credentials
3. Log the fetched data to inspect structure
4. Ensure data matches Zod schema
5. Check for CORS issues (add allowed origins in CMS)

### Validation Errors

**Issue**: Zod validation fails with CMS data.

**Solutions**:
1. Log the CMS data structure: `console.log(JSON.stringify(data, null, 2))`
2. Compare with schema in `src/content/config.ts`
3. Add field transformations if CMS structure differs
4. Use `.safeParse()` for detailed error messages

### HTML Sanitization Too Strict

**Issue**: CMS content has valid HTML being stripped.

**Solutions**:
1. Check which tags/attributes are needed
2. Customize allowed tags:

```typescript
const clean = sanitizeHtml(content, {
  allowedTags: [...DEFAULT_TAGS, 'video', 'iframe'],
  allowedAttributes: {
    ...DEFAULT_ATTRIBUTES,
    'video': ['src', 'controls', 'width', 'height'],
  },
});
```

### Build Performance

**Issue**: Build time too slow when fetching from CMS.

**Solutions**:
1. **Cache CMS responses**: Use Astro's experimental assets cache
2. **Paginate large datasets**: Fetch in chunks
3. **Use webhooks**: Only rebuild when content changes
4. **Parallelize requests**: Use `Promise.all()` for multiple API calls

```typescript
// Parallel fetching
const [sections, events, pages] = await Promise.all([
  fetchSections(),
  fetchEvents(),
  fetchPages(),
]);
```

---

## Best Practices

### ✅ DO

- **Always sanitize** HTML from CMS
- **Validate** all data with Zod schemas
- **Cache** API responses during development
- **Use environment variables** for API credentials
- **Transform data** to match Content Collection schemas
- **Handle errors** gracefully (show fallback content)
- **Test** with malicious input (XSS, injection attempts)

### ❌ DON'T

- Don't trust CMS content (always sanitize)
- Don't skip validation
- Don't hardcode API credentials
- Don't fetch on every page load (use build-time fetching)
- Don't expose sensitive data client-side
- Don't ignore TypeScript errors

---

## Example Implementations

### Complete Contentful Integration

See full example: [examples/contentful/](../examples/contentful/) (if available)

### Complete Strapi Integration

See full example: [examples/strapi/](../examples/strapi/) (if available)

---

## Resources

- **HTML Sanitizer**: [src/utils/html-sanitizer.ts](../src/utils/html-sanitizer.ts)
- **Content Config**: [src/content/config.ts](../src/content/config.ts)
- **Astro Content Collections**: https://docs.astro.build/en/guides/content-collections/
- **Zod Documentation**: https://zod.dev/
- **Contentful Docs**: https://www.contentful.com/developers/docs/
- **Strapi Docs**: https://docs.strapi.io/
- **Decap CMS Docs**: https://decapcms.org/docs/

---

## Next Steps

- **Primitives Documentation**: [PRIMITIVES.md](./PRIMITIVES.md)
- **Sections Documentation**: [SECTIONS.md](./SECTIONS.md)
- **Theme Migration**: [THEME_MIGRATION.md](./THEME_MIGRATION.md)
- **Development Guide**: [DEVELOPMENT.md](./DEVELOPMENT.md)
