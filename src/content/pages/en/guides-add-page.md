---
title: "Add a Page"
description: "Practical guide to add a new FR/EN page in the template"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# How-To – Add a Page (FR + EN)

> **Objective:** Describe, step by step and 100% functionally, how to add a new page in the Alpha WebCore template, while respecting all transversal rules: FR/EN, base path, internal links, assets, navigation and tests.

## 🎯 Guide Objective

A "page" in Alpha WebCore is a route displayed in `/fr/...` and `/en/...`. It plays an **orchestration** role:
- it chooses which sections are displayed;
- it controls the order of sections;
- it retrieves data from collections;
- it defines the layout;
- it **never** contains complex logic.

Creating a page involves **7 functional responsibilities**:
1. Create the FR **and** EN version (mandatory symmetry)
2. Respect the folder structure
3. Configure the page in content collections
4. Integrate sections
5. Add the page to global navigation
6. Verify links, assets and tests
7. Rerun all tests

## 📝 Step 1 – Create FR and EN page

### Mandatory folder structure

All pages must follow this structure:
```
src/pages/
  ├── fr/
  │    └── nouvelle-page.astro
  ├── en/
  │    └── new-page.astro
  └── index.astro  (redirect / → /fr/)
```

### Functional rules:
- FR and EN pages **must exist together**
- Naming can be different (e.g.: `nouvelle-page` vs `new-page`)
- Both pages must use **exactly the same structure** of sections

## 📦 Step 2 – Declare page in `pages` collection

The page must be added to the `pages` content collection under two files:
- one FR file (`lang: 'fr'`)
- one EN file (`lang: 'en'`)

Each file must contain:
- `title`
- `description`
- `lang`

### Reminder:
- This data is displayed in meta tags
- It is used by sections (if needed)
- Unit tests verify that both languages exist

## 🎨 Step 3 – Define sections for the new page

Each page must define a list of sections via the `sections` content collection.

For the FR page and the EN page, you need **a separate file**:
```
src/content/sections/
  ├── page-nouvelle.json
  ├── page-nouvelle-en.json
```

Each file contains:
- the ordered list of sections
- the section type (`hero`, `features`, etc.)
- specific data

### Rules:
- FR and EN sections must be **strictly parallel**
- Any data in `data` must be **language-dependent**
- No image should use `/assets/...`

## 🔧 Step 4 – Orchestration in the page

In the page (FR and EN), you must:
- load data via `getEntry()` or equivalent
- assemble sections in the defined order
- use `BaseLayout`

### Functional rules:
- The page must **not** contain hardcoded business content
- All logic must be minimal: assemble only

## 🔗 Step 5 – Add page to navigation

If the page must be accessible from Header, Footer, Navigation or any other interface, you must:
- add an entry in navigation arrays
- guarantee **FR/EN parity**
- use **mandatory** `buildUrl()` for each internal link

### IMPORTANT – Internal link rule:

**Absolute prohibition to write:**
```astro
<a href="/fr/nouvelle-page">...</a>
```
OR
```astro
<a href="/nouvelle-page">...</a>
```

**Functional obligation:**
```astro
<a href={buildUrl('/nouvelle-page')}>...</a>
```

This rule guarantees compatibility with:
- GitHub Pages
- subdirectory deployment
- use of `import.meta.env.BASE_URL`

## 🖼️ Step 6 – Verify assets

If the page uses images:
- NEVER write `/assets/...`
- use a helper like: `publicAsset('image.png')`

Functional reasons:
- base path compatibility
- no broken links on GitHub Pages
- consistent paths in local build

## ✅ Step 7 – Update tests (mandatory)

Creating a page requires rerunning several tests because:
- a new FR/EN route exists
- navigation changes
- new sections are used
- new FR/EN content is added

### Tests to rerun:
1. **validate:source**
2. **validate:build**
3. **validate:links**
4. **check-links**
5. **Unit tests** (collections, i18n)
6. **E2E tests** (navigation + base path)

All must be **100% passing**.

## 📋 Official checklists

### Checklist "Page creation"
- [ ] FR page created
- [ ] EN page created
- [ ] FR `pages` file created
- [ ] EN `pages` file created

### Checklist "Sections"
- [ ] FR sections created
- [ ] EN sections created
- [ ] Identical FR/EN order
- [ ] Consistent data in both languages

### Checklist "Links"
- [ ] No internal link in `/...`
- [ ] All internal links go through `buildUrl()`

### Checklist "Assets"
- [ ] No asset in `/assets/...`
- [ ] All assets go through `publicAsset()`

### Checklist "Tests"
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK
- [ ] Unit tests OK
- [ ] E2E base path tests OK

## 🎯 Summary

Creating a page consists of:
1. **Create FR + EN** (always together)
2. **Declare pages in collection**
3. **Create FR + EN section files**
4. **Assemble sections in page**
5. **Update navigation** (with `buildUrl()`)
6. **Verify assets**
7. **Rerun all scripts + tests**

This process guarantees:
- perfect navigation
- complete base path support
- robust production site
- impeccable FR/EN parity
- zero broken links in the entire template

This guide is the official functional reference for adding a new page.
