---
title: "Template Overview"
description: "Architecture, principles and overview of the Alpha WebCore template"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Alpha WebCore Template Overview

## 🎯 Purpose

Alpha WebCore is a **minimalist, neutral, generic and multi-brand Astro template**, designed to:
- create static sites very quickly;
- guarantee a uniform and predictable architecture;
- simplify the work of AI agents;
- ensure native support for **subdirectory deployment** (GitHub Pages, multiple sites);
- produce clean, stable, tested and extensible code without over-engineering.

## 🏛️ Core Philosophy

The template follows 4 fundamental principles:
- **Minimalism**: no unnecessary features, no complex variants
- **Genericity**: never business code
- **Neutrality**: light style, without imposed visual identity
- **AI Predictability**: simple, readable and systematic patterns

## 📐 4-Layer Architecture

The architecture is based on 4 strictly separated layers:

| Layer | Role | Authorized content |
|-------|------|-------------------|
| **Pages** | Orchestration | Section assembly, content retrieval |
| **Sections** | Page block UI | Layout, primitive composition |
| **Primitives** | Atomic UI | Buttons, cards, inputs, etc. |
| **Content** | Site data | Texts, images, lists, CTAs |

**Guiding principle:**
Pages orchestrate → Sections display → Primitives style → Content defines data

## 🚨 The 6 Immutable Principles

1. **Mandatory FR/EN parity**: every page, every collection exists in FR AND EN
2. **All internal links go through `buildUrl()`**: absolute prohibition of `/...`
3. **No asset starts with `/assets/...`**: use `publicAsset()`
4. **Everything must work in subdirectory** (base path, GitHub Pages)
5. **Tests are mandatory** and must be 100% green
6. **Simple architecture**: Pages → Sections → Primitives → Content

## 📦 Official Components

### Sections (6 maximum)
1. **Hero**: Page introduction
2. **Features**: Feature list
3. **CTA**: Call to action
4. **Events**: Event list
5. **About**: Presentation
6. **Team**: Member list

### Primitives (5 maximum)
1. **Button**: Generic button
2. **ButtonLink**: Styled link (must use `buildUrl()`)
3. **Card**: Styled container
4. **Dialog**: Accessible modal
5. **Input**: Form field

### Content Collections
- **pages**: FR/EN page meta-information
- **sections**: Page section configuration
- **events**: Event list

## 🔒 Transversal Rules

### Links
- ❌ Prohibition of internal links in `/...`
- ✅ Mandatory use of `buildUrl()`
- ✅ Verification via tests and scripts

### Assets
- ❌ Absolute prohibition of `/assets/...` paths
- ✅ Mandatory use of `publicAsset()`

### FR/EN Parity
- ✅ Always produce both versions
- ✅ Always verify symmetry

### Tests
- ✅ Rerun after any modification
- ✅ 100% green mandatory

## 📚 Documentation

To learn more:
- [Functional Corpus](/guides/corpus) - Absolute reference
- [Component Reference](/guides/reference) - Complete inventory
- [Tests](/guides/tests) - Test documentation
- [Base Path](/guides/base-path) - Subdirectory deployment
