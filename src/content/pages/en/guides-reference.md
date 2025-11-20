---
title: "Component Reference"
description: "Complete inventory of Sections, Primitives and Collections"
lang: "en"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Reference – Sections / Primitives / Collections

> **Objective:** Provide a complete functional inventory of all Alpha WebCore template elements.

## 📦 Sections Reference

Each section is a **reusable page block**, simple, generic, neutral. It receives all its data via Content Collections.

### Hero

**Role:** Introduce the page, display a title, subtitle, optional image and CTA.

**Expected props:**
- `title`
- `subtitle?`
- `image?`
- `cta?` (text + href)
- `variant?` (default | centered)

**Critical points:**
- All internal URLs must be processed via `buildUrl()`
- No text should be hardcoded
- Image must come from `public/` folder (no `/assets/...`)

### Features

**Role:** Feature list as grid or list.

**Expected props:**
- `title`
- `features[]` (each item = title, description, icon?)
- `columns?` (2 | 3)
- `variant?` (grid | list)

**Critical points:**
- No icon in `/assets/...`
- Strictly identical FR/EN structures

### CTA

**Role:** Call user to action via one or two buttons.

**Expected props:**
- `title`
- `description?`
- `primaryButton` (text, href)
- `secondaryButton?` (text, href)
- `variant?` (default | emphasized)

**Critical points:**
- All internal `href` must use `buildUrl()`

### Events

**Role:** Display event list.

**Expected props:**
- `title`
- `description?`
- `maxEvents?`

**Critical points:**
- Events are loaded from `events` collection
- Filtered by language

### About

**Role:** Generic presentation (image + text + stats).

**Expected props:**
- `title`
- `description`
- `image?`
- `stats?[]` (value + label)

**Critical points:**
- No hardcoded text
- No internal image in `/assets/...`

### Team

**Role:** Member list (photo + name + role + bio).

**Expected props:**
- `title`
- `members[]` (name, role, image?, bio?)
- `columns?` (2 | 3)

**Critical points:**
- Members must be defined in content
- Images from `public/` folder

## 🧩 UI Primitives Reference

Primitives are **atomic** components, essential, simple, and neutral. They never contain business content.

### Button

**Role:** Generic button.

**Props:**
- `variant?` (primary | secondary | ghost)
- `size?` (sm | md | lg)
- `disabled?`

**Constraints:**
- Must respect accessibility tests
- No hardcoded business text

### ButtonLink

**Role:** Link styled as button.

**Props:**
- `href` (internal or external)
- `variant?`
- `size?`
- `target?`

**Constraints:**
- All internal links must use `buildUrl()`
- Correct `rel` attributes if external link

### Card

**Role:** Styled container.

**Props:**
- `variant?` (default | bordered | elevated)
- `padding?` (none | sm | md | lg)

**Constraints:**
- Must remain simple
- No business data

### Input

**Role:** Simple form field.

**Props:**
- `type` (text | email | password | number)
- `label`
- `id`
- `error?`
- `required?`
- `disabled?`

**Constraints:**
- Mandatory labels and ARIA
- Priority accessibility

### Dialog

**Role:** Simple, accessible, generic modal.

**Props:**
- `id`
- `title`
- `description?`

**Constraints:**
- Focus trap respect
- Strict accessibility

## 📄 Content Collections Reference

Collections structure **all site content**.
They must strictly respect Zod schemas and FR/EN parity.

### `pages` Collection

Describes the page itself.

**Structure:**
- `title` (string)
- `description` (string)
- `lang` (fr | en)

**Constraints:**
- One FR file and one EN file are mandatory
- Strictly identical structure of both files
- No HTML content

### `sections` Collection

Describes **the list and configuration of page sections**.

**Structure:**
- `type` (hero | features | cta | events | about | team)
- `visible` (boolean)
- `order` (number)
- `data` (object)

**Constraints:**
- FR and EN must be parallel
- All text values must be in corresponding language
- No `/assets/...` asset in `data`
- If `data` contains `href`, they must be **logical routes** (e.g.: "/about") — `buildUrl()` is applied in components

### `events` Collection

Describes events.

**Structure:**
- `title` (string)
- `date` (date)
- `location?` (string)
- `description` (string)
- `lang` (fr | en)

**Constraints:**
- Language must be correct
- Dates must be valid
- No hidden business content
- FR/EN must be consistent

## 🔒 Transversal Rules (mandatory)

The following rules apply **to all sections, primitives and collections**.

### FR/EN Parity
- Always two files: FR + EN
- Strictly identical structures
- Unchanged section order
- Mandatory symmetry tests

### Internal links
- No link should start with `/...`
- All internal links must go through `buildUrl()` (applied in components, never in content)

### Assets
- No asset should be referenced in `/assets/...`
- Images must come from `public/` folder
- Components apply a helper (`publicAsset()`) if necessary

### Base Path (critical rule)
- Everything must work with a site served from a subdirectory
- Prefix must come from `import.meta.env.BASE_URL`

### Minimalism / Anti-Over-Engineering
- No complex variant
- No advanced non-generic functionality
- No super abstract component

## 🎯 Executive Summary

The reference guarantees:
- clear and centralized knowledge of template capabilities
- compliance of any addition/modification
- FR/EN consistency
- strict respect of link, asset and base path rules
- stable structure for AI agents

This document is the **official functional reference** for any developer or agent manipulating Sections, Primitives or Collections of the Alpha WebCore template.
