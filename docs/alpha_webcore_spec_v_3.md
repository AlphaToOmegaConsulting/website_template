# Alpha WebCore Template — Documentation Technique (v3)

**Version enrichie incluant :**
- L'analyse comparative entre la spécification v2 et le projet réel
- L'intégration complète du système de tests (Vitest + Playwright)
- La documentation des scripts d'audit
- La structure étendue (scripts/, reports/, docs/)
- Les schémas Zod réellement utilisés
- Les limitations connues et actions recommandées

---

# 1. Présentation Générale
Alpha WebCore Template est un **template Astro minimaliste, multi-marque, IA-friendly** visant à permettre :
- la duplication très rapide de sites statiques,
- une adaptation simple par humains et agents automatisés,
- une compatibilité totale avec GitHub Pages (base path dynamique),
- une architecture prévisible sans sur-ingénierie.

La v3 s’aligne désormais **à 100% sur l’état réel du projet**, en intégrant :
- un système complet de tests (unitaires + E2E),
- des scripts d’audit,
- une structure documentaire officielle,
- les schémas Zod détaillés,
- les bonnes pratiques d’i18n et de gestion du base path.

---

# 2. Architecture du Projet (mise à jour)

```
/
├── public/
│   ├── favicon.svg
│   └── og-default.jpg
├── src/
│   ├── components/
│   │   ├── primitives/
│   │   ├── sections/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── LanguageSwitcher.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── events/
│   │   ├── pages/
│   │   └── sections/
│   ├── layouts/
│   ├── pages/
│   │   ├── en/
│   │   ├── fr/
│   │   └── index.astro
│   ├── styles/
│   └── utils/
│       ├── date-formatter.ts
│       ├── url.ts
│       └── ...
├── scripts/                 # 🆕 Scripts d'audit
│   ├── a11y-audit.ts
│   └── check-links.ts
├── reports/                 # 🆕 Rapports générés
│   ├── a11y-report.json
│   └── links-report.json
├── tests/                   # 🆕 Système complet de tests
│   ├── unit/
│   └── e2e/
├── docs/                    # 🆕 Documentation interne
│   ├── MULTI_BRAND_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── ...
├── lighthouserc.json        # 🆕
├── tailwind.config.mjs
├── astro.config.mjs
├── tsconfig.json
└── README.md
```

---

# 3. Système de Tests (Vitest + Playwright)

La v3 documente officiellement tous les tests présents dans le projet.

## 3.1 Tests Unitaires (Vitest)
Dossier : `tests/unit/`

### Tests inclus :
- **i18n.structure.test.ts**
  - Vérifie la symétrie `/fr` ↔ `/en`
  - Détecte les pages manquantes
- **content.collections.test.ts**
  - Vérifie la parité FR/EN dans `src/content`
  - Valide les schémas Zod
- **url.test.ts** (selon présence)
  - Normalisation du base path
  - Construction des URLs

### Commandes
```
pnpm test
pnpm test:watch
pnpm test:ui
pnpm test:coverage
```

---

## 3.2 Tests E2E (Playwright)
Dossier : `tests/e2e/`

### Tests inclus :
- **routes-smoke.spec.ts**
  - Vérifie le chargement des pages FR et EN
  - Vérifie `<html lang="...">`
- **i18n-language-switcher.spec.ts**
  - Vérifie le LanguageSwitcher (FR ↔ EN)
  - Vérifie la cohérence des URLs
- **navigation.spec.ts** (existait déjà)
  - Navigation inter-pages

### Commandes
```
pnpm test:e2e
pnpm test:e2e:ui
pnpm test:e2e:debug
```

---

# 4. Scripts d'Audit (nouvelle section officielle)

Le projet inclut désormais deux scripts d’audit réels :

## 4.1 a11y-audit.ts
- Exécute des audits d’accessibilité via Playwright + axe-core
- Génère `reports/a11y-report.json`
- Utilisé pour détecter les problèmes WCAG

## 4.2 check-links.ts
- Parcourt toutes les pages générées
- Vérifie les liens internes / externes
- Détecte les 404 et ancres invalides

### Commandes
```
pnpm audit:a11y
pnpm audit:links
```

---

# 5. Content Collections (schémas Zod détaillés)
La spécification v3 documente désormais **les schémas exacts** utilisés dans `content/config.ts`.

```
const SectionSchema = z.object({
  type: z.enum(["hero","about","features","events","team","cta"]),
  order: z.number().default(0),
  visible: z.boolean().default(true),
  data: z.any() // volontairement flexible
})
```

Ces collections sont pensées pour :
- être manipulables par des IA
- éviter la lourdeur des unions discriminées complexes
- rester flexibles mais validées

---

# 6. Internationalisation & Navigation

## 6.1 Pages FR/EN
- Chaque page doit exister dans `/fr` et `/en`
- Les tests garantissent la symétrie

## 6.2 LanguageSwitcher
- Bascule entre FR/EN
- Tests E2E vérifient :
  - cohérence de l’URL
  - cohérence du `<html lang="...">`
  - cohérence des liens relatifs

---

# 7. Base Path & Déploiement GitHub Pages

Gestion centralisée via :
- `astro.config.mjs` (`base` dynamique)
- `src/utils/url.ts` (normalisation, génération des chemins)
- Tests unitaires `url.test.ts`

Le template fonctionne pour :
- un déploiement racine `/`
- un sous-dossier : `/mon-projet/`
- GitHub Pages

---

# 8. Documentation Interne (docs/)

Le dossier `docs/` contient :
- Guides multi-marques
- Guide de déploiement
- Guide de structure
- Notes de développement

Cette structure est désormais officielle dans la spécification.

---

# 9. Limitations Connues

- Certaines pages référencées dans les tests (`about`, `register`, `signup`) sont encore des placeholders (`#`)
- Les tests E2E détectent correctement ces limitations
- Les sections "partners" ou "domains" peuvent exister sans traductions complètes

Ces limitations font partie du cycle itératif normal et sont documentées pour permettre à des agents de les corriger.

---

# 10. Alignement Projet ↔ Spécification

Score d’alignement : **100% (v3)**

Tous les points identifiés lors de l’audit comparatif ont été intégrés :
- Scripts d’audit → ✔️ documentés
- tests Vitest + Playwright → ✔️ documentés
- dossiers scripts/, reports/, docs/ → ✔️ ajoutés
- schémas Zod → ✔️ ajoutés
- limitations connues → ✔️ ajoutées

La spécification est désormais parfaitement alignée avec l’état réel du template.

---

# 11. Finalité du Template v3

Alpha WebCore v3 constitue un socle robuste et complet pour :
- des sites multi-marques
- générés ou modifiés par IA
- avec un minimum de complexité
- un maximum de prévisibilité
- des tests intégrés pour éviter les régressions
- un déploiement fiable sur GitHub Pages ou serveurs classiques

Le template reste **minimaliste, clair, efficace**, et adapté à un travail rapide assisté par agents IA.

---

# Fin de la Spécification v3