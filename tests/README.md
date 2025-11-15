# Tests Architecture

Architecture de tests complète pour le template Astro multilingue (FR/EN).

## Structure des dossiers

```
tests/
├── unit/                           # Tests statiques (Vitest)
│   ├── i18n.structure.test.ts     # Symétrie des pages FR ↔ EN
│   └── content.collections.test.ts # Symétrie des contenus FR ↔ EN
└── e2e/                            # Tests End-to-End (Playwright)
    ├── routes-smoke.spec.ts        # Smoke tests des routes principales
    └── i18n-language-switcher.spec.ts # Tests du LanguageSwitcher
```

## Scripts disponibles

### Tests unitaires (Vitest)

```bash
# Exécuter tous les tests unitaires
npm run test

# Mode watch (développement)
npm run test:watch

# Interface UI interactive
npm run test:ui

# Avec couverture de code
npm run test:coverage
```

### Tests E2E (Playwright)

```bash
# Exécuter tous les tests E2E
npm run test:e2e

# Interface UI interactive
npm run test:e2e:ui

# Mode debug
npm run test:e2e:debug
```

### Tests CI

```bash
# Exécuter tous les tests (unit + e2e) pour CI/CD
npm run ci
```

## Description des tests

### Tests unitaires

#### i18n.structure.test.ts

Vérifie la symétrie des pages entre FR et EN :

- Présence des dossiers `/fr` et `/en`
- Correspondance exacte des fichiers `.astro` entre les langues
- Même nombre de pages dans chaque langue
- Structure de dossiers identique

**Exemple** : Si `src/pages/fr/events/index.astro` existe, alors
`src/pages/en/events/index.astro` doit aussi exister.

#### content.collections.test.ts

Vérifie la symétrie et la validité des contenus :

- **Events** : Correspondance des événements FR ↔ EN
- **Pages** : Correspondance des pages de contenu FR ↔ EN
- **Sections** : Validité des fichiers JSON
- **Frontmatter** : Validation des champs requis selon les schémas Zod

**Champs validés** :
- Events : `title`, `date`, `location`, `description`, `lang`
- Pages : `title`, `description`, `lang`, `publishDate`
- Sections : `type`, `order`, `data`

### Tests E2E

#### routes-smoke.spec.ts

Smoke tests des routes principales :

- Chargement réussi des routes FR et EN (status 200)
- Présence de l'attribut `lang` correct dans `<html>`
- Structure HTML valide
- Gestion des pages 404
- Vérifications d'accessibilité de base (h1, title)

**Routes testées** :
- `/`, `/fr`, `/fr/`, `/en`, `/en/`
- `/fr/events`, `/en/events`
- `/fr/partners`, `/en/partners`
- `/fr/twt/landing`, `/en/twt/landing`

#### i18n-language-switcher.spec.ts

Tests complets du LanguageSwitcher :

**Fonctionnalité** :
- Basculement FR → EN (homepage, events, partners)
- Basculement EN → FR (homepage, events, partners)
- Vérification de l'attribut `lang` après basculement
- Persistance de la langue après refresh

**Interface** :
- Visibilité du composant
- Présence de l'icône globe
- Labels corrects ("English"/"EN" sur FR, "Français"/"FR" sur EN)
- Attribut `aria-label` défini
- Accessibilité clavier (tabulation)

**Edge cases** :
- Navigation directe vers URLs FR/EN
- Maintien de la langue après refresh

## Pré-requis

Les dépendances suivantes sont installées :

- `vitest` : Framework de tests unitaires
- `happy-dom` : Environnement DOM pour les tests
- `playwright` : Framework de tests E2E
- `gray-matter` : Parser pour le frontmatter Markdown

## Configuration

### vitest.config.ts

- Environnement : `happy-dom`
- Inclut : `src/**/*.{test,spec}.{js,ts}` et `tests/unit/**/*.{test,spec}.{js,ts}`
- Exclut : `node_modules`, `dist`, `.astro`, `tests/e2e`
- Couverture : provider `v8`, reporters `text`, `json`, `html`

### playwright.config.ts

- Dossier de tests : `./tests/e2e`
- Base URL : `http://localhost:4321`
- Navigateurs : Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Web Server : `pnpm preview` (démarre automatiquement avant les tests)
- Retries : 2 en CI, 0 en local

## Bonnes pratiques

### Lors de l'ajout d'une nouvelle page

1. Créer la page dans `/src/pages/fr/`
2. Créer la page équivalente dans `/src/pages/en/`
3. Exécuter `npm run test` pour vérifier la symétrie

### Lors de l'ajout d'un nouveau contenu

1. Créer le fichier dans `/src/content/[collection]/fr/`
2. Créer le fichier équivalent dans `/src/content/[collection]/en/`
3. Vérifier le frontmatter avec les champs requis
4. Exécuter `npm run test` pour validation

### Avant de commit

```bash
# Exécuter tous les tests
npm run ci

# Ou individuellement
npm run test          # Tests unitaires rapides
npm run test:e2e      # Tests E2E (nécessite build)
```

### En CI/CD

Utiliser le script `npm run ci` qui exécute :
1. Tests unitaires (`npm run test`)
2. Tests E2E (`npm run test:e2e`)

Le serveur de preview démarre automatiquement avant les tests E2E.

## Maintenance du template

Ces tests garantissent :

- ✅ Cohérence multilingue complète
- ✅ Pas de pages orphelines
- ✅ Validation des schémas de contenu
- ✅ Fonctionnalité du LanguageSwitcher
- ✅ Accessibilité de base
- ✅ Chargement correct de toutes les routes

Pour adapter ce template à un nouveau projet :

1. Les tests de structure fonctionneront automatiquement
2. Adapter les routes dans `routes-smoke.spec.ts` si besoin
3. Les tests de contenu valideront les nouveaux contenus ajoutés
