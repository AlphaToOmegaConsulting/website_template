---
title: "Modifier le Style"
description: "Guide pratique pour personnaliser l'apparence du template"
lang: "fr"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# How-To – Modifier le Style du Template

> **Objectif :** Décrire comment personnaliser le style du template Alpha WebCore tout en respectant toutes les règles transversales.

## 🎯 Rôle du Style

Le style repose sur 3 éléments fonctionnels :
1. **Tokens CSS** → définissent la marque (couleurs, typo, espacements)
2. **Classes Tailwind** → définissent la majorité de la mise en forme
3. **Primitives UI** → composants atomiques stylés de manière neutre

Le style doit rester :
- minimaliste
- neutre
- cohérent
- facile à personnaliser sans casser l'architecture

## 🎨 Étape 1 – Modifier les Tokens CSS

Les tokens sont la **source officielle de vérité visuelle** du template.
Ils définissent :
- couleurs de marque
- couleurs sémantiques
- typographies
- espacements globaux

### Règles fonctionnelles :
- Les tokens doivent rester **simples et peu nombreux**
- Aucune variable supplémentaire complexe ne doit être ajoutée
- Les tokens remplacent le branding **sans affects sur l'architecture**

Exemples de tokens modifiables fonctionnellement :
- `--brand-primary`
- `--brand-secondary`
- `--font-heading`
- `--font-body`
- `--spacing-section`

## 🖌️ Étape 2 – Modifier les classes Tailwind

Les composants du template utilisent Tailwind pour la plupart des styles.
Une modification peut concerner :
- la couleur d'un texte
- le padding d'une section
- les marges entre éléments
- la grille d'un layout

### Règles fonctionnelles :
- Les classes Tailwind doivent rester **simples**
- Aucune abstraction complexe ne doit être introduite
- Ne jamais modifier directement un composant pour y ajouter du texte métier
- Les nouvelles classes doivent rester cohérentes avec l'identité neutre du template

## 🔤 Étape 3 – Modifier la typographie

La typographie est contrôlée par :
- les tokens CSS (`--font-heading`, `--font-body`)
- les classes Tailwind (`font-sans`, `font-serif`, etc.)

### Règles :
- Toujours modifier la typo via les tokens, jamais directement dans un composant
- Garder une cohérence entre titres et corps
- Éviter d'ajouter plusieurs fonts externes : garder le template simple

## 🖼️ Étape 4 – Modifier les images, logos ou backgrounds

Ces éléments sont toujours dans le dossier `public/`.

### ⚠️ Règles fonctionnelles critiques :
- **Interdiction absolue** d'utiliser `/assets/...`
- Ne jamais utiliser de chemin commençant par `/...`
- Toute image stylée doit être intégrée via un helper (ex : `publicAsset()`)
- Les backgrounds doivent être compatibles base path

### Cas typiques :
- Logo remplacé dans `public/logo.svg`
- Image de hero modifiée dans `public/hero.jpg`
- Background ajouté via une classe Tailwind

## 🎨 Étape 5 – Ajouter des styles custom légers

Dans certains cas, quelques styles custom sont nécessaires.
Ils doivent être intégrés dans :
- `tokens.css` (si c'est un token)
- `global.css` (si c'est un style global simple)

### Règles :
- Les styles custom doivent être minimaux
- Ne jamais utiliser de CSS complexe
- Ne jamais introduire un design system secondaire
- Ne pas créer de cascades longues
- Garder une logique simple et maintenable

## 🔗 Étape 6 – Vérifier les liens internes

Certaines modifications de style peuvent introduire des boutons ou des liens supplémentaires.

### Règle critique :
- **Tout lien interne doit utiliser `buildUrl()` dans la primitive ButtonLink ou dans la section**
- Aucun lien interne ne doit apparaître comme `/something`

## ✅ Étape 7 – Mise à jour des tests

Toute modification du style peut impacter :
- accessibilité
- structure
- visibilité de sections
- boutons
- contrastes

### Tests à relancer obligatoirement :
1. **validate:source**
2. **validate:build**
3. **validate:links**
4. **check-links**
5. Tests unitaires : primitives stylées
6. Tests E2E : accessibilité (axe), navigation, base path, pages FR/EN

Tout doit être 100% vert.

## 📋 Checklists Officielles

### Checklist "Tokens"
- [ ] Tokens simples et cohérents
- [ ] Pas de variables inutiles
- [ ] Modification à impact global documentée

### Checklist "Tailwind"
- [ ] Classes Tailwind simples
- [ ] Pas de design complexe
- [ ] Styles cohérents avec le template

### Checklist "Images et assets"
- [ ] Aucun `/assets/...`
- [ ] Aucun chemin `/...`
- [ ] Assets compatibles base path

### Checklist "Tests"
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] Tests E2E OK

## 🎯 Résumé

Modifier le style consiste à :
1. Modifier les tokens si changement de marque
2. Modifier les classes Tailwind si besoin visuel
3. Garder une neutralité stricte
4. Ne jamais casser le minimalisme du template
5. Gérer les images via `public/` + helper base path
6. Maintenir les règles de liens (`buildUrl`)
7. Relancer tous les tests

Ce guide est la référence fonctionnelle officielle pour toute modification de style.
