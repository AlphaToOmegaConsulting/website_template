# Alpha WebCore – Specifications Fonctionnelles (Document Central)

> **Version : 4.0 – Document central unique regroupant toutes les règles fonctionnelles du template**
> **Objectif : Définir ce que le template contient, comment il fonctionne, et quelles règles gouvernent son évolution.**

Ce document constitue la **source de vérité fonctionnelle** du template **Alpha WebCore**. Tous les How-To, tests, agents et extensions doivent s’y conformer.

---
# 1. Vue d’ensemble du Template

## 1.1 Finalité
Alpha WebCore est un template **Astro minimaliste, neutre, générique et multi-marques**, conçu pour :
- créer des sites statiques très rapidement ;
- garantir une architecture uniforme et prévisible ;
- simplifier le travail des agents IA ;
- assurer le support natif du **déploiement en sous-dossier** (GitHub Pages, sites multiples) ;
- produire du code propre, stable, testé et extensible sans over-engineering.

## 1.2 Philosophie
Le template suit 4 principes fondamentaux :
- **Minimalisme** : pas de fonctionnalités inutiles, pas de variantes complexes.
- **Généricité** : jamais de code métier.
- **Neutralité** : style léger, sans identité visuelle imposée.
- **Prévisibilité IA** : patterns simples, lisibles et systématiques.

Ce document ne décrit pas le code, mais les **capacités fonctionnelles** du template.

---
# 2. Architecture Fonctionnelle
L’architecture repose sur 4 couches strictement séparées :

| Couche | Rôle | Contenu autorisé |
|-------|------|------------------|
| **Pages** | Orchestration | Assemblage de sections, récupération de contenu |
| **Sections** | UI de blocs de page | Mise en page, composition de primitives |
| **Primitives** | UI atomique | Boutons, cartes, inputs, etc. |
| **Contenu** | Données du site | Textes, images, listes, CTA |

Principe directeur :
**Les pages orchestrent → les sections affichent → les primitives stylisent → le contenu définit les données.**

---
# 3. Principes Fonctionnels Clés

## 3.1 Internationalisation (FR/EN)
Le template impose une **parité parfaite** entre les deux langues.
- Toute page existe en **FR** ET **EN**.
- Toute entrée de Content Collection existe en **FR** ET **EN**.
- Les dossiers FR/EN doivent être strictement parallèles.
- Les tests vérifient automatiquement cette symétrie.

## 3.2 Support Multi‑Environnement
Le template doit fonctionner avec :
- un **site racine**, ex. `https://example.com` ;
- un **sous-dossier**, ex. `https://example.com/projet/` ;
- un **project site GitHub Pages**, ex. `https://user.github.io/repository/` ;
- un **custom domain**, ex. `https://mydomain.com`.

Tout doit être compatible sans modification du code principal.

## 3.3 Base Path – Règle Critique
Le template doit **toujours** respecter le base path Astro.

Règles :
1. Aucune URL interne ne doit commencer par `/...`.
2. Tous les liens internes doivent passer par un utilitaire fonctionnel de type :
   - `buildUrl('/about')` ou équivalent.
3. `buildUrl()` doit être basé sur `import.meta.env.BASE_URL`.
4. Tous les composants contenant des `href` doivent documenter cette exigence.

Cette règle garantit que le site fonctionne aussi bien en racine que dans un sous-dossier.

## 3.4 Gestion des Assets
- **Interdiction absolue** d’écrire des chemins d’assets en `/assets/...`.
- Les assets du dossier `public/` doivent être appelés via un helper (ex. `publicAsset('logo.svg')`).
- Toute image utilisée dans une section, un contenu ou un style doit respecter cette règle.
- Elle conditionne : fonctionnement local, fonctionnement en base path, compatibilité GitHub Pages.

## 3.5 Navigation Globale
Les composants globaux (Header, Footer, LanguageSwitcher, Navigation, pages Library/Guides/Demo) doivent :
- utiliser exclusivement `buildUrl()` pour tous les liens internes ;
- ne contenir aucun lien absolu `/...` ;
- garantir la parité FR/EN.

## 3.6 Anti‑Over‑Engineering
Le template limite volontairement les fonctionnalités :
- 5 primitives
- 6 sections
- options limitées (pas de carrousels, pas de timeline complexe, pas de grilles 4+ colonnes)
- pas de design system avancé
- pas de thèmes multiples

Toute extension doit respecter ces principes.

---
# 4. Composants Fonctionnels du Template

Le template est constitué de trois familles d’éléments : **primitives**, **sections**, **collections**.

## 4.1 Primitives UI
Ce sont les composants atomiques, stables et très simples :
- Button
- ButtonLink *(contient des `href`, donc doit utiliser `buildUrl`)*
- Card
- Dialog
- Input

**Rôle fonctionnel** : fournir une UI cohérente dans tout le template.

## 4.2 Sections (6)
Les sections sont des blocs de page complets :
- Hero
- Features
- CTA
- Events
- About
- Team

Elles doivent :
- rester génériques ;
- recevoir tout leur contenu via props ;
- n’inclure aucun contenu métier en dur ;
- respecter les règles de liens (`buildUrl()` pour les CTA).

## 4.3 Content Collections
Le template utilise 3 content collections :
- **pages** : méta-informations des pages FR/EN ;
- **sections** : configuration des sections des pages ;
- **events** : liste d’événements.

Règles fonctionnelles :
- validation stricte via schémas Zod ;
- parité FR/EN ;
- structure identique entre les langues ;
- aucun chemin d’asset absolu.

---
# 5. Configuration Astro (Fonctionnelle)
La documentation doit expliquer clairement :
- comment fonctionne la propriété `site` ;
- quand utiliser `base` ;
- comment Astro construit les URLs en fonction de ces deux paramètres ;
- comment `import.meta.env.BASE_URL` est généré ;
- pourquoi il est obligatoire d’utiliser `buildUrl()`.

Exemples fonctionnels à intégrer :
- Site racine → `base: '/'` ;
- Sous-dossier → `base: '/project/'` ;
- GitHub Pages → `site: 'https://user.github.io', base: '/repo/'`.

---
# 6. Règles Transversales (Obligatoires)
Ces règles doivent être suivies dans **tous les documents**, **toutes les pages**, **toutes les sections**, **toutes les actions**.

## 6.1 Liens
- Interdiction des liens internes écrits en dur (`href="/..."`).
- Utilisation obligatoire de `buildUrl()`.
- Vérification via tests et scripts.

## 6.2 Assets
- Interdiction absolue des chemins `/assets/...`.
- Utilisation obligatoire d’un helper `publicAsset()`.

## 6.3 Parité FR/EN
- Toujours produire les deux versions.
- Toujours vérifier la symétrie.

## 6.4 Tests à mettre à jour en cas de modification
Les tests doivent être mis à jour si :
- une page est ajoutée ou supprimée ;
- une section est ajoutée ou modifiée ;
- la navigation change ;
- des assets sont ajoutés ;
- des collections sont modifiées.

## 6.5 Base Path
- Toute fonctionnalité doit fonctionner avec un site déployé en sous-dossier.
- Les E2E doivent intégrer des scénarios base path.

---
# 7. Scripts de Validation (Fonctionnel)
Les scripts suivants sont des **éléments essentiels du fonctionnement du template**.

- **validate:source** : empêche les liens `/...` dans le code source.
- **validate:build** : empêche les liens invalides dans le HTML généré.
- **validate:links** : pipeline complet de validation.
- **check-links** : vérifie les liens du site final.
- **Tests E2E base path** : vérifient le comportement du site en sous-dossier.

**Tout ajout de page, section, primitive, contenu ou navigation doit déclencher l’exécution de ces scripts.**

---
# 8. Déploiement (Fonctionnel)
Le document doit expliquer :
- comment construire le site ;
- comment prévisualiser en local avec base path ;
- comment déployer sur GitHub Pages ;
- pourquoi les liens ne doivent jamais être absolus.

---
# 9. Limites Fonctionnelles du Template
Alpha WebCore ne contient volontairement pas :
- de carrousel ;
- de timeline ;
- de masonry ;
- de FAQ complexes ;
- de design system avancé ;
- d’animations lourdes.

Toute extension future doit être :
- simple ;
- générique ;
- testée ;
- compatible base path ;
- compatible FR/EN.

---
# 10. Résumé Exécutif
Le template Alpha WebCore fonctionne selon 6 principes immuables :
1. **Parité FR/EN obligatoire**.
2. **Tous les liens internes passent par `buildUrl()`**.
3. **Aucun asset ne doit commencer par `/assets/...`**.
4. **Tout doit fonctionner en sous-dossier (base path)**.
5. **Les tests sont obligatoires et doivent être mis à jour**.
6. **Architecture simple : Pages → Sections → Primitives → Contenu**.

Ce document prime sur tout autre. Toute fonctionnalité doit s’y conformer strictement.

