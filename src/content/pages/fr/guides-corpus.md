---
title: "Corpus Fonctionnel"
description: "Document de référence absolu du template Alpha WebCore"
lang: "fr"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Corpus Fonctionnel Alpha WebCore

> **Document de référence absolu pour tous les développeurs et agents IA**

## 🎯 Principes Fondamentaux Immuables

### Philosophie du Template

Alpha WebCore est un template **Astro minimaliste, neutre, générique et multi-marques**.

**4 Principes non-négociables :**
1. **Minimalisme** : pas de fonctionnalités inutiles, pas de variantes complexes
2. **Généricité** : jamais de code métier
3. **Neutralité** : style léger, sans identité visuelle imposée
4. **Prévisibilité IA** : patterns simples, lisibles et systématiques

### Architecture en 4 Couches (Strictement Séparées)

| Couche | Rôle | Contenu autorisé |
|--------|------|------------------|
| **Pages** | Orchestration | Assemblage de sections, récupération de contenu |
| **Sections** | UI de blocs de page | Mise en page, composition de primitives |
| **Primitives** | UI atomique | Boutons, cartes, inputs, etc. |
| **Contenu** | Données du site | Textes, images, listes, CTA |

**Principe directeur :**
Pages orchestrent → Sections affichent → Primitives stylisent → Contenu définit les données

## 🚨 Règles Transversales Obligatoires (CRITIQUES)

### ⚠️ Règle #1 – Base Path (CRITIQUE)

**INTERDICTIONS ABSOLUES :**
- ❌ Aucune URL interne ne doit commencer par `/...`
- ❌ Aucun lien écrit en dur : `href="/about"`
- ❌ Aucun asset ne doit commencer par `/assets/...`

**OBLIGATIONS ABSOLUES :**
- ✅ Tous les liens internes doivent passer par `buildUrl()`
- ✅ `buildUrl()` doit être basé sur `import.meta.env.BASE_URL`
- ✅ Tous les composants contenant des `href` doivent documenter cette exigence
- ✅ Tous les assets doivent utiliser un helper `publicAsset()` ou équivalent

**Pourquoi ?**
- Compatibilité GitHub Pages
- Compatibilité déploiement en sous-dossier
- Compatibilité sites multiples
- Aucun lien cassé en production

### ⚠️ Règle #2 – Parité FR/EN (CRITIQUE)

**OBLIGATIONS ABSOLUES :**
- ✅ Toute page existe en **FR** ET **EN**
- ✅ Toute entrée de Content Collection existe en **FR** ET **EN**
- ✅ Les dossiers FR/EN doivent être strictement parallèles
- ✅ Les structures FR/EN doivent être strictement identiques
- ✅ L'ordre des sections doit être identique FR/EN
- ✅ Les tests vérifient automatiquement cette symétrie

**INTERDICTIONS :**
- ❌ Aucune page unilingue
- ❌ Aucune divergence structurelle entre FR et EN
- ❌ Aucun fichier orphelin dans une langue

### ⚠️ Règle #3 – Assets (CRITIQUE)

**INTERDICTIONS ABSOLUES :**
- ❌ Aucun chemin `/assets/...` dans le code
- ❌ Aucun chemin absolu commençant par `/`

**OBLIGATIONS ABSOLUES :**
- ✅ Tous les assets doivent être dans `public/`
- ✅ Les composants doivent utiliser `publicAsset('image.png')`
- ✅ Les images dans le contenu ne contiennent que le nom relatif : `"image": "team/john.jpg"`
- ✅ Le helper `publicAsset()` est appliqué dans les composants, jamais dans le contenu

### ⚠️ Règle #4 – Navigation Globale

**OBLIGATIONS :**
- ✅ Header, Footer, LanguageSwitcher, Navigation utilisent exclusivement `buildUrl()`
- ✅ Aucun lien absolu `/...`
- ✅ Parité FR/EN garantie
- ✅ Toutes les routes doivent être vérifiées par les tests E2E

### ⚠️ Règle #5 – Anti-Over-Engineering

**LIMITES STRICTES DU TEMPLATE :**
- 5 primitives maximum (Button, ButtonLink, Card, Dialog, Input)
- 6 sections maximum (Hero, Features, CTA, Events, About, Team)
- Options limitées (pas de carrousels, pas de timeline complexe, pas de grilles 4+ colonnes)
- Pas de design system avancé
- Pas de thèmes multiples
- Pas d'animations lourdes

**Toute extension doit être :**
- Simple
- Générique
- Testée
- Compatible base path
- Compatible FR/EN

## 📦 Règles des Sections

### Les 6 Sections Officielles

1. **Hero** : Introduction de page
2. **Features** : Liste de fonctionnalités
3. **CTA** : Appel à l'action
4. **Events** : Liste d'événements
5. **About** : Présentation
6. **Team** : Liste de membres

### Règles Communes à Toutes les Sections

**OBLIGATIONS :**
- ✅ Sections génériques et neutres
- ✅ Aucun contenu métier en dur
- ✅ Toutes les données viennent des props
- ✅ Toutes les props viennent des Content Collections
- ✅ Tous les liens internes utilisent `buildUrl()`
- ✅ Aucune image en `/assets/...`
- ✅ Parité FR/EN stricte

**INTERDICTIONS :**
- ❌ Aucun texte métier dans le composant
- ❌ Aucune logique métier
- ❌ Aucun lien écrit en dur
- ❌ Aucune image en chemin absolu

## 🧩 Règles des Primitives

### Les 5 Primitives Officielles

1. **Button** : Bouton générique
2. **ButtonLink** : Lien stylisé (doit utiliser `buildUrl()`)
3. **Card** : Conteneur stylisé
4. **Dialog** : Modal accessible
5. **Input** : Champ de formulaire

### Règles Communes à Toutes les Primitives

**OBLIGATIONS :**
- ✅ Composants atomiques, stables et très simples
- ✅ Aucun contenu métier
- ✅ Props strictement définies
- ✅ Accessibilité obligatoire (ARIA, labels, focus)
- ✅ Tests unitaires obligatoires

**INTERDICTIONS :**
- ❌ Aucune complexité disproportionnée
- ❌ Aucun texte métier imposé
- ❌ Aucune logique qui relève des sections

## 📄 Règles du Contenu

### Collection `pages`

**Structure obligatoire :**
```json
{
  "title": "string",
  "description": "string",
  "lang": "fr | en"
}
```

**Règles :**
- ✅ Un fichier FR et un fichier EN obligatoires
- ✅ Structure strictement identique
- ✅ Aucun contenu HTML

### Collection `sections`

**Structure obligatoire :**
```json
{
  "type": "hero | features | cta | events | about | team",
  "visible": "boolean",
  "order": "number",
  "data": "object"
}
```

**Règles :**
- ✅ FR et EN strictement parallèles
- ✅ Toutes les valeurs textuelles dans la langue correspondante
- ✅ Aucun asset `/assets/...` dans `data`
- ✅ Les `href` dans `data` sont des routes logiques : `"/about"` (pas `/fr/about`)
- ✅ `buildUrl()` appliqué dans les composants, jamais dans le contenu

### Collection `events`

**Structure obligatoire :**
```json
{
  "title": "string",
  "date": "date",
  "location?": "string",
  "description": "string",
  "lang": "fr | en"
}
```

**Règles :**
- ✅ Langue correcte
- ✅ Dates valides
- ✅ FR/EN cohérents

## ✅ Règles des Tests

### Types de Tests

1. **Tests unitaires (Vitest)** → primitives, collections, i18n
2. **Scripts de validation** → source, build, links
3. **Tests E2E (Playwright)** → navigation, base path, accessibilité

### Scripts de Validation Obligatoires

#### `validate:source`
Détecte dans le code source :
- ❌ Liens internes en dur (`href="/..."`)
- ❌ Assets absolus (`/assets/...`)

#### `validate:build`
Analyse le site généré (`dist/`) :
- ❌ Liens cassés
- ❌ URLs incorrectement préfixées

#### `validate:links`
Pipeline complet :
```
validate:source → build → validate:build
```

#### `check-links`
Vérifie les liens du site final :
- ✅ URLs internes fonctionnelles
- ✅ URLs externes répondent 200

### Quand Mettre à Jour les Tests ?

**TOUJOURS relancer les tests après :**
1. Ajout/modification d'une page
2. Ajout/modification d'une section
3. Ajout/modification d'une primitive
4. Ajout/modification de contenu
5. Modification du style
6. Ajout/modification d'un asset
7. Modification de la navigation

### Tests Obligatoires (100% Verts)

**Tous ces tests doivent passer :**
1. ✅ `validate:source`
2. ✅ `validate:build`
3. ✅ `validate:links`
4. ✅ `check-links`
5. ✅ Tests unitaires (collections, i18n, primitives)
6. ✅ Tests E2E (navigation, base path, accessibilité, FR/EN)

## 🎯 Résumé Exécutif (6 Principes Immuables)

1. **Parité FR/EN obligatoire**
2. **Tous les liens internes passent par `buildUrl()`**
3. **Aucun asset ne doit commencer par `/assets/...`**
4. **Tout doit fonctionner en sous-dossier (base path)**
5. **Les tests sont obligatoires et doivent être mis à jour**
6. **Architecture simple** : Pages → Sections → Primitives → Contenu

## 🔒 Validation Finale

**Avant toute modification, un développeur ou agent DOIT :**
1. ✅ Vérifier la parité FR/EN
2. ✅ Vérifier l'absence de `/...` dans les liens
3. ✅ Vérifier l'absence de `/assets/...`
4. ✅ Vérifier que `buildUrl()` est utilisé partout
5. ✅ Vérifier que les collections sont conformes aux schémas Zod
6. ✅ Relancer **tous** les scripts de validation
7. ✅ Relancer **tous** les tests (unitaires + E2E)
8. ✅ Vérifier que tous les tests sont **100% verts**

**Si un seul test échoue, la modification est INVALIDE.**

---

**Ce corpus est la SEULE source de vérité fonctionnelle pour Alpha WebCore.**
