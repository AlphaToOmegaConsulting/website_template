---
title: "Ajouter une Primitive"
description: "Guide pratique pour ajouter un composant UI atomique dans le template"
lang: "fr"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# How-To – Ajouter une Primitive UI

> **Objectif :** Décrire précisément comment ajouter une nouvelle primitive UI (Button, Card, Input, etc.) dans le template Alpha WebCore.

## 🎯 Rôle d'une Primitive

Une primitive est un **élément UI fondamental**, utilisé par les sections pour construire l'interface.
Elle doit être :
- simple
- neutre
- minimaliste
- accessible
- entièrement contrôlée via ses props
- sans contenu métier en dur
- sans logique complexe

Exemples : Button, ButtonLink, Card, Dialog, Input.

## 📝 Étape 1 – Définir la Primitive

Créer une primitive implique d'abord de définir son rôle fonctionnel :
- À quoi sert-elle ?
- Quel besoin générique remplit-elle ?
- Quels usages doivent rester possibles ?
- Quels usages doivent être interdits (over-engineering) ?

### Règles fonctionnelles :
- Toute primitive doit avoir un **scope limité**
- Pas de styles complexes ou dynamiques
- Pas de comportements qui relèvent des sections
- Pas de dépendance aux content collections

## 📦 Étape 2 – Définir les props officielles

Les props doivent :
- être **strictement définies**
- couvrir uniquement les usages simples
- éviter toute complexité disproportionnée

Exemples de props typiques :
- `variant` (ex : primary / secondary / ghost)
- `size` (ex : sm / md / lg)
- `disabled`
- `href` (si la primitive est un lien)
- `id`, `label` (pour l'accessibilité)

### Règles fonctionnelles :
- Les primitives **ne reçoivent jamais du contenu métier**
- Elles ne contiennent aucun texte imposé (sauf labels d'accessibilité neutres)

## 🔗 Étape 3 – Vérifier la compatibilité Base Path

Certaines primitives manipulent des liens :
- `ButtonLink`
- un potentiel composant `Link` générique
- toute primitive avec un `href`

### Règle critique :

**Toute primitive contenant un lien interne doit obligatoirement utiliser `buildUrl()` pour les URLs internes.**

Impact fonctionnel :
- compatibilité GitHub Pages
- compatibilité sous-dossier
- aucune URL en dur `/...` dans les primitives

> Si la primitive est *purement visuelle* (Button, Card, Dialog, Input), cette étape est sans impact.

## ♿ Étape 4 – Accessibilité

Chaque primitive doit intégrer des règles minimales d'accessibilité :
- attributs ARIA si nécessaire
- labels associés
- états `disabled`
- focus visible
- cohérence avec le design neutre du template

Le niveau d'accessibilité final est vérifié via les tests E2E (axe-playwright).

## 🎨 Étape 5 – Intégration dans les Sections

Une primitive n'est réellement utile que si elle est intégrée dans des sections :
- CTA utilise Button / ButtonLink
- Features peut utiliser Card
- Team peut utiliser Card
- Hero peut utiliser ButtonLink
- Dialog est utilisé par certaines sections

### Règles fonctionnelles :
- Les sections ne doivent pas contourner les primitives
- Toute UI récurrente doit devenir une primitive

## 📚 Étape 6 – Mise à jour du Référentiel

Le document **Référence des Primitives** doit être mis à jour avec :
- le nom de la primitive
- son rôle
- ses props
- ses restrictions
- si elle contient des liens internes
- si elle doit respecter les règles `buildUrl()`

## ✅ Étape 7 – Mise à jour des tests

Ajouter une primitive implique d'ajouter ou modifier les tests :

### Tests impactés :
1. **Tests unitaires** : styles, variants, tailles, accessibilité
2. **validate:source** : s'assurer qu'aucun lien interne en `/...` n'a été introduit
3. **validate:build** : vérifier que la primitive ne génère pas de mauvais liens
4. **validate:links** et **check-links** : valider l'intégration des primitives contenant des `href`
5. **Tests E2E** : accès clavier, a11y, compatibilité base path (si `href`)

## 📋 Checklists Officielles

### Checklist "Primitive"
- [ ] Rôle fonctionnel clair et limité
- [ ] Aucune donnée métier
- [ ] Props simples, strictes et cohérentes
- [ ] Aucun style complexe ou inutile
- [ ] Respect du minimalisme UI

### Checklist "Liens (si applicable)"
- [ ] Aucun `href="/..."`
- [ ] Tous les liens internes passent par `buildUrl()`

### Checklist "Accessibilité"
- [ ] Focus visible
- [ ] Labels cohérents (si Input)
- [ ] États d'erreur ou disabled fonctionnels

### Checklist "Tests"
- [ ] Tests unitaires créés
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] Tests E2E OK

### Checklist "Référentiel"
- [ ] Primitive ajoutée dans le document de référence
- [ ] Description complète

## 🎯 Résumé

Ajouter une primitive consiste à :
1. Définir une UI générique simple
2. Ajouter des props minimalistes et cohérentes
3. Respecter l'accessibilité
4. Supporter la gestion des liens internes si applicable (avec `buildUrl()`)
5. Intégrer la primitive dans les sections
6. Mettre à jour le Référentiel
7. Mettre à jour et relancer tous les tests

Ce guide est la référence fonctionnelle officielle pour l'ajout de toute nouvelle primitive UI.
