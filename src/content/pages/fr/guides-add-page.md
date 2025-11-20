---
title: "Ajouter une Page"
description: "Guide pratique pour ajouter une nouvelle page FR/EN dans le template"
lang: "fr"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# How-To – Ajouter une Page (FR + EN)

> **Objectif :** Décrire, étape par étape et de façon 100% fonctionnelle, comment ajouter une nouvelle page dans le template Alpha WebCore, tout en respectant toutes les règles transversales : FR/EN, base path, liens internes, assets, navigation et tests.

## 🎯 Objectif du guide

Une « page » dans Alpha WebCore est une route affichée dans `/fr/...` et `/en/...`. Elle joue un rôle d'**orchestration** :
- elle choisit quelles sections sont affichées ;
- elle contrôle l'ordre des sections ;
- elle récupère les données des collections ;
- elle définit le layout ;
- elle ne contient **jamais** de logique complexe.

Créer une page implique **7 responsabilités fonctionnelles** :
1. Créer la version FR **et** EN (symétrie obligatoire)
2. Respecter la structure des dossiers
3. Configurer la page dans les content collections
4. Intégrer les sections
5. Ajouter la page dans la navigation globale
6. Vérifier les liens, les assets et les tests
7. Relancer tous les tests

## 📝 Étape 1 – Création de la page FR et EN

### Arborescence obligatoire

Toutes les pages doivent suivre cette structure :
```
src/pages/
  ├── fr/
  │    └── nouvelle-page.astro
  ├── en/
  │    └── new-page.astro
  └── index.astro  (redirection / → /fr/)
```

### Règles fonctionnelles :
- Les pages FR et EN **doivent exister ensemble**
- Le nommage peut être différent (ex : `nouvelle-page` vs `new-page`)
- Les deux pages doivent utiliser **exactement la même structure** de sections

## 📦 Étape 2 – Déclaration de la page dans la collection `pages`

La page doit être ajoutée dans la content collection `pages` sous deux fichiers :
- un fichier FR (`lang: 'fr'`)
- un fichier EN (`lang: 'en'`)

Chaque fichier doit contenir :
- `title`
- `description`
- `lang`

### Rappel :
- Ces données sont affichées dans les meta tags
- Elles sont utilisées par les sections (si besoin)
- Les tests unitaires vérifient que les deux langues existent

## 🎨 Étape 3 – Définir les sections de la nouvelle page

Chaque page doit définir une liste de sections via la content collection `sections`.

Pour la page FR et la page EN, il faut **un fichier séparé** :
```
src/content/sections/
  ├── page-nouvelle.json
  ├── page-nouvelle-en.json
```

Chaque fichier contient :
- la liste ordonnée des sections
- le type de section (`hero`, `features`, etc.)
- les données spécifiques

### Règles :
- Les sections FR et EN doivent être **strictement parallèles**
- Toute donnée dans `data` doit être **dépendante de la langue**
- Aucune image ne doit utiliser `/assets/...`

## 🔧 Étape 4 – Orchestration dans la page

Dans la page (FR et EN), il faut :
- charger les données via `getEntry()` ou équivalent
- assembler les sections dans l'ordre défini
- utiliser `BaseLayout`

### Règles fonctionnelles :
- La page ne doit **pas** contenir de contenu métier en dur
- Toute logique doit être minimale : assembler uniquement

## 🔗 Étape 5 – Ajouter la page dans la navigation

Si la page doit être accessible depuis le Header, Footer, Navigation ou toute autre interface, il faut :
- ajouter une entrée dans les arrays de navigation
- garantir **la parité FR/EN**
- utiliser **obligatoirement** `buildUrl()` pour chaque lien interne

### IMPORTANT – Règle des liens internes :

**Interdiction absolue d'écrire :**
```astro
<a href="/fr/nouvelle-page">...</a>
```
OU
```astro
<a href="/nouvelle-page">...</a>
```

**Obligation fonctionnelle :**
```astro
<a href={buildUrl('/nouvelle-page')}>...</a>
```

Cette règle garantit la compatibilité avec :
- GitHub Pages
- le déploiement dans un sous-dossier
- l'utilisation de `import.meta.env.BASE_URL`

## 🖼️ Étape 6 – Vérifier les assets

Si la page utilise des images :
- ne JAMAIS écrire `/assets/...`
- utiliser un helper de type : `publicAsset('image.png')`

Raisons fonctionnelles :
- compatibilité base path
- pas de liens cassés sur GitHub Pages
- cohérence des chemins en build local

## ✅ Étape 7 – Mise à jour des tests (obligatoire)

Créer une page implique de relancer plusieurs tests car :
- une nouvelle route FR/EN existe
- la navigation change
- de nouvelles sections sont utilisées
- de nouveaux contenus FR/EN sont ajoutés

### Tests à relancer :
1. **validate:source**
2. **validate:build**
3. **validate:links**
4. **check-links**
5. **Tests unitaires** (collections, i18n)
6. **Tests E2E** (navigation + base path)

Tous doivent être **100% passants**.

## 📋 Checklists officielles

### Checklist "Création d'une page"
- [ ] Page FR créée
- [ ] Page EN créée
- [ ] Fichier `pages` FR créé
- [ ] Fichier `pages` EN créé

### Checklist "Sections"
- [ ] Sections FR créées
- [ ] Sections EN créées
- [ ] Ordre identique FR/EN
- [ ] Données cohérentes dans les deux langues

### Checklist "Liens"
- [ ] Aucun lien interne en `/...`
- [ ] Tous les liens internes passent par `buildUrl()`

### Checklist "Assets"
- [ ] Aucun asset en `/assets/...`
- [ ] Tous les assets passent par `publicAsset()`

### Checklist "Tests"
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK
- [ ] Tests unitaires OK
- [ ] Tests E2E base path OK

## 🎯 Résumé

Créer une page consiste à :
1. **Créer FR + EN** (toujours ensemble)
2. **Déclarer les pages dans la collection**
3. **Créer les fichiers de sections FR + EN**
4. **Assembler les sections dans la page**
5. **Mettre à jour la navigation** (avec `buildUrl()`)
6. **Vérifier les assets**
7. **Relancer tous les scripts + tests**

Ce processus garantit :
- une navigation parfaite
- un support complet du base path
- un site robuste en production
- une parité FR/EN irréprochable
- zéro lien cassé dans tout le template

Ce guide est la référence fonctionnelle officielle pour l'ajout d'une nouvelle page.
