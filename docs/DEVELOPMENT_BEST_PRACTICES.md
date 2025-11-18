# 📋 Guide des Bonnes Pratiques pour les Développeurs

**Pour agents IA et développeurs humains travaillant sur ce projet**

---

## ⚠️ RÈGLES CRITIQUES - À RESPECTER ABSOLUMENT

### 🔗 Règle #1 : TOUJOURS utiliser `buildUrl()` pour les liens internes

**❌ JAMAIS faire ceci :**
```astro
<!-- NE FONCTIONNE PAS sur GitHub Pages -->
<a href="/fr/library">Library</a>
<a href="/en/guides/add-page">Guide</a>
<a href={`/fr/demo/${slug}`}>Demo</a>
```

**✅ TOUJOURS faire ceci :**
```astro
---
import { buildUrl } from '@/utils/url';
---

<!-- Fonctionne partout (local + GitHub Pages) -->
<a href={buildUrl('/fr/library')}>Library</a>
<a href={buildUrl('/en/guides/add-page')}>Guide</a>
<a href={buildUrl(`/fr/demo/${slug}`)}>Demo</a>
```

### 🎯 Pourquoi c'est CRITIQUE ?

**Le site est déployé sur GitHub Pages avec un base path :**
- **URL déployée :** `https://alphatoomegaconsulting.github.io/website_template/`
- **Base path :** `/website_template/`

**Sans `buildUrl()` :**
- En local (`base = '/'`) : Les liens fonctionnent ✅
- Sur GitHub Pages (`base = '/website_template/'`) : Les liens cassent ❌ 404

**Avec `buildUrl()` :**
- En local : `/fr/library` ✅
- Sur GitHub Pages : `/website_template/fr/library` ✅
- **Fonctionne partout !** ✅

---

## 📝 Checklist pour Chaque Nouvelle Page

Avant de créer ou modifier une page `.astro`, vérifier :

### ✅ 1. Imports Requis
```astro
---
import { buildUrl } from '@/utils/url';
---
```

### ✅ 2. Liens Internes
Tous les liens `<a href="...">` vers des pages internes doivent utiliser `buildUrl()` :

```astro
<!-- ❌ INCORRECT -->
<a href="/fr/">Accueil</a>

<!-- ✅ CORRECT -->
<a href={buildUrl('/fr/')}>Accueil</a>
```

### ✅ 3. Liens Externes
Les liens externes ne doivent **PAS** utiliser `buildUrl()` :

```astro
<!-- ✅ CORRECT - Lien externe -->
<a href="https://example.com">Site externe</a>
<a href="mailto:contact@example.com">Email</a>
```

### ✅ 4. Liens dans les Templates
Les liens avec variables/interpolations doivent aussi utiliser `buildUrl()` :

```astro
<!-- ❌ INCORRECT -->
<a href={`/en/library/${category}/${slug}`}>Voir détails</a>

<!-- ✅ CORRECT -->
<a href={buildUrl(`/en/library/${category}/${slug}`)}>Voir détails</a>
```

### ✅ 5. Utiliser les Composants Existants
Préférer les composants qui gèrent déjà `buildUrl()` en interne :

```astro
<!-- ✅ ButtonLink gère buildUrl() automatiquement -->
<ButtonLink href="/fr/guides">Voir les guides</ButtonLink>

<!-- ⚠️ Si vous utilisez <a>, n'oubliez pas buildUrl() -->
<a href={buildUrl('/fr/guides')}>Voir les guides</a>
```

---

## 🧪 Validation Avant Commit

**TOUJOURS exécuter ces commandes avant de commiter :**

```bash
# 1. Valider le code source
pnpm validate:source

# 2. Builder le projet
pnpm build

# 3. Valider le HTML généré
pnpm validate:build

# OU tout en une commande :
pnpm validate:links
```

**Si un test échoue :**
1. Lire le message d'erreur (il indique le fichier et la ligne)
2. Trouver le lien hardcodé dans le fichier source
3. Ajouter `import { buildUrl } from '@/utils/url';`
4. Wrapper le lien avec `buildUrl()`
5. Relancer la validation

---

## 📂 Structure du Projet et Bonnes Pratiques

### Composants qui Gèrent Déjà le Base Path

Ces composants utilisent `buildUrl()` en interne, **pas besoin de l'appeler explicitement** :

```astro
<!-- ✅ CORRECT - buildUrl() est géré en interne -->
<ButtonLink href="/fr/library" variant="primary">
  Voir la library
</ButtonLink>
```

**Composants concernés :**
- `<ButtonLink>` - Boutons avec liens
- `<Navigation>` - Menu de navigation
- `<LanguageSwitcher>` - Sélecteur de langue
- `<Footer>` - Pied de page

### Layouts

Les layouts (`BaseLayout.astro`, `SectionLayout.astro`) gèrent automatiquement :
- Les métadonnées avec les bonnes URLs
- Les liens canoniques
- Les liens `hreflang` pour le SEO

**Toujours fournir des `alternateUrls` relatifs :**
```astro
---
const alternateUrls = {
  fr: '/fr/library/primitives',  // ✅ Chemin relatif
  en: '/en/library/primitives'   // ✅ Chemin relatif
};
---

<BaseLayout
  title={title}
  lang={lang}
  alternateUrls={alternateUrls}
>
  <!-- Contenu -->
</BaseLayout>
```

---

## 🚨 Erreurs Courantes à Éviter

### Erreur #1 : Liens Hardcodés dans les Boucles

```astro
<!-- ❌ INCORRECT -->
{items.map(item => (
  <a href={`/fr/category/${item.slug}`}>{item.name}</a>
))}

<!-- ✅ CORRECT -->
{items.map(item => (
  <a href={buildUrl(`/fr/category/${item.slug}`)}>{item.name}</a>
))}
```

### Erreur #2 : Oublier l'Import

```astro
<!-- ❌ INCORRECT - buildUrl() n'est pas importé -->
---
// Pas d'import de buildUrl
---
<a href={buildUrl('/fr/')}>Accueil</a>
```

```astro
<!-- ✅ CORRECT -->
---
import { buildUrl } from '@/utils/url';
---
<a href={buildUrl('/fr/')}>Accueil</a>
```

### Erreur #3 : Utiliser buildUrl() pour les Liens Externes

```astro
<!-- ❌ INCORRECT - buildUrl() n'est pas pour les liens externes -->
<a href={buildUrl('https://example.com')}>Site externe</a>

<!-- ✅ CORRECT -->
<a href="https://example.com">Site externe</a>
```

### Erreur #4 : Base Path dans le Contenu JSON

```json
// ❌ INCORRECT - Ne PAS mettre le base path dans les fichiers JSON
{
  "button": {
    "href": "/website_template/fr/events"
  }
}

// ✅ CORRECT - Utiliser des chemins relatifs
{
  "button": {
    "href": "/fr/events"
  }
}
```

Le composant qui utilise ce JSON doit appliquer `buildUrl()` :
```astro
---
const data = await getEntry('sections', 'hero-home');
---
<a href={buildUrl(data.button.href)}>{data.button.text}</a>
```

---

## 🔍 Comment Détecter les Problèmes

### Symptômes d'un Lien Cassé

**En local (fonctionne) :**
- Le site tourne sur `http://localhost:4321/`
- Les liens semblent fonctionner

**Sur GitHub Pages (casse) :**
- Le site est sur `https://alphatoomegaconsulting.github.io/website_template/`
- Erreur 404 lors du clic sur un lien
- L'URL dans la barre ne contient pas `/website_template/`

### Débogage

**1. Vérifier le HTML généré :**
```bash
pnpm build
# Puis inspecter dist/fr/page/index.html
# Les liens doivent contenir "/website_template/" si PUBLIC_REPO_NAME est défini
```

**2. Vérifier avec les scripts de validation :**
```bash
pnpm validate:source  # Vérifie les fichiers .astro
pnpm validate:build   # Vérifie le HTML généré
```

**3. Tester localement avec le base path :**
```bash
# Définir les variables d'environnement
$env:PUBLIC_SITE_URL = "https://alphatoomegaconsulting.github.io/website_template"
$env:PUBLIC_REPO_NAME = "website_template"

# Builder
pnpm build

# Prévisualiser (noter que preview ne gère pas bien le base path)
pnpm preview

# Mieux : vérifier directement le HTML dans dist/
```

---

## 🛠️ Outils et Utilitaires

### Fonction `buildUrl()`

**Emplacement :** `src/utils/url.ts`

**Usage :**
```typescript
import { buildUrl } from '@/utils/url';

// Liens absolus
buildUrl('/fr/library')
// → En local: '/fr/library'
// → Sur GitHub Pages: '/website_template/fr/library'

// Liens avec variables
buildUrl(`/en/guides/${slug}`)
// → En local: '/en/guides/add-page'
// → Sur GitHub Pages: '/website_template/en/guides/add-page'

// Liens externes (retournés inchangés)
buildUrl('https://example.com')
// → 'https://example.com'
```

### Autres Fonctions Utiles

```typescript
// Normaliser un pathname pour la comparaison
normalizePathname('/website_template/fr/library/')
// → '/fr/library'

// Vérifier si un lien est actif (pour la navigation)
isActivePath('/website_template/fr/library', '/fr/library')
// → true

// Vérifier si une URL est externe
isExternalUrl('https://example.com')
// → true
isExternalUrl('/fr/library')
// → false
```

---

## 📋 Checklist pour Nouvelle Fonctionnalité

Avant de soumettre une PR avec de nouvelles pages :

- [ ] Tous les imports `buildUrl` sont présents
- [ ] Tous les liens internes utilisent `buildUrl()`
- [ ] Les liens externes n'utilisent PAS `buildUrl()`
- [ ] `pnpm validate:source` passe ✅
- [ ] `pnpm build` réussit sans erreur ✅
- [ ] `pnpm validate:build` passe ✅
- [ ] Les tests E2E passent ✅
- [ ] Vérification manuelle dans `dist/` ✅

---

## 🎓 Exemples Complets

### Exemple 1 : Page Simple

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { buildUrl } from '@/utils/url';

const title = 'Ma Page';
const description = 'Description de ma page';
const lang = 'fr';

const alternateUrls = {
  fr: '/fr/ma-page',
  en: '/en/my-page'
};
---

<BaseLayout
  title={title}
  description={description}
  lang={lang}
  alternateUrls={alternateUrls}
>
  <main>
    <h1>Ma Page</h1>
    
    <!-- Liens internes -->
    <a href={buildUrl('/fr/')}>Accueil</a>
    <a href={buildUrl('/fr/library')}>Library</a>
    
    <!-- Lien externe -->
    <a href="https://example.com">Site externe</a>
  </main>
</BaseLayout>
```

### Exemple 2 : Page avec Liste Dynamique

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { buildUrl } from '@/utils/url';

const items = [
  { slug: 'button', name: 'Button' },
  { slug: 'card', name: 'Card' },
  { slug: 'input', name: 'Input' },
];

const lang = 'en';
---

<BaseLayout title="Components" lang={lang}>
  <main>
    <h1>UI Components</h1>
    
    <ul>
      {items.map(item => (
        <li>
          <a href={buildUrl(`/en/library/primitives/${item.slug}`)}>
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </main>
</BaseLayout>
```

### Exemple 3 : Utiliser ButtonLink

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import ButtonLink from '@/components/primitives/ButtonLink.astro';
---

<BaseLayout title="CTA Page" lang="fr">
  <main>
    <h1>Découvrez nos services</h1>
    
    <!-- ButtonLink gère buildUrl() automatiquement -->
    <ButtonLink 
      href="/fr/services/design"
      variant="primary"
      size="lg"
    >
      Voir nos designs
    </ButtonLink>
    
    <!-- Lien externe -->
    <ButtonLink 
      href="https://github.com/example"
      variant="secondary"
    >
      Voir sur GitHub
    </ButtonLink>
  </main>
</BaseLayout>
```

---

## 🚀 Workflow de Développement Recommandé

### 1. Avant de Commencer
```bash
# S'assurer d'être à jour
git pull origin main
pnpm install
```

### 2. Pendant le Développement
```bash
# Lancer le serveur de dev
pnpm dev

# Dans un autre terminal, surveiller les erreurs
pnpm validate:source
```

### 3. Avant de Commiter
```bash
# Valider tout
pnpm validate:links

# Lancer les tests
pnpm test

# Vérifier le build complet
pnpm build
```

### 4. Avant de Pusher
```bash
# Pipeline CI complet
pnpm ci
```

---

## 📚 Ressources Supplémentaires

### Documentation Interne
- **`docs/GITHUB_PAGES_DEPLOYMENT.md`** - Guide de déploiement complet
- **`docs/RESOLUTION_REPORT_GITHUB_PAGES_LINKS.md`** - Rapport de résolution du problème
- **`docs/TEST_GAP_ANALYSIS.md`** - Analyse des lacunes dans les tests
- **`src/utils/url.ts`** - Code source des utilitaires d'URL

### Scripts de Validation
- **`scripts/validate-source-links.ts`** - Valide les fichiers sources
- **`scripts/validate-build-links.ts`** - Valide le HTML généré
- **`scripts/check-links.ts`** - Vérifie l'intégrité des liens
- **`scripts/validate-header-links.ts`** - Valide les liens du header

### Commandes Utiles
```bash
# Validation
pnpm validate:source      # Valider les sources .astro
pnpm validate:build       # Valider le HTML généré
pnpm validate:links       # Valider source + build

# Tests
pnpm test                 # Tests unitaires
pnpm test:e2e            # Tests end-to-end
pnpm ci                  # Pipeline CI complet

# Développement
pnpm dev                 # Serveur de développement
pnpm build               # Build de production
pnpm preview             # Prévisualiser le build
```

---

## ⚡ Résumé - À Retenir

### 🔴 NE JAMAIS
- ❌ Écrire des liens hardcodés : `<a href="/fr/page">`
- ❌ Oublier l'import de `buildUrl`
- ❌ Utiliser `buildUrl()` pour les liens externes
- ❌ Mettre le base path dans les fichiers JSON
- ❌ Commiter sans valider avec `pnpm validate:links`

### 🟢 TOUJOURS
- ✅ Utiliser `buildUrl()` : `<a href={buildUrl('/fr/page')}>`
- ✅ Importer : `import { buildUrl } from '@/utils/url';`
- ✅ Valider avant de commiter : `pnpm validate:links`
- ✅ Tester le build : `pnpm build`
- ✅ Vérifier le HTML généré dans `dist/`

---

## 🆘 En Cas de Problème

**Si vous voyez une erreur 404 sur GitHub Pages :**

1. **Vérifier le lien dans le code source**
   ```bash
   # Chercher les liens hardcodés
   grep -r 'href="/fr/' src/pages/
   grep -r 'href="/en/' src/pages/
   ```

2. **Valider les sources**
   ```bash
   pnpm validate:source
   ```

3. **Corriger en ajoutant buildUrl()**
   ```astro
   ---
   import { buildUrl } from '@/utils/url';
   ---
   <a href={buildUrl('/fr/page')}>Page</a>
   ```

4. **Vérifier que c'est corrigé**
   ```bash
   pnpm validate:links
   ```

5. **Commiter et pusher**
   ```bash
   git add .
   git commit -m "fix: use buildUrl for internal links"
   git push
   ```

---

## 📞 Support

**Questions ou problèmes ?**
- Consulter `docs/GITHUB_PAGES_DEPLOYMENT.md`
- Lire le rapport de résolution : `docs/RESOLUTION_REPORT_GITHUB_PAGES_LINKS.md`
- Vérifier les tests : `tests/e2e/base-path-validation.spec.ts`

---

**Ce guide doit être suivi à la lettre pour garantir que le site fonctionne correctement sur GitHub Pages.** ✅

*Dernière mise à jour : 18 novembre 2025*
