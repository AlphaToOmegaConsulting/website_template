---
title: "Référentiel Composants"
description: "Inventaire complet des Sections, Primitives et Collections"
lang: "fr"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Référentiel – Sections / Primitives / Collections

> **Objectif :** Fournir un inventaire fonctionnel complet de tous les éléments du template Alpha WebCore.

## 📦 Référentiel des Sections

Chaque section est un **bloc de page réutilisable**, simple, générique, neutre. Elle reçoit toutes ses données via les Content Collections.

### Hero

**Rôle :** Introduire la page, afficher un titre, un sous-titre, une image optionnelle et un CTA.

**Props attendues :**
- `title`
- `subtitle?`
- `image?`
- `cta?` (texte + href)
- `variant?` (default | centered)

**Points critiques :**
- Toutes les URLs internes doivent être traitées via `buildUrl()`
- Aucun texte ne doit être en dur
- L'image doit venir du dossier `public/` (pas de `/assets/...`)

### Features

**Rôle :** Liste de features sous forme de grid ou de liste.

**Props attendues :**
- `title`
- `features[]` (chaque item = title, description, icon?)
- `columns?` (2 | 3)
- `variant?` (grid | list)

**Points critiques :**
- Aucun icon en `/assets/...`
- Structures FR/EN strictement identiques

### CTA

**Rôle :** Appeler l'utilisateur à l'action via un ou deux boutons.

**Props attendues :**
- `title`
- `description?`
- `primaryButton` (text, href)
- `secondaryButton?` (text, href)
- `variant?` (default | emphasized)

**Points critiques :**
- Tous les `href` internes doivent utiliser `buildUrl()`

### Events

**Rôle :** Afficher une liste d'événements.

**Props attendues :**
- `title`
- `description?`
- `maxEvents?`

**Points critiques :**
- Les events sont chargés depuis la collection `events`
- Filtrés par langue

### About

**Rôle :** Présentation générique (image + texte + stats).

**Props attendues :**
- `title`
- `description`
- `image?`
- `stats?[]` (value + label)

**Points critiques :**
- Aucun texte en dur
- Aucune image interne en `/assets/...`

### Team

**Rôle :** Liste de membres (photo + nom + rôle + bio).

**Props attendues :**
- `title`
- `members[]` (name, role, image?, bio?)
- `columns?` (2 | 3)

**Points critiques :**
- Les membres doivent être définis dans le contenu
- Images issues du dossier `public/`

## 🧩 Référentiel des Primitives UI

Les primitives sont des composants **atomiques**, indispensables, simples, et neutres. Elles ne contiennent jamais de contenu métier.

### Button

**Rôle :** Bouton générique.

**Props :**
- `variant?` (primary | secondary | ghost)
- `size?` (sm | md | lg)
- `disabled?`

**Contraintes :**
- Doit respecter les tests d'accessibilité
- Aucun texte métier en dur

### ButtonLink

**Rôle :** Lien stylisé comme un bouton.

**Props :**
- `href` (interne ou externe)
- `variant?`
- `size?`
- `target?`

**Contraintes :**
- Tous les liens internes doivent utiliser `buildUrl()`
- Attributs `rel` corrects si lien externe

### Card

**Rôle :** Conteneur stylisé.

**Props :**
- `variant?` (default | bordered | elevated)
- `padding?` (none | sm | md | lg)

**Contraintes :**
- Doit rester simple
- Pas de données métier

### Input

**Rôle :** Champ de formulaire simple.

**Props :**
- `type` (text | email | password | number)
- `label`
- `id`
- `error?`
- `required?`
- `disabled?`

**Contraintes :**
- Labels et ARIA obligatoires
- Accessibilité prioritaire

### Dialog

**Rôle :** Modal simple, accessible, générique.

**Props :**
- `id`
- `title`
- `description?`

**Contraintes :**
- Respect du focus trap
- Accessibilité stricte

## 📄 Référentiel des Content Collections

Les collections structurent **tout le contenu** du site.
Elles doivent respecter strictement les schémas Zod et la parité FR/EN.

### Collection `pages`

Décrit la page elle-même.

**Structure :**
- `title` (string)
- `description` (string)
- `lang` (fr | en)

**Contraintes :**
- Un fichier FR et un fichier EN sont obligatoires
- Structure des deux fichiers strictement identique
- Aucun contenu HTML

### Collection `sections`

Décrit **la liste et la configuration des sections** d'une page.

**Structure :**
- `type` (hero | features | cta | events | about | team)
- `visible` (boolean)
- `order` (number)
- `data` (objet)

**Contraintes :**
- FR et EN doivent être parallèles
- Toutes les valeurs textuelles doivent être dans la langue correspondante
- Aucun asset `/assets/...` dans `data`
- Si `data` contient des `href`, ils doivent être des **routes logiques** (ex: "/about") — le `buildUrl()` est appliqué dans les composants

### Collection `events`

Décrit les événements.

**Structure :**
- `title` (string)
- `date` (date)
- `location?` (string)
- `description` (string)
- `lang` (fr | en)

**Contraintes :**
- La langue doit être correcte
- Les dates doivent être valides
- Aucun contenu métier caché
- FR/EN doivent être cohérents

## 🔒 Règles Transversales (obligatoires)

Les règles suivantes s'appliquent **à toutes les sections, primitives et collections**.

### Parité FR/EN
- Toujours deux fichiers : FR + EN
- Structures strictement identiques
- Ordre des sections inchangé
- Tests de symétrie obligatoires

### Liens internes
- Aucun lien ne doit commencer par `/...`
- Tous les liens internes doivent passer par `buildUrl()` (appliqué dans les composants, jamais dans le contenu)

### Assets
- Aucun asset ne doit être référencé en `/assets/...`
- Les images doivent provenir du dossier `public/`
- Les composants appliquent un helper (`publicAsset()`) si nécessaire

### Base Path (règle critique)
- Tout doit fonctionner avec un site servi depuis un sous-dossier
- Le préfixe doit venir de `import.meta.env.BASE_URL`

### Minimalisme / Anti-Over-Engineering
- Aucune variante complexe
- Aucune fonctionnalité avancée non générique
- Aucun super composant abstrait

## 🎯 Résumé Exécutif

Le référentiel garantit :
- une connaissance claire et centralisée des capacités du template
- la conformité de tout ajout/modification
- la cohérence FR/EN
- le respect strict des règles de liens, assets et base path
- une structure stable pour les agents IA

Ce document est la **référence fonctionnelle officielle** pour tout développeur ou agent manipulant les Sections, Primitives ou Collections du template Alpha WebCore.
