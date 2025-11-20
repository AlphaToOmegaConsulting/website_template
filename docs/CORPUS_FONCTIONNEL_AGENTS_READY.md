# 📘 **Corpus Fonctionnel Alpha WebCore – Version consolidée (Agents Ready)**

> **Version : 1.0 Consolidée**
> **Statut : Document de référence absolu pour tous les agents IA**
> **Objectif : Centraliser TOUTES les règles fonctionnelles obligatoires du template Alpha WebCore**

---

## 🎯 **1. PRINCIPES FONDAMENTAUX IMMUABLES**

### 1.1 Philosophie du Template
Alpha WebCore est un template **Astro minimaliste, neutre, générique et multi-marques**.

**4 Principes non-négociables :**
1. **Minimalisme** : pas de fonctionnalités inutiles, pas de variantes complexes
2. **Généricité** : jamais de code métier
3. **Neutralité** : style léger, sans identité visuelle imposée
4. **Prévisibilité IA** : patterns simples, lisibles et systématiques

### 1.2 Architecture en 4 Couches (Strictement Séparées)

| Couche | Rôle | Contenu autorisé |
|--------|------|------------------|
| **Pages** | Orchestration | Assemblage de sections, récupération de contenu |
| **Sections** | UI de blocs de page | Mise en page, composition de primitives |
| **Primitives** | UI atomique | Boutons, cartes, inputs, etc. |
| **Contenu** | Données du site | Textes, images, listes, CTA |

**Principe directeur :**
Pages orchestrent → Sections affichent → Primitives stylisent → Contenu définit les données

---

## 🚨 **2. RÈGLES TRANSVERSALES OBLIGATOIRES (CRITIQUES)**

### 2.1 ⚠️ Règle #1 – Base Path (CRITIQUE)

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

**Exemples de configuration :**
- Site racine → `base: '/'`
- Sous-dossier → `base: '/project/'`
- GitHub Pages → `site: 'https://user.github.io', base: '/repo/'`

---

### 2.2 ⚠️ Règle #2 – Parité FR/EN (CRITIQUE)

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

---

### 2.3 ⚠️ Règle #3 – Assets (CRITIQUE)

**INTERDICTIONS ABSOLUES :**
- ❌ Aucun chemin `/assets/...` dans le code
- ❌ Aucun chemin absolu commençant par `/`

**OBLIGATIONS ABSOLUES :**
- ✅ Tous les assets doivent être dans `public/`
- ✅ Les composants doivent utiliser `publicAsset('image.png')`
- ✅ Les images dans le contenu ne contiennent que le nom relatif : `"image": "team/john.jpg"`
- ✅ Le helper `publicAsset()` est appliqué dans les composants, jamais dans le contenu

---

### 2.4 ⚠️ Règle #4 – Navigation Globale

**OBLIGATIONS :**
- ✅ Header, Footer, LanguageSwitcher, Navigation utilisent exclusivement `buildUrl()`
- ✅ Aucun lien absolu `/...`
- ✅ Parité FR/EN garantie
- ✅ Toutes les routes doivent être vérifiées par les tests E2E

---

### 2.5 ⚠️ Règle #5 – Anti-Over-Engineering

**LIMITES STRICTES DU TEMPLATE :**
- 5 primitives maximum
- 6 sections maximum
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

---

## 📦 **3. RÈGLES SECTIONS (6 Sections Officielles)**

### 3.1 Liste des Sections

1. **Hero**
2. **Features**
3. **CTA**
4. **Events**
5. **About**
6. **Team**

### 3.2 Règles Communes à Toutes les Sections

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

### 3.3 Détails par Section

#### Hero
**Props attendues :** `title`, `subtitle?`, `image?`, `cta?`, `variant?`
**Points critiques :**
- URLs internes via `buildUrl()`
- Images depuis `public/`

#### Features
**Props attendues :** `title`, `features[]`, `columns?`, `variant?`
**Points critiques :**
- Structures FR/EN identiques
- Aucun icon en `/assets/...`

#### CTA
**Props attendues :** `title`, `description?`, `primaryButton`, `secondaryButton?`, `variant?`
**Points critiques :**
- Tous les `href` internes via `buildUrl()`

#### Events
**Props attendues :** `title`, `description?`, `maxEvents?`
**Points critiques :**
- Events chargés depuis la collection `events`
- Filtrés par langue

#### About
**Props attendues :** `title`, `description`, `image?`, `stats?[]`
**Points critiques :**
- Aucun texte en dur
- Images depuis `public/`

#### Team
**Props attendues :** `title`, `members[]`, `columns?`
**Points critiques :**
- Membres définis dans le contenu
- Images depuis `public/`

---

## 🧩 **4. RÈGLES PRIMITIVES (5 Primitives Officielles)**

### 4.1 Liste des Primitives

1. **Button**
2. **ButtonLink** *(contient des `href` → doit utiliser `buildUrl()`)*
3. **Card**
4. **Dialog**
5. **Input**

### 4.2 Règles Communes à Toutes les Primitives

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

### 4.3 Détails par Primitive

#### Button
**Props :** `variant?`, `size?`, `disabled?`
**Contraintes :** Accessibilité obligatoire

#### ButtonLink ⚠️
**Props :** `href`, `variant?`, `size?`, `target?`
**Contraintes CRITIQUES :**
- ✅ Tous les liens internes via `buildUrl()`
- ✅ Attributs `rel` corrects si lien externe

#### Card
**Props :** `variant?`, `padding?`
**Contraintes :** Simplicité maximale

#### Dialog
**Props :** `id`, `title`, `description?`
**Contraintes :** Focus trap, accessibilité stricte

#### Input
**Props :** `type`, `label`, `id`, `error?`, `required?`, `disabled?`
**Contraintes :** Labels et ARIA obligatoires

---

## 📄 **5. RÈGLES CONTENU (3 Content Collections)**

### 5.1 Collection `pages`

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

---

### 5.2 Collection `sections`

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

---

### 5.3 Collection `events`

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

---

## 📐 **6. RÈGLES PAGES**

### 6.1 Arborescence Obligatoire

```
src/pages/
  ├── fr/
  │    └── page.astro
  ├── en/
  │    └── page.astro
  └── index.astro  (redirection / → /fr/)
```

### 6.2 Responsabilités d'une Page

1. ✅ Charger les données via `getEntry()`
2. ✅ Assembler les sections dans l'ordre défini
3. ✅ Utiliser `BaseLayout`
4. ❌ Aucun contenu métier en dur
5. ❌ Aucune logique complexe

### 6.3 Processus d'Ajout d'une Page

**7 Étapes obligatoires :**
1. Créer la page FR et EN
2. Déclarer dans la collection `pages` (FR + EN)
3. Créer les fichiers de sections (FR + EN)
4. Assembler les sections dans la page
5. Mettre à jour la navigation (avec `buildUrl()`)
6. Vérifier les assets
7. Relancer tous les tests

---

## 🎨 **7. RÈGLES STYLE**

### 7.1 Éléments du Style

1. **Tokens CSS** → marque (couleurs, typo, espacements)
2. **Classes Tailwind** → mise en forme
3. **Primitives UI** → composants stylés neutres

### 7.2 Règles

**OBLIGATIONS :**
- ✅ Style minimaliste et neutre
- ✅ Tokens simples et peu nombreux
- ✅ Classes Tailwind simples
- ✅ Cohérence globale

**INTERDICTIONS :**
- ❌ Pas de design system complexe
- ❌ Pas de CSS en cascade longue
- ❌ Pas de variables inutiles
- ❌ Aucun `/assets/...` dans les backgrounds
- ❌ Aucun lien en dur dans les boutons stylisés

### 7.3 Modification du Style

**5 Étapes :**
1. Modifier les tokens si changement de marque
2. Modifier les classes Tailwind si besoin visuel
3. Gérer les images via `public/` + helper base path
4. Maintenir les règles de liens (`buildUrl()`)
5. Relancer tous les tests

---

## ✅ **8. RÈGLES TESTS (CRITIQUES)**

### 8.1 Types de Tests

1. **Tests unitaires (Vitest)** → primitives, collections, i18n
2. **Scripts de validation** → source, build, links
3. **Tests E2E (Playwright)** → navigation, base path, accessibilité

### 8.2 Scripts de Validation (Pipeline Qualité)

#### `validate:source`
**Objectif :** Détecter dans le code source :
- ❌ Liens internes en dur (`href="/..."`)
- ❌ Assets absolus (`/assets/...`)

#### `validate:build`
**Objectif :** Analyser le site généré (`dist/`) :
- ❌ Liens cassés
- ❌ URLs incorrectement préfixées

#### `validate:links`
**Objectif :** Pipeline complet :
```
validate:source → build → validate:build
```

#### `check-links`
**Objectif :** Vérifier les liens du site final
- ✅ URLs internes fonctionnelles
- ✅ URLs externes répondent 200

### 8.3 Quand Mettre à Jour les Tests ?

**TOUJOURS relancer les tests après :**
1. Ajout/modification d'une page
2. Ajout/modification d'une section
3. Ajout/modification d'une primitive
4. Ajout/modification de contenu
5. Modification du style
6. Ajout/modification d'un asset
7. Modification de la navigation

### 8.4 Tests Obligatoires (100% Verts)

**Tous ces tests doivent passer :**
1. ✅ `validate:source`
2. ✅ `validate:build`
3. ✅ `validate:links`
4. ✅ `check-links`
5. ✅ Tests unitaires (collections, i18n, primitives)
6. ✅ Tests E2E (navigation, base path, accessibilité, FR/EN)

---

## 📋 **9. CHECKLISTS OFFICIELLES (AGENTS)**

### 9.1 Checklist "Aucun Lien Cassé"
- [ ] Aucun lien interne `href="/..."`
- [ ] Aucun chemin d'asset `/assets/...`
- [ ] Tous les liens internes passent par `buildUrl()`
- [ ] `validate:source` OK
- [ ] `validate:build` OK
- [ ] `validate:links` OK
- [ ] `check-links` OK

### 9.2 Checklist "Contenu Conforme"
- [ ] Fichiers FR/EN présents
- [ ] Structures FR/EN identiques
- [ ] Validation Zod OK
- [ ] Pas de fichiers obsolètes
- [ ] Tests des collections OK

### 9.3 Checklist "Navigation"
- [ ] Navigation Header/Footer conforme
- [ ] Routes FR/EN présentes
- [ ] Switcher FR/EN fonctionnel
- [ ] E2E navigation OK

### 9.4 Checklist "Base Path"
- [ ] Simulation E2E base path OK
- [ ] Toutes les URLs correctement préfixées
- [ ] Aucune image cassée
- [ ] Aucun lien absolu

### 9.5 Checklist "Accessibilité"
- [ ] Tests axe-playwright OK
- [ ] Contrastes conformes
- [ ] Focus visibles
- [ ] Formulaires accessibles

### 9.6 Checklist "UI et Primitives"
- [ ] Primitives testées unitairement
- [ ] Variants valides
- [ ] Tailles cohérentes
- [ ] Accessibilité intégrée

### 9.7 Checklist "Ajouter une Page"
- [ ] Page FR créée
- [ ] Page EN créée
- [ ] Fichier `pages` FR créé
- [ ] Fichier `pages` EN créé
- [ ] Sections FR créées
- [ ] Sections EN créées
- [ ] Ordre identique FR/EN
- [ ] Navigation mise à jour
- [ ] Tous les tests passent

### 9.8 Checklist "Ajouter une Section"
- [ ] Section générique et neutre
- [ ] Fichier FR créé
- [ ] Fichier EN créé
- [ ] Structure FR/EN identique
- [ ] Aucun asset en `/assets/...`
- [ ] Aucune URL en `/...`
- [ ] Référentiel mis à jour
- [ ] Tous les tests passent

### 9.9 Checklist "Ajouter une Primitive"
- [ ] Rôle fonctionnel clair
- [ ] Props simples et strictes
- [ ] Aucun contenu métier
- [ ] Accessibilité intégrée
- [ ] Si liens : `buildUrl()` utilisé
- [ ] Tests unitaires créés
- [ ] Référentiel mis à jour
- [ ] Tous les tests passent

### 9.10 Checklist "Modifier du Contenu"
- [ ] Fichier FR modifié
- [ ] Fichier EN modifié
- [ ] Structure identique
- [ ] Aucun lien en `/...`
- [ ] Aucun asset en `/assets/...`
- [ ] Validation Zod OK
- [ ] Tous les tests passent

### 9.11 Checklist "Modifier le Style"
- [ ] Tokens modifiés si nécessaire
- [ ] Classes Tailwind simples
- [ ] Aucun `/assets/...`
- [ ] Aucun lien en dur
- [ ] Accessibilité préservée
- [ ] Tous les tests passent

---

## 🔒 **10. RÈGLES DE VALIDATION FINALE**

**Avant toute modification, un agent DOIT :**
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

## 🎯 **11. RÉSUMÉ EXÉCUTIF (6 PRINCIPES IMMUABLES)**

1. **Parité FR/EN obligatoire**
2. **Tous les liens internes passent par `buildUrl()`**
3. **Aucun asset ne doit commencer par `/assets/...`**
4. **Tout doit fonctionner en sous-dossier (base path)**
5. **Les tests sont obligatoires et doivent être mis à jour**
6. **Architecture simple : Pages → Sections → Primitives → Contenu**

---

## 📚 **12. DOCUMENTS SOURCES DE VÉRITÉ**

Ce corpus consolidé synthétise les règles de :
1. [specifications_webcore_v_4.md](specifications_webcore_v_4.md)
2. [referentiel_sections_primitives_collections.md](referentiel_sections_primitives_collections.md)
3. [documentation_des_tests.md](documentation_des_tests.md)
4. [how_to_ajouter_page.md](how_to_ajouter_page.md)
5. [how_to_ajouter_section.md](how_to_ajouter_section.md)
6. [how_to_ajouter_primitive.md](how_to_ajouter_primitive.md)
7. [how_to_modifier_contenu.md](how_to_modifier_contenu.md)
8. [how_to_modifier_style.md](how_to_modifier_style.md)

**Ce corpus est la SEULE source de vérité fonctionnelle pour tous les agents IA travaillant sur Alpha WebCore.**

---

**✅ Statut : COMPLET – Prêt pour génération des agents**
