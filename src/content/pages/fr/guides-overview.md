---
title: "Vue d'Ensemble du Template"
description: "Architecture, principes et vue d'ensemble du template Alpha WebCore"
lang: "fr"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Vue d'Ensemble du Template Alpha WebCore

## 🎯 Finalité

Alpha WebCore est un template **Astro minimaliste, neutre, générique et multi-marques**, conçu pour :
- créer des sites statiques très rapidement ;
- garantir une architecture uniforme et prévisible ;
- simplifier le travail des agents IA ;
- assurer le support natif du **déploiement en sous-dossier** (GitHub Pages, sites multiples) ;
- produire du code propre, stable, testé et extensible sans over-engineering.

## 🏛️ Philosophie Fondamentale

Le template suit 4 principes fondamentaux :
- **Minimalisme** : pas de fonctionnalités inutiles, pas de variantes complexes
- **Généricité** : jamais de code métier
- **Neutralité** : style léger, sans identité visuelle imposée
- **Prévisibilité IA** : patterns simples, lisibles et systématiques

## 📐 Architecture en 4 Couches

L'architecture repose sur 4 couches strictement séparées :

| Couche | Rôle | Contenu autorisé |
|-------|------|------------------|
| **Pages** | Orchestration | Assemblage de sections, récupération de contenu |
| **Sections** | UI de blocs de page | Mise en page, composition de primitives |
| **Primitives** | UI atomique | Boutons, cartes, inputs, etc. |
| **Contenu** | Données du site | Textes, images, listes, CTA |

**Principe directeur :**
Pages orchestrent → Sections affichent → Primitives stylisent → Contenu définit les données

## 🚨 Les 6 Principes Immuables

1. **Parité FR/EN obligatoire** : toute page, toute collection existe en FR ET EN
2. **Tous les liens internes passent par `buildUrl()`** : interdiction absolue de `/...`
3. **Aucun asset ne commence par `/assets/...`** : utiliser `publicAsset()`
4. **Tout doit fonctionner en sous-dossier** (base path, GitHub Pages)
5. **Les tests sont obligatoires** et doivent être 100% verts
6. **Architecture simple** : Pages → Sections → Primitives → Contenu

## 📦 Composants Officiels

### Sections (6 maximum)
1. **Hero** : Introduction de page
2. **Features** : Liste de fonctionnalités
3. **CTA** : Appel à l'action
4. **Events** : Liste d'événements
5. **About** : Présentation
6. **Team** : Liste de membres

### Primitives (5 maximum)
1. **Button** : Bouton générique
2. **ButtonLink** : Lien stylisé (doit utiliser `buildUrl()`)
3. **Card** : Conteneur stylisé
4. **Dialog** : Modal accessible
5. **Input** : Champ de formulaire

### Content Collections
- **pages** : Méta-informations des pages FR/EN
- **sections** : Configuration des sections des pages
- **events** : Liste d'événements

## 🔒 Règles Transversales

### Liens
- ❌ Interdiction des liens internes en `/...`
- ✅ Utilisation obligatoire de `buildUrl()`
- ✅ Vérification via tests et scripts

### Assets
- ❌ Interdiction absolue des chemins `/assets/...`
- ✅ Utilisation obligatoire de `publicAsset()`

### Parité FR/EN
- ✅ Toujours produire les deux versions
- ✅ Toujours vérifier la symétrie

### Tests
- ✅ Relancer après toute modification
- ✅ 100% verts obligatoire

## 📚 Documentation

Pour approfondir :
- [Corpus Fonctionnel](/guides/corpus) - Référence absolue
- [Référentiel Composants](/guides/reference) - Inventaire complet
- [Tests](/guides/tests) - Documentation tests
- [Base Path](/guides/base-path) - Déploiement en sous-dossier
