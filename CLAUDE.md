# 📜 CLAUDE.md – Constitution du Projet Alpha WebCore

> **Version : 2.0** | **Date : 2025-11-19**  
> **Constitution du projet pour Claude Code et tous les agents**

---

## 🎯 Vue d'Ensemble

Ce fichier définit les **règles critiques** et l'**architecture multi-agents** du projet Alpha WebCore.

**Pour la documentation détaillée, consultez :**
- Spécifications complètes : @docs/specifications_webcore_v_4.md
- Référentiel composants : @docs/referentiel_sections_primitives_collections.md
- Documentation tests : @docs/documentation_des_tests.md
- Corpus agents : @docs/CORPUS_FONCTIONNEL_AGENTS_READY.md
- Guides pratiques : @docs/how_to_*.md

---

## 🏛️ Philosophie Fondamentale

Alpha WebCore est un template **Astro minimaliste, neutre, générique et multi-marques**.

### Les 4 Principes Immuables

1. **Minimalisme** : Aucune fonctionnalité inutile
2. **Généricité** : Jamais de code métier, toujours réutilisable
3. **Neutralité** : Style léger, sans identité visuelle imposée
4. **Prévisibilité IA** : Patterns simples pour les agents

### Architecture en 4 Couches

```
Pages (orchestration) → Sections (UI blocs) → Primitives (UI atomique) → Contenu (données)
```

**Détails complets :** @docs/specifications_webcore_v_4.md

---

## 🚨 RÈGLES CRITIQUES (NON NÉGOCIABLES)

## 🚨 RÈGLES CRITIQUES (NON NÉGOCIABLES)

### ⚠️ RÈGLE #1 – BASE PATH

**Le template doit fonctionner en sous-dossier** (ex: `/repository/`).

**INTERDICTIONS ABSOLUES :**
- ❌ Aucune URL interne ne doit commencer par `/...`
- ❌ Aucun asset ne doit commencer par `/assets/...`
- ❌ Aucun lien en dur : `href="/about"`

**OBLIGATIONS ABSOLUES :**
- ✅ **Tous les liens internes** → `buildUrl()`
- ✅ **Tous les assets** → `publicAsset()`
- ✅ `buildUrl()` basé sur `import.meta.env.BASE_URL`

**Pourquoi ?** GitHub Pages, déploiements multi-sites, compatibilité sous-dossier.

**Tests obligatoires :** `validate:source`, `validate:build`, `validate:links`

---

### ⚠️ RÈGLE #2 – PARITÉ FR/EN

**Le template est obligatoirement bilingue** avec symétrie parfaite.

**OBLIGATIONS :**
- ✅ Toute page existe en **FR** ET **EN**
- ✅ Toute Content Collection existe en **FR** ET **EN**
- ✅ Structures FR/EN strictement identiques
- ✅ Ordre des sections identique FR/EN
- ✅ Tests automatiques de symétrie

**INTERDICTIONS :**
- ❌ Aucune page unilingue
- ❌ Aucun fichier orphelin

**Détails :** @docs/how_to_ajouter_page.md

---

### ⚠️ RÈGLE #3 – ANTI-OVER-ENGINEERING

**Limites strictes du template :**
- 5 primitives maximum (Button, ButtonLink, Card, Dialog, Input)
- 6 sections maximum (Hero, Features, CTA, Events, About, Team)
- Pas de carrousel, timeline complexe, grilles 4+ colonnes
- Pas de design system avancé
- Pas d'animations lourdes

**Référentiel officiel :** @docs/referentiel_sections_primitives_collections.md

---

### ⚠️ RÈGLE #4 – TESTS OBLIGATOIRES

**Tous ces tests doivent passer à 100% :**
1. ✅ `validate:source` (détecte `/...` et `/assets/...` dans le code)
2. ✅ `validate:build` (vérifie le site généré)
3. ✅ `validate:links` (pipeline complet)
4. ✅ `check-links` (vérifie liens internes/externes)
5. ✅ Tests unitaires (Vitest)
6. ✅ Tests E2E (Playwright)

**Quand relancer ?** Après TOUTE modification (page, section, primitive, contenu, style, asset, navigation).

**Documentation complète :** @docs/documentation_des_tests.md

---

## 🤖 SYSTÈME MULTI-AGENTS

### Architecture

```
🎯 Orchestrateur (Tech Lead)
   ├─ @frontend-astro      (Pages, Sections, Primitives, Routing)
   ├─ @i18n-fr-en          (Parité linguistique FR/EN)
   ├─ @content-collections (Content Collections)
   ├─ @style-tokens        (CSS, Tailwind, Tokens)
   └─ @tests-qa            (Tests, QA, validation)
```

### Rôle de l'Orchestrateur

L'**orchestrateur** supervise toutes les modifications :

1. ✅ Lit ce fichier `CLAUDE.md` avant toute action
2. ✅ Analyse la demande utilisateur
3. ✅ Identifie les agents spécialisés à mobiliser
4. ✅ Délègue aux agents appropriés
5. ✅ Vérifie le respect des règles critiques
6. ✅ Valide les résultats finaux
7. ❌ **Interdit toute violation des règles**

### Règles de Délégation

| Tâche | Agent(s) |
|-------|----------|
| Ajouter/modifier page | frontend-astro + i18n-fr-en + content-collections + tests-qa |
| Ajouter/modifier section | frontend-astro + i18n-fr-en + content-collections + tests-qa |
| Ajouter/modifier primitive | frontend-astro + style-tokens + tests-qa |
| Modifier contenu | content-collections + i18n-fr-en + tests-qa |
| Modifier style | style-tokens + tests-qa |
| Exécuter tests | tests-qa |

**Plan détaillé :** @docs/PLAN_EQUIPE_AGENTS.md

### Comportements Obligatoires (Tous les Agents)

**DOIVENT faire :**
- ✅ Lire `CLAUDE.md` avant toute action
- ✅ Consulter la documentation fonctionnelle pertinente
- ✅ Respecter les 4 principes immuables
- ✅ Relancer TOUS les tests après modification
- ✅ Maintenir la parité FR/EN
- ✅ Utiliser `buildUrl()` pour liens internes
- ✅ Utiliser `publicAsset()` pour assets
- ✅ **Bloquer si les tests échouent**

**NE DOIVENT JAMAIS faire :**
- ❌ Inventer des fonctionnalités hors documentation
- ❌ Violer les règles de base path
- ❌ Violer la parité FR/EN
- ❌ Court-circuiter les tests
- ❌ Ajouter de la complexité inutile
- ❌ Créer du code métier dans les composants
- ❌ Dépasser les limites (5 primitives, 6 sections)

**Si un cas n'est pas documenté :**
1. ✅ L'agent doit s'arrêter
2. ✅ L'agent doit demander confirmation
3. ❌ L'agent ne doit JAMAIS inventer

---

## 📋 COMPOSANTS OFFICIELS

### Sections (6 maximum)

1. **Hero** : Introduction de page
2. **Features** : Liste de fonctionnalités
3. **CTA** : Appel à l'action
4. **Events** : Liste d'événements
5. **About** : Présentation
6. **Team** : Liste de membres

**Règles communes :**
- ✅ Génériques et neutres
- ✅ Données viennent des Content Collections
- ✅ Tous les liens → `buildUrl()`
- ✅ Parité FR/EN stricte
- ❌ Aucun texte métier en dur

**Détails :** @docs/referentiel_sections_primitives_collections.md

### Primitives (5 maximum)

1. **Button** : Bouton générique
2. **ButtonLink** ⚠️ : Lien stylisé (doit utiliser `buildUrl()`)
3. **Card** : Conteneur stylisé
4. **Dialog** : Modal accessible
5. **Input** : Champ de formulaire

**Règles communes :**
- ✅ Atomiques et stables
- ✅ Accessibilité obligatoire (ARIA, labels, focus)
- ✅ Tests unitaires obligatoires
- ❌ Aucune complexité disproportionnée

**Détails :** @docs/referentiel_sections_primitives_collections.md

---

## 📄 CONTENT COLLECTIONS

### Collection `pages`

```json
{
  "title": "string",
  "description": "string",
  "lang": "fr | en"
}
```

### Collection `sections`

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
- ✅ Les `href` dans `data` sont logiques : `"/about"` (pas `/fr/about`)
- ✅ `buildUrl()` appliqué dans les composants, jamais dans le contenu
- ❌ Aucun asset `/assets/...` dans `data`

### Collection `events`

```json
{
  "title": "string",
  "date": "date",
  "location?": "string",
  "description": "string",
  "lang": "fr | en"
}
```

**Détails :** @docs/referentiel_sections_primitives_collections.md

---

## 🎯 RÉSUMÉ EXÉCUTIF – LES 6 RÈGLES D'OR

1. **Parité FR/EN obligatoire** → Symétrie parfaite
2. **Tous les liens internes** → `buildUrl()`
3. **Tous les assets** → `publicAsset()`
4. **Fonctionner en sous-dossier** → base path
5. **Tests obligatoires** → 100% verts après chaque modification
6. **Architecture simple** → Pages → Sections → Primitives → Contenu

---

## ✅ VALIDATION FINALE

**Avant toute action, vérifier :**

1. ✅ Conformité à `CLAUDE.md`
2. ✅ Consultation de la documentation pertinente (@docs/...)
3. ✅ Parité FR/EN
4. ✅ Absence de `/...` dans les liens
5. ✅ Absence de `/assets/...`
6. ✅ Utilisation de `buildUrl()` partout
7. ✅ Collections conformes aux schémas Zod
8. ✅ Tous les scripts de validation OK
9. ✅ Tous les tests (unitaires + E2E) OK
10. ✅ **100% des tests verts**

**❌ Si un seul test échoue → modification INVALIDE**

---

## 📚 DOCUMENTATION DE RÉFÉRENCE

**Documents principaux :**
- @docs/specifications_webcore_v_4.md
- @docs/referentiel_sections_primitives_collections.md
- @docs/documentation_des_tests.md
- @docs/CORPUS_FONCTIONNEL_AGENTS_READY.md

**Guides pratiques :**
- @docs/how_to_ajouter_page.md
- @docs/how_to_ajouter_section.md
- @docs/how_to_ajouter_primitive.md
- @docs/how_to_modifier_contenu.md
- @docs/how_to_modifier_style.md

**Plan multi-agents :**
- @docs/PLAN_EQUIPE_AGENTS.md

---

## 🔒 STATUT DE CE DOCUMENT

Ce document est la **Constitution du projet Alpha WebCore**.

- **Prime sur toute autre instruction**
- **Définit toutes les règles obligatoires**
- **Doit être respecté par Claude Code et tous les agents**
- **Ne peut être modifié que par décision explicite de l'équipe projet**

**Version : 2.0** | **Date : 2025-11-19** | **Statut : OFFICIEL – EN VIGUEUR**

---

**🔒 Toute violation de ce document est interdite et doit être bloquée immédiatement.**

#### INTERDICTIONS ABSOLUES

- ❌ Aucune URL interne ne doit commencer par `/...`
- ❌ Aucun lien écrit en dur : `href="/about"`
- ❌ Aucun asset ne doit commencer par `/assets/...`

#### OBLIGATIONS ABSOLUES

- ✅ Tous les liens internes doivent passer par `buildUrl()`
- ✅ `buildUrl()` doit être basé sur `import.meta.env.BASE_URL`
- ✅ Tous les composants contenant des `href` doivent utiliser `buildUrl()`
- ✅ Tous les assets doivent utiliser `publicAsset()` ou équivalent

#### Pourquoi ?

- Compatibilité GitHub Pages
- Compatibilité déploiement en sous-dossier
- Compatibilité sites multiples
- Aucun lien cassé en production

#### Exemples de configuration

- Site racine → `base: '/'`
- Sous-dossier → `base: '/project/'`
- GitHub Pages → `site: 'https://user.github.io', base: '/repo/'`

---

### 3.2 ⚠️ RÈGLE #2 – PARITÉ FR/EN (CRITIQUE)

Le template est **obligatoirement bilingue** avec une symétrie parfaite.

#### OBLIGATIONS ABSOLUES

- ✅ Toute page existe en **FR** ET **EN**
- ✅ Toute entrée de Content Collection existe en **FR** ET **EN**
- ✅ Les dossiers FR/EN doivent être strictement parallèles
- ✅ Les structures FR/EN doivent être strictement identiques
- ✅ L'ordre des sections doit être identique FR/EN
- ✅ Les tests vérifient automatiquement cette symétrie

#### INTERDICTIONS

- ❌ Aucune page unilingue
- ❌ Aucune divergence structurelle entre FR et EN
- ❌ Aucun fichier orphelin dans une langue

---

### 3.3 ⚠️ RÈGLE #3 – ASSETS (CRITIQUE)

Les assets doivent respecter le base path.

#### INTERDICTIONS ABSOLUES

- ❌ Aucun chemin `/assets/...` dans le code
- ❌ Aucun chemin absolu commençant par `/`

#### OBLIGATIONS ABSOLUES

- ✅ Tous les assets doivent être dans `public/`
- ✅ Les composants doivent utiliser `publicAsset('image.png')`
- ✅ Les images dans le contenu ne contiennent que le nom relatif : `"image": "team/john.jpg"`
- ✅ Le helper `publicAsset()` est appliqué dans les composants, jamais dans le contenu

---

### 3.4 ⚠️ RÈGLE #4 – NAVIGATION GLOBALE

Les composants de navigation doivent tous respecter le base path.

#### OBLIGATIONS

- ✅ Header, Footer, LanguageSwitcher, Navigation utilisent exclusivement `buildUrl()`
- ✅ Aucun lien absolu `/...`
- ✅ Parité FR/EN garantie
- ✅ Toutes les routes doivent être vérifiées par les tests E2E

---

### 3.5 ⚠️ RÈGLE #5 – ANTI-OVER-ENGINEERING

Le template limite volontairement les fonctionnalités.

#### LIMITES STRICTES DU TEMPLATE

- 5 primitives maximum (Button, ButtonLink, Card, Dialog, Input)
- 6 sections maximum (Hero, Features, CTA, Events, About, Team)
- Options limitées (pas de carrousel, pas de timeline complexe, pas de grilles 4+ colonnes)
- Pas de design system avancé
- Pas de thèmes multiples
- Pas d'animations lourdes

#### Toute extension doit être

- Simple
- Générique
- Testée
- Compatible base path
- Compatible FR/EN

---

## 📦 4. RÈGLES DES COMPOSANTS

### 4.1 Les 6 Sections Officielles

1. **Hero** : Introduction de page (title, subtitle, image?, cta?)
2. **Features** : Liste de fonctionnalités (title, features[], columns?, variant?)
3. **CTA** : Appel à l'action (title, description?, primaryButton, secondaryButton?, variant?)
4. **Events** : Liste d'événements (title, description?, maxEvents?)
5. **About** : Présentation (title, description, image?, stats?[])
6. **Team** : Liste de membres (title, members[], columns?)

#### Règles communes à toutes les sections

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

---

### 4.2 Les 5 Primitives Officielles

1. **Button** : Bouton générique (variant?, size?, disabled?)
2. **ButtonLink** ⚠️ : Lien stylisé (href, variant?, size?, target?) – **doit utiliser `buildUrl()`**
3. **Card** : Conteneur stylisé (variant?, padding?)
4. **Dialog** : Modal accessible (id, title, description?)
5. **Input** : Champ de formulaire (type, label, id, error?, required?, disabled?)

#### Règles communes à toutes les primitives

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

---

## 📄 5. RÈGLES DES CONTENT COLLECTIONS

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

## 📐 6. RÈGLES DES PAGES

### 6.1 Arborescence obligatoire

```
src/pages/
  ├── fr/
  │    └── page.astro
  ├── en/
  │    └── page.astro
  └── index.astro  (redirection / → /fr/)
```

### 6.2 Responsabilités d'une page

1. ✅ Charger les données via `getEntry()`
2. ✅ Assembler les sections dans l'ordre défini
3. ✅ Utiliser `BaseLayout`
4. ❌ Aucun contenu métier en dur
5. ❌ Aucune logique complexe

---

## ✅ 7. RÈGLES DES TESTS (CRITIQUES)

### 7.1 Types de tests

1. **Tests unitaires (Vitest)** : primitives, collections, i18n
2. **Scripts de validation** : source, build, links
3. **Tests E2E (Playwright)** : navigation, base path, accessibilité

### 7.2 Scripts de validation obligatoires

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

### 7.3 Quand relancer les tests ?

**TOUJOURS après :**
1. Ajout/modification d'une page
2. Ajout/modification d'une section
3. Ajout/modification d'une primitive
4. Ajout/modification de contenu
5. Modification du style
6. Ajout/modification d'un asset
7. Modification de la navigation

### 7.4 Tests obligatoires (100% verts)

**Tous ces tests doivent passer :**
1. ✅ `validate:source`
2. ✅ `validate:build`
3. ✅ `validate:links`
4. ✅ `check-links`
5. ✅ Tests unitaires (collections, i18n, primitives)
6. ✅ Tests E2E (navigation, base path, accessibilité, FR/EN)

---

## 🤖 8. SYSTÈME MULTI-AGENTS

### 8.1 Architecture

```
🎯 Agent Orchestrateur (Tech Lead)
   ├─ Agent Frontend Astro
   ├─ Agent i18n FR/EN
   ├─ Agent Contenu (Collections)
   ├─ Agent Style/Tokens
   ├─ Agent Tests & QA
   └─ Agent Documentation
```

### 8.2 Rôle de l'Agent Orchestrateur

L'Orchestrateur **supervise toutes les modifications** en :
1. Lisant ce fichier `CLAUDE.md` avant toute action
2. Analysant la demande utilisateur
3. Identifiant les agents spécialisés à mobiliser
4. Déléguant les tâches aux agents appropriés
5. Vérifiant que les règles de ce document sont respectées
6. Validant les résultats finaux
7. **Interdisant toute violation des règles**

### 8.3 Règles de délégation

**L'Orchestrateur délègue selon ces règles :**

| Tâche | Agent(s) responsable(s) |
|-------|-------------------------|
| Ajouter/modifier page | Frontend + i18n + Contenu + Tests |
| Ajouter/modifier section | Frontend + i18n + Contenu + Tests + Docs |
| Ajouter/modifier primitive | Frontend + Style + Tests + Docs |
| Modifier contenu | Contenu + i18n + Tests |
| Modifier style | Style + Tests |
| Exécuter tests | Tests |

### 8.4 Comportements obligatoires des agents

**Tous les agents doivent :**
1. ✅ Lire ce fichier `CLAUDE.md` avant toute action
2. ✅ Consulter la documentation fonctionnelle pertinente ([docs/](docs/))
3. ✅ Respecter strictement les règles de leur périmètre
4. ✅ Ne JAMAIS inventer de fonctionnalité non documentée
5. ✅ Demander confirmation si un cas n'est pas documenté
6. ✅ Relancer tous les tests après modification
7. ✅ Bloquer toute action si les tests échouent

**Tous les agents doivent éviter :**
- ❌ Créer du contenu hors documentation
- ❌ Court-circuiter les tests
- ❌ Violer la parité FR/EN
- ❌ Violer les règles de base path
- ❌ Violer les règles d'assets
- ❌ Agir en dehors de leur périmètre

---

## 📋 9. CHECKLISTS OBLIGATOIRES

### 9.1 Checklist "Avant toute modification"

- [ ] Ce fichier `CLAUDE.md` a été lu
- [ ] La documentation fonctionnelle pertinente a été consultée
- [ ] Le périmètre de l'action est clairement défini
- [ ] Les règles applicables sont identifiées
- [ ] La parité FR/EN est garantie
- [ ] Les règles de base path sont comprises

### 9.2 Checklist "Aucun lien cassé"

- [ ] Aucun lien interne `href="/..."`
- [ ] Aucun chemin d'asset `/assets/...`
- [ ] Tous les liens internes passent par `buildUrl()`
- [ ] `validate:source` OK
- [ ] `validate:build` OK
- [ ] `validate:links` OK
- [ ] `check-links` OK

### 9.3 Checklist "Contenu conforme"

- [ ] Fichiers FR/EN présents
- [ ] Structures FR/EN identiques
- [ ] Validation Zod OK
- [ ] Pas de fichiers obsolètes
- [ ] Tests des collections OK

### 9.4 Checklist "Navigation"

- [ ] Navigation Header/Footer conforme
- [ ] Routes FR/EN présentes
- [ ] Switcher FR/EN fonctionnel
- [ ] E2E navigation OK

### 9.5 Checklist "Base path"

- [ ] Simulation E2E base path OK
- [ ] Toutes les URLs correctement préfixées
- [ ] Aucune image cassée
- [ ] Aucun lien absolu

### 9.6 Checklist "Accessibilité"

- [ ] Tests axe-playwright OK
- [ ] Contrastes conformes
- [ ] Focus visibles
- [ ] Formulaires accessibles

### 9.7 Checklist "Après modification"

- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK
- [ ] Tests unitaires OK
- [ ] Tests E2E OK
- [ ] Documentation mise à jour si nécessaire

---

## 🚫 10. CAS INTERDITS

Les actions suivantes sont **strictement interdites** :

1. ❌ Créer une page unilingue
2. ❌ Utiliser `/...` dans un lien interne
3. ❌ Utiliser `/assets/...` dans un asset
4. ❌ Ajouter du texte métier en dur dans un composant
5. ❌ Créer plus de 6 sections
6. ❌ Créer plus de 5 primitives
7. ❌ Ajouter une fonctionnalité complexe (carrousel, timeline, etc.)
8. ❌ Court-circuiter les tests
9. ❌ Modifier du code sans relancer les tests
10. ❌ Inventer une fonctionnalité non documentée
11. ❌ Créer une divergence structurelle FR/EN
12. ❌ Ignorer une règle de ce document

---

## 📚 11. DOCUMENTATION FONCTIONNELLE DE RÉFÉRENCE

Toute action doit être conforme aux documents suivants :

### Documents principaux

1. [specifications_webcore_v_4.md](docs/specifications_webcore_v_4.md) : Spécifications fonctionnelles centrales
2. [referentiel_sections_primitives_collections.md](docs/referentiel_sections_primitives_collections.md) : Référentiel des composants
3. [documentation_des_tests.md](docs/documentation_des_tests.md) : Documentation des tests
4. [CORPUS_FONCTIONNEL_AGENTS_READY.md](docs/CORPUS_FONCTIONNEL_AGENTS_READY.md) : Corpus consolidé pour agents

### Guides How-To

1. [how_to_ajouter_page.md](docs/how_to_ajouter_page.md)
2. [how_to_ajouter_section.md](docs/how_to_ajouter_section.md)
3. [how_to_ajouter_primitive.md](docs/how_to_ajouter_primitive.md)
4. [how_to_modifier_contenu.md](docs/how_to_modifier_contenu.md)
5. [how_to_modifier_style.md](docs/how_to_modifier_style.md)

### Plan multi-agents

1. [PLAN_EQUIPE_AGENTS.md](docs/PLAN_EQUIPE_AGENTS.md)

**Règle absolue :** Avant toute action, l'agent ou Claude Code **doit consulter la documentation pertinente**.

---

## 🎯 12. LIMITATIONS DE CLAUDE CODE ET DES AGENTS

### 12.1 Ce que Claude Code et les agents DOIVENT faire

- ✅ Toujours lire ce fichier `CLAUDE.md` avant d'agir
- ✅ Toujours consulter la documentation fonctionnelle
- ✅ Toujours respecter les 6 principes immuables
- ✅ Toujours relancer tous les tests
- ✅ Toujours maintenir la parité FR/EN
- ✅ Toujours utiliser `buildUrl()` pour les liens internes
- ✅ Toujours utiliser `publicAsset()` pour les assets
- ✅ Toujours bloquer si les tests échouent

### 12.2 Ce que Claude Code et les agents NE DOIVENT JAMAIS faire

- ❌ Inventer des fonctionnalités hors documentation
- ❌ Violer les règles de base path
- ❌ Violer la parité FR/EN
- ❌ Court-circuiter les tests
- ❌ Ajouter de la complexité inutile
- ❌ Créer du code métier dans les composants
- ❌ Ignorer les limites du template (5 primitives, 6 sections)

### 12.3 Cas non documentés

Si un cas n'est pas documenté dans ce fichier ou dans la documentation fonctionnelle :
1. ✅ L'agent doit s'arrêter
2. ✅ L'agent doit demander confirmation à l'utilisateur
3. ❌ L'agent ne doit JAMAIS inventer une solution

---

## 🎯 13. RÉSUMÉ EXÉCUTIF – LES 6 PRINCIPES IMMUABLES

1. **Parité FR/EN obligatoire**
2. **Tous les liens internes passent par `buildUrl()`**
3. **Aucun asset ne doit commencer par `/assets/...`**
4. **Tout doit fonctionner en sous-dossier (base path)**
5. **Les tests sont obligatoires et doivent être mis à jour**
6. **Architecture simple : Pages → Sections → Primitives → Contenu**

---

## ✅ 14. VALIDATION FINALE

**Avant toute action, Claude Code et tous les agents doivent :**

1. ✅ Vérifier la conformité à ce document `CLAUDE.md`
2. ✅ Vérifier la documentation fonctionnelle pertinente
3. ✅ Vérifier la parité FR/EN
4. ✅ Vérifier l'absence de `/...` dans les liens
5. ✅ Vérifier l'absence de `/assets/...`
6. ✅ Vérifier que `buildUrl()` est utilisé partout
7. ✅ Vérifier que les collections sont conformes aux schémas Zod
8. ✅ Relancer **tous** les scripts de validation
9. ✅ Relancer **tous** les tests (unitaires + E2E)
10. ✅ Vérifier que tous les tests sont **100% verts**

**Si un seul test échoue, la modification est INVALIDE.**

---

## 📜 15. STATUT DE CE DOCUMENT

Ce document `CLAUDE.md` est la **Constitution du projet Alpha WebCore**.

- Il **prime sur toute autre instruction**
- Il **définit toutes les règles obligatoires**
- Il **doit être respecté par Claude Code et tous les agents**
- Il **ne peut être modifié que par décision explicite de l'équipe projet**

**Version : 1.0**
**Date : 2025-11-19**
**Statut : OFFICIEL – EN VIGUEUR**

---

**🔒 Toute violation de ce document est interdite et doit être bloquée immédiatement.**
