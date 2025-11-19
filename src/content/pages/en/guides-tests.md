---
title: "Tests & Validation"
description: "Understand and master the template testing strategy"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Test Documentation – Alpha WebCore

> **Objective:** Understand the role of tests, their scope, their expected behavior, validation scripts and official checklists.

## 🎯 Overall role of tests

The test suite guarantees:
- proper functioning of the template in **all languages** (FR/EN)
- total compatibility with **base path** (subdirectory deployment, GitHub Pages)
- absence of broken links
- compliance of content collections
- validity of i18n structures
- proper functioning of UI primitives
- AA accessibility
- site stability after any addition or modification

Tests are a **mandatory pillar**: no change can be accepted if tests are not 100% green.

## 📦 Types of tests in the template

### Unit tests (Vitest)

They verify:
- UI primitives (Button, ButtonLink, Card, Input, Dialog)
- classes and variants
- basic accessibility
- correct prop typing
- Content Collections validation

**Functional objective:** guarantee that UI is stable, simple, neutral and predictable.

### Validation tests (Collections + i18n)

Tests verify:
- perfect FR/EN symmetry
- absence of obsolete files
- compliance with Zod schemas
- absence of invalid types
- structure integrity

**Functional objective:** content must always be clean, compliant, and identical between languages.

### E2E tests (Playwright)

They test:
- navigation
- language-switcher
- FR/EN routes
- site functioning **with simulated base path**
- accessibility (axe-core)
- internal links
- section display in pages

**Functional objective:** simulate exactly the user experience in production.

## 🔍 Validation scripts (quality pipeline)

### `validate:source`

**Objective:** detect **in source code** the following violations:
- presence of hardcoded internal links (`href="/..."`)
- presence of absolute assets (`/assets/...`)

This script should fail if:
- an internal URL starts with `/`
- a CTA is incorrect
- a section contains a hardcoded link

### `validate:build`

**Objective:** analyze the **generated site** (`dist/`) and detect broken or incorrectly prefixed links.

This script should fail if:
- an internal URL doesn't respect BASE_URL
- assets are not accessible
- a page generates an invalid URL

### `validate:links`

**Objective:** complete pipeline
```
validate:source → build → validate:build
```
It is executed in a single command.

### `check-links`

**Objective:** verify final generated site links.
- Internal URLs → must work
- External URLs → must respond 200

This script should be rerun **with each addition or modification of page, section, primitive or content**.

## ⚡ When to update tests?

Here are **all cases** where you must rerun tests.

### Adding or modifying a page

Impact:
- new FR/EN routes
- modified navigation
- modified displayed sections

Tests to update:
- E2E navigation
- E2E routes
- FR/EN tests

### Adding or modifying a section

Impact:
- FR/EN content
- section data
- UI
- internal navigation

Tests to update:
- unit tests (if primitives used)
- i18n or collections tests
- E2E tests (if display modified)

### Adding or modifying a primitive

Impact:
- UI
- accessibility
- internal links

Tests to update:
- unit tests
- accessibility tests
- validate:source
- validate:build

### Adding or modifying an asset

Impact:
- base path
- image loading
- links

Tests to rerun:
- validate:build
- check-links
- E2E tests

### Modifying style

Impact:
- UI
- readability
- accessibility

Tests to rerun:
- E2E accessibility
- unit tests (if primitives modified)
- validate:source (if links)

## 📋 Official checklists

### Checklist "No broken links"
- [ ] No internal link `href="/..."`
- [ ] No asset path `/assets/...`
- [ ] All internal links go through `buildUrl()`
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK

### Checklist "Compliant content"
- [ ] FR/EN files present
- [ ] Identical FR/EN structures
- [ ] Zod validation OK
- [ ] No obsolete files
- [ ] Collection tests OK

### Checklist "Navigation"
- [ ] Header/Footer navigation compliant
- [ ] FR/EN routes present
- [ ] FR/EN switcher functional
- [ ] E2E navigation OK

### Checklist "Base path"
- [ ] E2E base path simulation OK
- [ ] All URLs correctly prefixed
- [ ] No broken image
- [ ] No absolute link

### Checklist "Accessibility"
- [ ] axe-playwright tests OK
- [ ] Compliant contrasts
- [ ] Visible focus
- [ ] Accessible forms

### Checklist "UI and primitives"
- [ ] Primitives unit tested
- [ ] Valid variants
- [ ] Consistent sizes
- [ ] Integrated accessibility

## 🎯 Summary

The test suite is designed to guarantee:
- template stability
- design neutrality
- total base path compatibility
- perfect FR/EN parity
- absence of broken links
- accessibility quality
- content consistency
- primitive reliability

Any modification must trigger:
1. Execution of validation scripts
2. Execution of all tests
3. Error analysis
4. Test update if necessary

This document is the **official functional reference** of the Alpha WebCore template testing strategy.
