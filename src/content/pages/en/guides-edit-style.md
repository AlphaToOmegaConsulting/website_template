---
title: "Edit Style"
description: "Practical guide to customize the template appearance"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# How-To – Modify Template Style

> **Objective:** Describe how to customize the Alpha WebCore template style while respecting all transversal rules.

## 🎯 Role of Style

Style is based on 3 functional elements:
1. **CSS Tokens** → define the brand (colors, typography, spacing)
2. **Tailwind Classes** → define most of the formatting
3. **UI Primitives** → neutral styled atomic components

Style must remain:
- minimalist
- neutral
- consistent
- easy to customize without breaking architecture

## 🎨 Step 1 – Modify CSS Tokens

Tokens are the **official source of visual truth** of the template.
They define:
- brand colors
- semantic colors
- typographies
- global spacing

### Functional rules:
- Tokens must remain **simple and few**
- No complex additional variable should be added
- Tokens replace branding **without affecting architecture**

Examples of functionally modifiable tokens:
- `--brand-primary`
- `--brand-secondary`
- `--font-heading`
- `--font-body`
- `--spacing-section`

## 🖌️ Step 2 – Modify Tailwind classes

Template components use Tailwind for most styles.
A modification can concern:
- text color
- section padding
- margins between elements
- layout grid

### Functional rules:
- Tailwind classes must remain **simple**
- No complex abstraction should be introduced
- Never directly modify a component to add business text
- New classes must remain consistent with template's neutral identity

## 🔤 Step 3 – Modify typography

Typography is controlled by:
- CSS tokens (`--font-heading`, `--font-body`)
- Tailwind classes (`font-sans`, `font-serif`, etc.)

### Rules:
- Always modify typography via tokens, never directly in a component
- Keep consistency between headings and body
- Avoid adding multiple external fonts: keep template simple

## 🖼️ Step 4 – Modify images, logos or backgrounds

These elements are always in the `public/` folder.

### ⚠️ Critical functional rules:
- **Absolute prohibition** to use `/assets/...`
- Never use path starting with `/...`
- Any styled image must be integrated via a helper (e.g.: `publicAsset()`)
- Backgrounds must be base path compatible

### Typical cases:
- Logo replaced in `public/logo.svg`
- Hero image modified in `public/hero.jpg`
- Background added via Tailwind class

## 🎨 Step 5 – Add light custom styles

In some cases, some custom styles are necessary.
They must be integrated in:
- `tokens.css` (if it's a token)
- `global.css` (if it's a simple global style)

### Rules:
- Custom styles must be minimal
- Never use complex CSS
- Never introduce a secondary design system
- Don't create long cascades
- Keep simple and maintainable logic

## 🔗 Step 6 – Verify internal links

Some style modifications can introduce additional buttons or links.

### Critical rule:
- **Any internal link must use `buildUrl()` in ButtonLink primitive or in section**
- No internal link should appear as `/something`

## ✅ Step 7 – Update tests

Any style modification can impact:
- accessibility
- structure
- section visibility
- buttons
- contrasts

### Tests to rerun mandatorily:
1. **validate:source**
2. **validate:build**
3. **validate:links**
4. **check-links**
5. Unit tests: styled primitives
6. E2E tests: accessibility (axe), navigation, base path, FR/EN pages

Everything must be 100% green.

## 📋 Official Checklists

### Checklist "Tokens"
- [ ] Simple and consistent tokens
- [ ] No useless variables
- [ ] Global impact modification documented

### Checklist "Tailwind"
- [ ] Simple Tailwind classes
- [ ] No complex design
- [ ] Styles consistent with template

### Checklist "Images and assets"
- [ ] No `/assets/...`
- [ ] No `/...` path
- [ ] Base path compatible assets

### Checklist "Tests"
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] E2E tests OK

## 🎯 Summary

Modifying style consists of:
1. Modify tokens if brand change
2. Modify Tailwind classes if visual need
3. Keep strict neutrality
4. Never break template minimalism
5. Manage images via `public/` + base path helper
6. Maintain link rules (`buildUrl`)
7. Rerun all tests

This guide is the official functional reference for any style modification.
