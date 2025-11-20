---
title: "Base Path & Deployment"
description: "Understand and master subdirectory deployment"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Base Path & Deployment Guide

> **Objective:** Understand how base path works and master subdirectory deployment (GitHub Pages, multiple sites).

## 🎯 What is Base Path?

The **base path** is a prefix automatically added to all site URLs to allow its deployment in a subdirectory rather than at the root of a domain.

### Deployment examples:

**Root site:**
```
https://example.com/
https://example.com/about
→ base: '/'
```

**Subdirectory:**
```
https://example.com/my-project/
https://example.com/my-project/about
→ base: '/my-project/'
```

**GitHub Pages (project site):**
```
https://user.github.io/repository/
https://user.github.io/repository/about
→ site: 'https://user.github.io'
→ base: '/repository/'
```

## 🚨 Critical Rule #1 – Base Path

### ABSOLUTE PROHIBITIONS:
- ❌ No internal URL should start with `/...`
- ❌ No hardcoded link: `href="/about"`
- ❌ No asset should start with `/assets/...`

### ABSOLUTE OBLIGATIONS:
- ✅ All internal links must go through `buildUrl()`
- ✅ `buildUrl()` must be based on `import.meta.env.BASE_URL`
- ✅ All components containing `href` must document this requirement
- ✅ All assets must use a `publicAsset()` helper or equivalent

### Why?
- GitHub Pages compatibility
- Subdirectory deployment compatibility
- Multiple sites compatibility
- No broken links in production

## 🔧 Astro Configuration

### File `astro.config.mjs`

**For a root site:**
```js
export default defineConfig({
  site: 'https://example.com',
  base: '/'
});
```

**For GitHub Pages (project site):**
```js
export default defineConfig({
  site: 'https://user.github.io',
  base: '/repository/'
});
```

**For a subdirectory:**
```js
export default defineConfig({
  site: 'https://example.com',
  base: '/my-project/'
});
```

## 🔗 Using `buildUrl()`

### In Astro components:

```astro
---
import { buildUrl } from '@/utils/url';
---

<!-- ❌ PROHIBITED -->
<a href="/about">About</a>
<a href="/fr/contact">Contact</a>

<!-- ✅ CORRECT -->
<a href={buildUrl('/about')}>About</a>
<a href={buildUrl('/fr/contact')}>Contact</a>
```

### In sections:

```astro
---
const { cta } = Astro.props;
---

<!-- ✅ CORRECT -->
<a href={buildUrl(cta.href)}>{cta.label}</a>
```

## 🖼️ Asset Management

### In components:

```astro
---
import { publicAsset } from '@/utils/url';
---

<!-- ❌ PROHIBITED -->
<img src="/assets/logo.svg" alt="Logo" />
<img src="/images/hero.jpg" alt="Hero" />

<!-- ✅ CORRECT -->
<img src={publicAsset('logo.svg')} alt="Logo" />
<img src={publicAsset('images/hero.jpg')} alt="Hero" />
```

### In content files:

```json
{
  "image": "team/john.jpg"
}
```

**The `publicAsset()` helper is applied in components**, not in content.

## ✅ Validation Tests

### Mandatory validation scripts:

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

### E2E Base Path Tests

E2E tests simulate subdirectory deployment:
```
BASE_PATH=/test-base/ pnpm test:e2e
```

They verify:
- ✅ All internal links work
- ✅ All images are loaded
- ✅ Navigation works
- ✅ Language switcher works

## 📋 Deployment Checklist

### Before deployment
- [ ] Correct `astro.config.mjs` configuration
- [ ] All links use `buildUrl()`
- [ ] All assets use `publicAsset()`
- [ ] `validate:source` OK
- [ ] `validate:build` OK
- [ ] `validate:links` OK
- [ ] `check-links` OK
- [ ] E2E base path tests OK

### GitHub Pages Deployment
- [ ] `site` configured: `https://user.github.io`
- [ ] `base` configured: `/repository/`
- [ ] Deployment branch configured
- [ ] GitHub Actions configured (if used)
- [ ] E2E base path tests pass with `/repository/`

### Subdirectory Deployment
- [ ] `base` configured with correct path
- [ ] Local tests with base path
- [ ] Verification of generated URLs
- [ ] Verification of assets

## 🎯 Summary

To guarantee base path compatibility:
1. **Always use `buildUrl()`** for internal links
2. **Always use `publicAsset()`** for assets
3. **Configure `astro.config.mjs` correctly**
4. **Rerun all tests** after any modification
5. **Test locally with base path** before deployment

**Respecting these rules guarantees a functional site in ALL deployment environments.**
