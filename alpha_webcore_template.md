# Alpha WebCore Template – Documentation Technique

## 1. Présentation Générale
Alpha WebCore Template est un **template Astro minimaliste et multi‑marque**, conçu pour servir de base à la création rapide de sites web statiques pour différentes marques. Il met l’accent sur la **simplicité**, la **lisibilité**, la **neutralité légère**, et une **philosophie orientée IA** pour faciliter le travail d’agents automatisés.

Il adopte une architecture plate, un système de styles minimal, un nombre réduit de tokens, et une séparation logique claire entre structure, contenu et présentation.

---

## 2. Architecture du Projet
Le template repose sur une organisation simple et directe, sans monorepo, sans packages externes, et sans couches inutiles.

```
/
├── public/
│   ├── favicon.svg
│   └── og-default.jpg.md
├── src/
│   ├── components/
│   │   ├── primitives/
│   │   │   ├── Button.astro
│   │   │   ├── ButtonLink.astro
│   │   │   ├── Card.astro
│   │   │   ├── Dialog.astro
│   │   │   └── Input.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Features.astro
│   │   │   ├── CTA.astro
│   │   │   ├── Events.astro
│   │   │   ├── About.astro
│   │   │   ├── Team.astro
│   │   │   └── Domains.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── LanguageSwitcher.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── events/
│   │   ├── pages/
│   │   └── sections/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── SectionLayout.astro
│   ├── pages/
│   │   ├── en/
│   │   ├── fr/
│   │   └── index.astro
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   └── utils/
│       ├── date-formatter.ts
│       └── date-formatter.test.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── README.md
```

**Philosophie générale :**
- Architecture lisible et prévisible
- Aucun code mort
- Pas de monorepo
- Adapté aux agents IA

---

## 3. Principes de Conception

### 3.1 Minimalisme Structurel
Le template se concentre uniquement sur les éléments nécessaires au fonctionnement d’un site multi‑marque simple :
- Pages
- Sections modulaires
- Primitives UI
- Contenu séparable via Content Collections
- Styles minimaux et cohérents

Il n’intègre pas :
- Systèmes de thèmes complexes
- Design system avancé
- Union discriminée lourde
- Abstractions inutiles

### 3.2 Neutralité Light
Le style repose sur deux piliers :
1. **Brand classes** (ex : `bg-brand-primary`)
2. **Tailwind direct** pour les éléments neutres

L’objectif est d’avoir un design neutre, facile à décliner, sans imposer un style prédéfini lourd.

### 3.3 Simplicité IA-Friendly
Le template est pensé pour :
- être compréhensible par les IA
- être modifiable par des agents automatisés sans contexte complexe

Cela implique :
- pas d’abstraction inutile
- sections simples
- tokens explicites
- absence de registry ou de systèmes avancés
- code concis et prévisible

---

## 4. Système de Styles
### 4.1 Tokens (10 variables uniquement)
Le fichier `src/styles/tokens.css` contient exactement **10 tokens** :

```
:root {
  --brand-primary: #334155;
  --brand-primary-hover: #1e293b;
  --brand-secondary: #64748b;
  --brand-accent: #3b82f6;
  --brand-accent-hover: #2563eb;

  --color-text: #1a1a1a;
  --color-text-muted: #64748b;
  --color-bg: #ffffff;
  --color-bg-alt: #f8fafc;

  --shadow: ...;
  --radius: 0.5rem;
}
```

### 4.2 Brand Classes Générées
Des classes utilitaires simples reposent sur les tokens :
- `.text-brand-primary`
- `.bg-brand-primary`
- `.border-brand-primary`
- etc.

### 4.3 Tailwind
Configuration minimale :
- Exposition de la palette brand
- Utilisation directe des classes natives Tailwind

Aucun design system avancé n’est implémenté.

---

## 5. Sections Disponibles
Le template propose **7 sections entièrement fonctionnelles**, prêtes à être utilisées ou modifiées.

- `Hero`
- `Features`
- `CTA`
- `Events`
- `About`
- `Team`
- `Domains`

Chaque section :
- est autonome
- utilise un minimum de props
- est compatible multi-marque (via tokens.css)
- suit une philosophie claire : simplicité & lisibilité

---

## 6. Composants Primitifs
Les primitives UI incluent :
- **Button**
- **ButtonLink**
- **Input**
- **Dialog** (avec JS natif minimal)
- **Card**

Elles utilisent exclusivement :
- des classes brand
- des classes Tailwind
- aucune classe fantôme ou sémantique

---

## 7. Content Collections
Le fichier `content/config.ts` offre une configuration simple et pragmatique :

```
schema: z.object({
  type: z.enum(['hero','about','features','events','team','cta']),
  order: z.number().default(0),
  visible: z.boolean().default(true),
  data: z.any()
})
```

Caractéristiques :
- pas de discriminated union complexe
- format flexible adapté aux IA
- strictement ce qu’il faut pour un template minimal
- collections inutilisées supprimées (authors, domains, tags)

---

## 8. Internationalisation & SEO
### 8.1 i18n
- Organisation en `/en/` et `/fr/`
- LanguageSwitcher intégré
- hreflang géré dans BaseLayout

### 8.2 SEO
BaseLayout inclut :
- meta SEO par défaut
- tags OpenGraph
- Twitter tags
- canonical
- og-default configurable

---

## 9. Assets Publics
- `favicon.svg` : symbole minimaliste
- `og-default.jpg.md` : guide pour générer une image OG personnalisée

---

## 10. Documentation du Template
### 10.1 README.md
Contient :
- vue d’ensemble
- architecture
- guide d’installation
- philosophie styling
- explication des primitives & sections
- commandes de développement
- organisation du contenu

### 10.2 MULTI_BRAND_GUIDE.md
Document dédié présentant :
- la philosophie multi-marque par **duplication du template**
- comment modifier uniquement les tokens pour une nouvelle marque
- presets de couleurs prêts à l’emploi
- recommandations de design
- checklist complète
- troubleshooting

---

## 11. Philosophie Multi‑Marque
Le template est conçu pour être :
- dupliqué pour chaque marque
- modifié uniquement via `tokens.css`
- utilisé comme base neutre très stable

Il ne contient volontairement :
- aucun système de switch dynamique,
- aucun thème runtime,
- aucun design system lourd,
- aucun mécanisme multi-brand avancé.

Cette philosophie repose sur la **simplicité, la prédictibilité et la maîtrise**.

---

## 12. Qualité Technique
Le template inclut :
- TypeScript strict
- tests unitaires simples (Vitest)
- tests E2E (Playwright)
- audits automatisés : accessibilité, Lighthouse, liens
- ESLint + Prettier
- build propre sans warnings

---

## 13. Finalité du Template
Alpha WebCore Template sert de socle pour :
- la création rapide de sites pour plusieurs marques
- des projets développés par des agents IA
- une architecture simple, stable, prédictive et adaptable

Il est entièrement prêt pour :
- l’usage quotidien
- la duplication
- l’adaptation par des agents IA
- la mise en production rapide

Ce document présente la version finale du template.

