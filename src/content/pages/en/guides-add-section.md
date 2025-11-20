---
title: "Add a Section"
description: "Practical guide to add a new content block in the template"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# How-To – Add a Section

> **Objective:** Describe precisely, in a 100% functional way, how to add a new section to the Alpha WebCore template.

## 🎯 Role of a Section

A section is a **reusable page block** (Hero, Features, CTA…). It must remain:
- generic
- neutral
- flexible
- simple
- independent of business content

**A section never has hardcoded text**: everything comes from content collections.

## 📝 Step 1 – Create the section (UI component)

A section is a component displaying:
- layout
- primitives
- data received as props

Functional rules:
- the section must receive all its data as props
- no image / text / link should be hardcoded
- if the section contains CTAs or links: **they must mandatorily use `buildUrl()`**

## 📦 Step 2 – Create FR and EN content files

Each new section used in a page must have **its configuration in content collections**, in two versions:
```
src/content/sections/
  ├── nouvelle-section.json       (FR)
  └── nouvelle-section-en.json    (EN)
```

Each file must contain:
- `type`: the section name (e.g.: `features`, `cta`, `hero`, etc.)
- `visible`: boolean
- `order`: order of appearance on the page
- `data`: specific data (titles, lists, CTAs…)

### Essential functional rules:
- FR and EN files are **mandatory**
- FR/EN structures must be **strictly identical**
- Texts must be **in the correct language**
- Images must respect asset rules (no `/assets/...`)

## 🔗 Step 3 – Verify section links

If the section contains CTAs, links, buttons, clickable cards, etc., each internal URL must **mandatorily**:
- go through `buildUrl()`
- never start with `/...`
- be defined in FR/EN content files

### Strict functional rule:

**Total prohibition:**
```json
"href": "/about"
```

**Obligation:**
Content uses the logical route `"/about"`, and `buildUrl()` is applied in the component.

## 🖼️ Step 4 – Verify asset management

If the section uses images:
- never write `/assets/...`
- use a helper like `publicAsset('image.png')`

## 📚 Step 5 – Update Section Reference

The **Section Reference** document must be updated with:
- new section name
- role
- props structure
- indication if the section contains internal links

## ✅ Step 6 – Update tests

Adding a section impacts several test categories.

### Tests to rerun:
1. **validate:source** → verifies absence of forbidden URL
2. **validate:build** → verifies links in HTML
3. **validate:links** → complete pipeline
4. **check-links** → final links
5. Unit tests: content collections, i18n structure
6. E2E tests: navigation, base path, FR/EN pages, accessibility

All tests must be 100% passing.

## 📋 Official Checklists

### Checklist "Section"
- [ ] Generic and neutral section
- [ ] No business data in section
- [ ] Complete and consistent props
- [ ] No hardcoded text

### Checklist "Content"
- [ ] FR file created
- [ ] EN file created
- [ ] Identical FR and EN structure
- [ ] Consistent order
- [ ] No asset in `/assets/...`
- [ ] No internal URL in `/...`

### Checklist "Page integration"
- [ ] Section added in FR page
- [ ] Section added in EN page
- [ ] Same FR/EN order
- [ ] No divergent content

### Checklist "Tests"
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK
- [ ] Unit tests OK
- [ ] E2E tests OK

## 🎯 Summary

Adding a section consists of:
1. Create a generic UI section
2. Create FR + EN content files
3. Declare section in FR + EN pages
4. Respect link rules (`buildUrl`)
5. Respect asset rules
6. Update Reference
7. Rerun all tests

This guide is the official functional reference for adding any new section.
