---
title: "Edit Content"
description: "Practical guide to modify or add content in Content Collections"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# How-To – Modify or Add Content

> **Objective:** Describe precisely how to modify or add content in Content Collections (pages, sections, events) of the Alpha WebCore template.

## 🎯 Role of Content

Content (Content Collections) defines:
- page texts
- event entries
- titles, descriptions, section items
- CTAs
- images
- language-specific data

It must be:
- structured
- FR/EN symmetric
- validated by Zod schemas
- independent of design and components
- complete and consistent

No component has the right to contain business text.

## 📋 Step 1 – Identify the type of content to modify

Three collections exist:

### `pages` Collection
Contains:
- title
- description
- language

### `sections` Collection
Contains:
- section type
- display order
- section data (titles, items, CTAs…)

### `events` Collection
Contains:
- title
- description
- date
- location (optional)
- language

## 📝 Step 2 – Modify or create FR and EN files

Content must exist **in two versions**:
```
src/content/<collection>/
  ├── element.json       (FR)
  └── element-en.json    (EN)
```

### Fundamental rule: **Perfect FR/EN parity**
- Both files must exist
- They must have the **same structure**
- All keys must be present in both languages
- Texts must be in the correct language

This rule is automatically verified by unit tests.

## 🔍 Step 3 – Respect Zod schema structure

Each collection has a determined structure:
- `pages`: `{ title, description, lang }`
- `sections`: `{ type, visible, order, data }`
- `events`: `{ title, date, description, lang, location? }`

### Functional rules:
- Never add an unexpected key
- Never modify expected types
- Never omit a mandatory key
- Respect logical order

Unit tests will fail in case of violation.

## 🔗 Step 4 – Link management in content files

If content contains links (e.g.: CTA in a section), they must respect:

### Critical rule: **Prohibition of hardcoded links `/...`**

Bad example (prohibited):
```json
"href": "/fr/about"
```

### Functional obligation: use logical routes

Content should only contain:
```json
"href": "/about"
```
And it's the section (UI) that will apply `buildUrl()`.

**Content should never directly call `buildUrl()`**, it only contains the logical route.

## 🖼️ Step 5 – Image and asset management

Any image in content must:
- come from the `public/` folder
- never use `/assets/...`
- use a helper in components for base path if necessary

### Bad (prohibited):
```json
"image": "/assets/team/john.jpg"
```

### Correct:
```json
"image": "team/john.jpg"
```

**The `publicAsset()` helper is applied in sections**, not in content.

## 📊 Step 6 – Verify section order and visibility

Each section entry must contain:
- `order`: integer determining appearance order
- `visible`: true/false

Functional rules:
- Order must be **strictly the same** in FR and EN
- If a section is invisible (visible: false), it must be invisible in both languages

## ✅ Step 7 – Update tests

Modifying content requires rerunning several tests:

### Tests to rerun:
1. **validate:source** → verifies URLs in content
2. **validate:build** → verifies generated HTML
3. **validate:links** → complete pipeline
4. **check-links** → final site links

### Unit tests:
- collection validation via Zod
- i18n symmetry test
- test for absence of obsolete files

### E2E tests:
- navigation
- base path
- accessibility

Everything must be 100% green.

## 📋 Official Checklists

### Checklist "Content"
- [ ] FR file created or updated
- [ ] EN file created or updated
- [ ] Strictly identical structure
- [ ] Correct values in both languages
- [ ] Keys conforming to Zod schema

### Checklist "Links"
- [ ] No link in `/...`
- [ ] URLs are logical paths (e.g.: `/about`)
- [ ] No `buildUrl()` call in content

### Checklist "Images"
- [ ] No `/assets/...` path
- [ ] Images pointing to valid assets
- [ ] Compatible with `publicAsset()` helper

### Checklist "Sections"
- [ ] Consistent FR/EN order
- [ ] Consistent FR/EN `visible`
- [ ] Complete data

### Checklist "Tests"
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK
- [ ] Unit tests OK
- [ ] E2E tests OK

## 🎯 Summary

Modifying or adding content consists of:
1. Identify collection (pages, sections, events)
2. Modify or create FR and EN files
3. Strictly respect Zod schema
4. Put **no logic** in content
5. Never put link in `/...`
6. Never put absolute asset path
7. Maintain FR/EN symmetry
8. Rerun all tests

This guide is the official functional reference for content management in Alpha WebCore.
