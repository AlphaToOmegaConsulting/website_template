---
title: "Tests & Validation"
description: "Comprendre et maîtriser la stratégie de tests du template"
lang: "fr"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Documentation des Tests – Alpha WebCore

> **Objectif :** Comprendre le rôle des tests, leur périmètre, leur comportement attendu, les scripts de validation et les checklists officielles.

## 🎯 Rôle global des tests

La suite de tests garantit :
- le bon fonctionnement du template dans **toutes les langues** (FR/EN)
- la compatibilité totale avec le **base path** (déploiement en sous-dossier, GitHub Pages)
- l'absence de liens cassés
- la conformité des collections de contenu
- la validité des structures i18n
- le bon fonctionnement des primitives UI
- l'accessibilité AA
- la stabilité du site après tout ajout ou modification

Les tests sont un **pilier obligatoire** : aucun changement ne peut être accepté si les tests ne sont pas 100% verts.

## 📦 Types de tests dans le template

### Tests unitaires (Vitest)

Ils vérifient :
- les primitives UI (Button, ButtonLink, Card, Input, Dialog)
- les classes et variants
- l'accessibilité de base
- le bon typage des props
- la validation des Content Collections

**Objectif fonctionnel :** garantir que l'UI est stable, simple, neutre et prédictible.

### Tests de validation (Collections + i18n)

Les tests vérifient :
- la symétrie parfaite FR/EN
- l'absence de fichiers obsolètes
- la conformité aux schémas Zod
- l'absence de types non valides
- l'intégrité des structures

**Objectif fonctionnel :** le contenu doit toujours être propre, conforme, et identique entre les langues.

### Tests E2E (Playwright)

Ils testent :
- la navigation
- le language-switcher
- les routes FR/EN
- le fonctionnement du site **avec base path simulé**
- l'accessibilité (axe-core)
- les liens internes
- l'affichage des sections dans les pages

**Objectif fonctionnel :** simuler exactement l'expérience utilisateur en production.

## 🔍 Scripts de validation (pipeline qualité)

### `validate:source`

**Objectif :** détecter **dans le code source** les violations suivantes :
- présence de liens internes écrits en dur (`href="/..."`)
- présence d'assets absolus (`/assets/...`)

Ce script doit échouer si :
- une URL interne commence par `/`
- un CTA est incorrect
- une section contient un lien écrit à la main

### `validate:build`

**Objectif :** analyser le **site généré** (`dist/`) et détecter des liens cassés ou incorrectement préfixés.

Ce script doit échouer si :
- une URL interne ne respecte pas le BASE_URL
- des assets ne sont pas accessibles
- une page génère une URL invalide

### `validate:links`

**Objectif :** pipeline complet
```
validate:source → build → validate:build
```
Il est exécuté en une seule commande.

### `check-links`

**Objectif :** vérifier les liens du site final généré.
- URLs internes → doivent fonctionner
- URLs externes → doivent répondre 200

Ce script doit être relancé **à chaque ajout ou modification de page, de section, de primitive ou de contenu**.

## ⚡ Quand mettre à jour les tests ?

Voici **tous les cas** où vous devez relancer les tests.

### Ajout ou modification d'une page

Impact :
- nouvelles routes FR/EN
- navigation modifiée
- sections affichées modifiées

Tests à mettre à jour :
- E2E navigation
- E2E routes
- tests FR/EN

### Ajout ou modification d'une section

Impact :
- contenu FR/EN
- data des sections
- UI
- navigation interne

Tests à mettre à jour :
- tests unitaires (si primitives utilisées)
- tests i18n ou collections
- tests E2E (si affichage modifié)

### Ajout ou modification d'une primitive

Impact :
- UI
- accessibilité
- liens internes

Tests à mettre à jour :
- tests unitaires
- tests accessibilité
- validate:source
- validate:build

### Ajout ou modification d'un asset

Impact :
- base path
- chargement des images
- liens

Tests à relancer :
- validate:build
- check-links
- tests E2E

### Modification du style

Impact :
- UI
- lisibilité
- accessibilité

Tests à relancer :
- accessibilité E2E
- tests unitaires (si primitives modifiées)
- validate:source (si liens)

## 📋 Checklists officielles

### Checklist "Aucun lien cassé"
- [ ] Aucun lien interne `href="/..."`
- [ ] Aucun chemin d'asset `/assets/...`
- [ ] Tous les liens internes passent par `buildUrl()`
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK

### Checklist "Contenu conforme"
- [ ] Fichiers FR/EN présents
- [ ] Structures FR/EN identiques
- [ ] Validation Zod OK
- [ ] Pas de fichiers obsolètes
- [ ] Tests des collections OK

### Checklist "Navigation"
- [ ] Navigation Header/Footer conforme
- [ ] Routes FR/EN présentes
- [ ] Switcher FR/EN fonctionnel
- [ ] E2E navigation OK

### Checklist "Base path"
- [ ] Simulation E2E base path OK
- [ ] Toutes les URLs correctement préfixées
- [ ] Aucune image cassée
- [ ] Aucun lien absolu

### Checklist "Accessibilité"
- [ ] Tests axe-playwright OK
- [ ] Contrastes conformes
- [ ] Focus visibles
- [ ] Formulaires accessibles

### Checklist "UI et primitives"
- [ ] Primitives testées unitairement
- [ ] Variants valides
- [ ] Tailles cohérentes
- [ ] Accessibilité intégrée

## 🎯 Résumé

La suite de tests est conçue pour garantir :
- la stabilité du template
- la neutralité du design
- la compatibilité totale base path
- la parité parfaite FR/EN
- l'absence de liens cassés
- la qualité de l'accessibilité
- la cohérence du contenu
- la fiabilité des primitives

Toute modification doit déclencher :
1. Exécution des scripts de validation
2. Exécution de tous les tests
3. Analyse des erreurs
4. Mise à jour des tests si nécessaire

Ce document est la **référence fonctionnelle officielle** de la stratégie de tests du template Alpha WebCore.
