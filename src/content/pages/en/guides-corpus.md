---
title: "Functional Corpus"
description: "Absolute reference document for Alpha WebCore template"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Alpha WebCore Functional Corpus

> **Absolute reference document for all developers and AI agents**

## 🎯 Immutable Core Principles

### Template Philosophy

Alpha WebCore is a **minimalist, neutral, generic and multi-brand Astro template**.

**4 Non-negotiable Principles:**
1. **Minimalism**: no unnecessary features, no complex variants
2. **Genericity**: never business code
3. **Neutrality**: light style, without imposed visual identity
4. **AI Predictability**: simple, readable and systematic patterns

### 4-Layer Architecture (Strictly Separated)

| Layer | Role | Authorized content |
|-------|------|-------------------|
| **Pages** | Orchestration | Section assembly, content retrieval |
| **Sections** | Page block UI | Layout, primitive composition |
| **Primitives** | Atomic UI | Buttons, cards, inputs, etc. |
| **Content** | Site data | Texts, images, lists, CTAs |

**Guiding principle:**
Pages orchestrate → Sections display → Primitives style → Content defines data

## 🚨 Mandatory Transversal Rules (CRITICAL)

### ⚠️ Rule #1 – Base Path (CRITICAL)

**ABSOLUTE PROHIBITIONS:**
- ❌ No internal URL should start with `/...`
- ❌ No hardcoded link: `href="/about"`
- ❌ No asset should start with `/assets/...`

**ABSOLUTE OBLIGATIONS:**
- ✅ All internal links must go through `buildUrl()`
- ✅ `buildUrl()` must be based on `import.meta.env.BASE_URL`
- ✅ All components containing `href` must document this requirement
- ✅ All assets must use a `publicAsset()` helper or equivalent

**Why?**
- GitHub Pages compatibility
- Subdirectory deployment compatibility
- Multiple sites compatibility
- No broken links in production

### ⚠️ Rule #2 – FR/EN Parity (CRITICAL)

**ABSOLUTE OBLIGATIONS:**
- ✅ Every page exists in **FR** AND **EN**
- ✅ Every Content Collection entry exists in **FR** AND **EN**
- ✅ FR/EN folders must be strictly parallel
- ✅ FR/EN structures must be strictly identical
- ✅ Section order must be identical FR/EN
- ✅ Tests automatically verify this symmetry

**PROHIBITIONS:**
- ❌ No monolingual page
- ❌ No structural divergence between FR and EN
- ❌ No orphan file in one language

### ⚠️ Rule #3 – Assets (CRITICAL)

**ABSOLUTE PROHIBITIONS:**
- ❌ No `/assets/...` path in code
- ❌ No absolute path starting with `/`

**ABSOLUTE OBLIGATIONS:**
- ✅ All assets must be in `public/`
- ✅ Components must use `publicAsset('image.png')`
- ✅ Images in content only contain relative name: `"image": "team/john.jpg"`
- ✅ The `publicAsset()` helper is applied in components, never in content

### ⚠️ Rule #4 – Global Navigation

**OBLIGATIONS:**
- ✅ Header, Footer, LanguageSwitcher, Navigation exclusively use `buildUrl()`
- ✅ No absolute link `/...`
- ✅ FR/EN parity guaranteed
- ✅ All routes must be verified by E2E tests

### ⚠️ Rule #5 – Anti-Over-Engineering

**STRICT TEMPLATE LIMITS:**
- 5 primitives maximum (Button, ButtonLink, Card, Dialog, Input)
- 6 sections maximum (Hero, Features, CTA, Events, About, Team)
- Limited options (no carousels, no complex timeline, no 4+ column grids)
- No advanced design system
- No multiple themes
- No heavy animations

**Any extension must be:**
- Simple
- Generic
- Tested
- Base path compatible
- FR/EN compatible

## 📦 Section Rules

### The 6 Official Sections

1. **Hero**: Page introduction
2. **Features**: Feature list
3. **CTA**: Call to action
4. **Events**: Event list
5. **About**: Presentation
6. **Team**: Member list

### Common Rules for All Sections

**OBLIGATIONS:**
- ✅ Generic and neutral sections
- ✅ No hardcoded business content
- ✅ All data comes from props
- ✅ All props come from Content Collections
- ✅ All internal links use `buildUrl()`
- ✅ No image in `/assets/...`
- ✅ Strict FR/EN parity

**PROHIBITIONS:**
- ❌ No business text in component
- ❌ No business logic
- ❌ No hardcoded link
- ❌ No absolute image path

## 🧩 Primitive Rules

### The 5 Official Primitives

1. **Button**: Generic button
2. **ButtonLink**: Styled link (must use `buildUrl()`)
3. **Card**: Styled container
4. **Dialog**: Accessible modal
5. **Input**: Form field

### Common Rules for All Primitives

**OBLIGATIONS:**
- ✅ Atomic, stable and very simple components
- ✅ No business content
- ✅ Strictly defined props
- ✅ Mandatory accessibility (ARIA, labels, focus)
- ✅ Mandatory unit tests

**PROHIBITIONS:**
- ❌ No disproportionate complexity
- ❌ No imposed business text
- ❌ No logic that belongs to sections

## 📄 Content Rules

### `pages` Collection

**Mandatory structure:**
```json
{
  "title": "string",
  "description": "string",
  "lang": "fr | en"
}
```

**Rules:**
- ✅ One FR file and one EN file mandatory
- ✅ Strictly identical structure
- ✅ No HTML content

### `sections` Collection

**Mandatory structure:**
```json
{
  "type": "hero | features | cta | events | about | team",
  "visible": "boolean",
  "order": "number",
  "data": "object"
}
```

**Rules:**
- ✅ FR and EN strictly parallel
- ✅ All text values in corresponding language
- ✅ No `/assets/...` asset in `data`
- ✅ `href` in `data` are logical routes: `"/about"` (not `/fr/about`)
- ✅ `buildUrl()` applied in components, never in content

### `events` Collection

**Mandatory structure:**
```json
{
  "title": "string",
  "date": "date",
  "location?": "string",
  "description": "string",
  "lang": "fr | en"
}
```

**Rules:**
- ✅ Correct language
- ✅ Valid dates
- ✅ Consistent FR/EN

## ✅ Test Rules

### Test Types

1. **Unit tests (Vitest)** → primitives, collections, i18n
2. **Validation scripts** → source, build, links
3. **E2E tests (Playwright)** → navigation, base path, accessibility

### Mandatory Validation Scripts

#### `validate:source`
Detects in source code:
- ❌ Hardcoded internal links (`href="/..."`)
- ❌ Absolute assets (`/assets/...`)

#### `validate:build`
Analyzes generated site (`dist/`):
- ❌ Broken links
- ❌ Incorrectly prefixed URLs

#### `validate:links`
Complete pipeline:
```
validate:source → build → validate:build
```

#### `check-links`
Verifies final site links:
- ✅ Functional internal URLs
- ✅ External URLs respond 200

### When to Update Tests?

**ALWAYS rerun tests after:**
1. Adding/modifying a page
2. Adding/modifying a section
3. Adding/modifying a primitive
4. Adding/modifying content
5. Modifying style
6. Adding/modifying an asset
7. Modifying navigation

### Mandatory Tests (100% Green)

**All these tests must pass:**
1. ✅ `validate:source`
2. ✅ `validate:build`
3. ✅ `validate:links`
4. ✅ `check-links`
5. ✅ Unit tests (collections, i18n, primitives)
6. ✅ E2E tests (navigation, base path, accessibility, FR/EN)

## 🎯 Executive Summary (6 Immutable Principles)

1. **Mandatory FR/EN parity**
2. **All internal links go through `buildUrl()`**
3. **No asset should start with `/assets/...`**
4. **Everything must work in subdirectory (base path)**
5. **Tests are mandatory and must be updated**
6. **Simple architecture**: Pages → Sections → Primitives → Content

## 🔒 Final Validation

**Before any modification, a developer or agent MUST:**
1. ✅ Verify FR/EN parity
2. ✅ Verify absence of `/...` in links
3. ✅ Verify absence of `/assets/...`
4. ✅ Verify that `buildUrl()` is used everywhere
5. ✅ Verify that collections conform to Zod schemas
6. ✅ Rerun **all** validation scripts
7. ✅ Rerun **all** tests (unit + E2E)
8. ✅ Verify that all tests are **100% green**

**If a single test fails, the modification is INVALID.**

---

**This corpus is the ONLY functional source of truth for Alpha WebCore.**
