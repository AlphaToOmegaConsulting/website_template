# Alpha WebCore Template – Documentation Technique (v2 – compatibilité GitHub Pages)

## 1. Présentation Générale
Alpha WebCore Template est un **template Astro minimaliste et multi‑marque**, conçu pour servir de base à la création rapide de sites web statiques pour différentes marques. Il met l’accent sur la **simplicité**, la **lisibilité**, la **neutralité légère**, et une **philosophie orientée IA** pour faciliter le travail d’agents automatisés.

La version v2 ajoute une **gestion native du base path** pour permettre le déploiement fluide sur GitHub Pages (ou tout hébergement servant le site dans un sous-dossier) tout en restant compatible avec un déploiement classique à la racine du domaine.

Il adopte une architecture plate, un système de styles minimal, un nombre réduit de tokens, et une séparation logique claire entre structure, contenu, présentation et construction des URLs.

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
│       ├── date-formatter.test.ts
│       └── url.ts              # ✅ Nouveau : utilitaires base path + URLs
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
- **Compatibilité native base path (GitHub Pages et sous-dossiers)**

---

## 3. Principes de Conception

### 3.1 Minimalisme Structurel
Le template se concentre uniquement sur les éléments nécessaires au fonctionnement d’un site multi‑marque simple :
- Pages
- Sections modulaires
- Primitives UI
- Contenu séparable via Content Collections
- Styles minimaux et cohérents
- **Construction centralisée des URLs pour gérer la racine et le base path**

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
- **règles très claires sur la gestion des liens et du base path**

---

## 4. Système de Styles
### 4.1 Tokens (10 variables uniquement)
Le fichier `src/styles/tokens.css` contient exactement **10 tokens** :

```css
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

```ts
schema: z.object({
  type: z.enum(["hero","about","features","events","team","cta"]),
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

**Convention liens & base path :**
- Tous les liens stockés dans les contenus (JSON, MD, etc.) doivent être **relatifs** (ex : `"href": "contact.html"`).
- Les contenus ne doivent **jamais** contenir de base path, de nom de repo GitHub ou de chemin absolu couplé à l’environnement de déploiement.
- La résolution finale des URLs est gérée par les composants (voir sections suivantes).

---

## 8. Internationalisation & SEO
### 8.1 i18n
- Organisation en `/en/` et `/fr/`
- LanguageSwitcher intégré
- hreflang géré dans BaseLayout
- Compatible avec la logique de base path (les routes `/fr/...` et `/en/...` sont construites via les mêmes utilitaires d’URL).

### 8.2 SEO
BaseLayout inclut :
- meta SEO par défaut
- tags OpenGraph
- Twitter tags
- canonical
- og-default configurable

Les URLs utilisées dans les metas sont construites de manière cohérente avec le base path.

---

## 9. Gestion du Base Path & Utilitaires d’URL

### 9.1 astro.config.mjs
Le fichier `astro.config.mjs` définit un `base` qui peut être :
- `/` pour un déploiement à la racine d’un domaine
- `"/mon_site/"` pour un déploiement dans un sous-dossier (cas GitHub Pages)

Le template v2 est conçu pour fonctionner dans les **deux cas** sans changement de code autre que la valeur de `base`.

### 9.2 src/utils/url.ts
Nouveau fichier centralisant la logique d’URL.

Responsabilités typiques :
- récupérer le base path défini par Astro
- normaliser ce base path (suppression des doubles slashes, gestion du trailing slash)
- fournir des fonctions utilitaires simples, par exemple :
  - `getBasePath()`
  - `buildUrl(page: string)`
  - `resolveHref(href: string)`

Contraintes :
- ne pas introduire de dépendances externes
- garder le code court, lisible et commenté

---

## 10. Navigation & Lien Actif

### 10.1 Construction des liens
Le composant de navigation (`Header.astro` ou `Navigation.astro`) utilise les utilitaires d’URL pour construire tous les liens internes.

- Les liens de menu sont définis comme une liste de pages logiques (ex : `""`, `"about.html"`, etc.).
- Chaque entrée est passée à `buildUrl()` pour produire une URL correcte, quel que soit le base path.

Exemple conceptuel :
```ts
const links = [
  { href: buildUrl(""), label: "Accueil" },
  { href: buildUrl("about.html"), label: "À propos" },
  { href: buildUrl("contact.html"), label: "Contact" },
];
```

### 10.2 Détection de la page active
La détection du lien actif se fait en utilisant `Astro.url.pathname` côté composant.

Principes :
- normaliser à la fois l’URL courante et les href des liens (suppression des trailing slashes sauf pour la racine)
- gérer un cas spécifique pour la page d’accueil pour éviter qu’elle soit marquée active partout
- appliquer `aria-current="page"` uniquement sur le lien correspondant à la page courante

Résultat :
- la navigation fonctionne aussi bien à la racine que dans un sous-dossier
- le lien "Accueil" est uniquement actif sur la vraie page d’accueil

---

## 11. ButtonLink & Résolution Automatique des URLs

### 11.1 Rôle de ButtonLink.astro
`ButtonLink.astro` est la primitive utilisée pour tous les CTAs et liens de type bouton.

Dans la v2, il intègre une logique de **résolution automatique des URLs** :
- si `href` commence par `http://` ou `https://` → l’URL est utilisée telle quelle
- si `href` est une URL absolue interne (ex : `/fr/contact`) → elle est normalisée par rapport au base path
- si `href` est relative (ex : `"contact.html"`) → elle est automatiquement préfixée par le base path

### 11.2 Convention pour les contenus
Grâce à cette logique, tous les fichiers de contenu :
- peuvent utiliser des `href` relatifs simples
- restent indépendants du contexte de déploiement
- ne nécessitent aucune modification lors d’un changement de base path

---

## 12. Documentation du Template & Multi‑Marque

### 12.1 README.md
Le README explique désormais :
- comment cloner le template
- comment définir le base path dans `astro.config.mjs` pour GitHub Pages
- comment développer et builder le site
- comment écrire les liens dans les contenus (règle des chemins relatifs)

### 12.2 MULTI_BRAND_GUIDE.md
Le guide multi‑marque reste centré sur :
- la duplication du template pour chaque nouvelle marque
- la personnalisation via `tokens.css`
- l’adaptation du contenu (pages & sections)

Il mentionne également :
- la marche à suivre pour définir le base path du nouveau projet
- la garantie que les liens de contenu restent valides sans changement grâce à la résolution automatique.

---

## 13. Qualité Technique & Tests

Le template inclut :
- TypeScript strict
- tests unitaires simples (Vitest)
- tests E2E (Playwright)
- audits automatisés : accessibilité, Lighthouse, liens
- ESLint + Prettier
- build propre sans warnings

### 13.1 Tests liés au base path (nouveaux)
Des tests ciblés valident :
- la normalisation du base path
- la construction des URLs par `buildUrl()`
- la résolution des `href` relatifs et absolus
- le comportement du lien actif dans la navigation

Ces tests représentent le **minimum utile** pour éviter les régressions lors de futurs changements.

---

## 14. Finalité du Template (v2)

Alpha WebCore Template v2 sert de socle pour :
- la création rapide de sites pour plusieurs marques
- des projets développés par des agents IA
- une architecture simple, stable, prédictive et adaptable
- **un déploiement fiable aussi bien à la racine que dans un sous-dossier (GitHub Pages)**

Il reste :
- minimaliste
- lisible
- sans sur‑ingénierie
- prêt à être dupliqué, adapté et étendu par des humains comme par des agents IA.

