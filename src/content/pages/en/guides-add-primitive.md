---
title: "Add a Primitive"
description: "Practical guide to add an atomic UI component in the template"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# How-To – Add a UI Primitive

> **Objective:** Describe precisely how to add a new UI primitive (Button, Card, Input, etc.) in the Alpha WebCore template.

## 🎯 Role of a Primitive

A primitive is a **fundamental UI element**, used by sections to build the interface.
It must be:
- simple
- neutral
- minimalist
- accessible
- entirely controlled via its props
- without hardcoded business content
- without complex logic

Examples: Button, ButtonLink, Card, Dialog, Input.

## 📝 Step 1 – Define the Primitive

Creating a primitive first involves defining its functional role:
- What is it for?
- What generic need does it fulfill?
- What usages should remain possible?
- What usages should be prohibited (over-engineering)?

### Functional rules:
- Every primitive must have a **limited scope**
- No complex or dynamic styles
- No behaviors that belong to sections
- No dependency on content collections

## 📦 Step 2 – Define official props

Props must:
- be **strictly defined**
- cover only simple usages
- avoid any disproportionate complexity

Examples of typical props:
- `variant` (e.g.: primary / secondary / ghost)
- `size` (e.g.: sm / md / lg)
- `disabled`
- `href` (if the primitive is a link)
- `id`, `label` (for accessibility)

### Functional rules:
- Primitives **never receive business content**
- They contain no imposed text (except neutral accessibility labels)

## 🔗 Step 3 – Verify Base Path compatibility

Some primitives manipulate links:
- `ButtonLink`
- a potential generic `Link` component
- any primitive with an `href`

### Critical rule:

**Any primitive containing an internal link must mandatorily use `buildUrl()` for internal URLs.**

Functional impact:
- GitHub Pages compatibility
- subdirectory compatibility
- no hardcoded `/...` URL in primitives

> If the primitive is *purely visual* (Button, Card, Dialog, Input), this step has no impact.

## ♿ Step 4 – Accessibility

Each primitive must integrate minimal accessibility rules:
- ARIA attributes if necessary
- associated labels
- `disabled` states
- visible focus
- consistency with the template's neutral design

The final accessibility level is verified via E2E tests (axe-playwright).

## 🎨 Step 5 – Integration in Sections

A primitive is really useful only if it is integrated in sections:
- CTA uses Button / ButtonLink
- Features can use Card
- Team can use Card
- Hero can use ButtonLink
- Dialog is used by some sections

### Functional rules:
- Sections should not bypass primitives
- Any recurring UI should become a primitive

## 📚 Step 6 – Update Reference

The **Primitive Reference** document must be updated with:
- the primitive's name
- its role
- its props
- its restrictions
- if it contains internal links
- if it must respect `buildUrl()` rules

## ✅ Step 7 – Update tests

Adding a primitive involves adding or modifying tests:

### Impacted tests:
1. **Unit tests**: styles, variants, sizes, accessibility
2. **validate:source**: ensure no internal link in `/...` has been introduced
3. **validate:build**: verify the primitive doesn't generate bad links
4. **validate:links** and **check-links**: validate integration of primitives containing `href`
5. **E2E tests**: keyboard access, a11y, base path compatibility (if `href`)

## 📋 Official Checklists

### Checklist "Primitive"
- [ ] Clear and limited functional role
- [ ] No business data
- [ ] Simple, strict and consistent props
- [ ] No complex or useless style
- [ ] Respect of UI minimalism

### Checklist "Links (if applicable)"
- [ ] No `href="/..."`
- [ ] All internal links go through `buildUrl()`

### Checklist "Accessibility"
- [ ] Visible focus
- [ ] Consistent labels (if Input)
- [ ] Functional error or disabled states

### Checklist "Tests"
- [ ] Unit tests created
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] E2E tests OK

### Checklist "Reference"
- [ ] Primitive added in reference document
- [ ] Complete description

## 🎯 Summary

Adding a primitive consists of:
1. Define a simple generic UI
2. Add minimalist and consistent props
3. Respect accessibility
4. Support internal link management if applicable (with `buildUrl()`)
5. Integrate primitive in sections
6. Update Reference
7. Update and rerun all tests

This guide is the official functional reference for adding any new UI primitive.
