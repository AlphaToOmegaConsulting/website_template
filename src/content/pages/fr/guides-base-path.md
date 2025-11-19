---
title: "Base Path & Déploiement"
description: "Comprendre et maîtriser le déploiement en sous-dossier"
lang: "fr"
publishDate: 2025-11-19
draft: false
seo:
  noindex: false
---

# Guide Base Path & Déploiement

> **Objectif :** Comprendre le fonctionnement du base path et maîtriser le déploiement en sous-dossier (GitHub Pages, sites multiples).

## 🎯 Qu'est-ce que le Base Path ?

Le **base path** est un préfixe ajouté automatiquement à toutes les URLs du site pour permettre son déploiement dans un sous-dossier plutôt qu'à la racine d'un domaine.

### Exemples de déploiement :

**Site racine :**
```
https://example.com/
https://example.com/about
→ base: '/'
```

**Sous-dossier :**
```
https://example.com/mon-projet/
https://example.com/mon-projet/about
→ base: '/mon-projet/'
```

**GitHub Pages (project site) :**
```
https://user.github.io/repository/
https://user.github.io/repository/about
→ site: 'https://user.github.io'
→ base: '/repository/'
```

## 🚨 Règle Critique #1 – Base Path

### INTERDICTIONS ABSOLUES :
- ❌ Aucune URL interne ne doit commencer par `/...`
- ❌ Aucun lien écrit en dur : `href="/about"`
- ❌ Aucun asset ne doit commencer par `/assets/...`

### OBLIGATIONS ABSOLUES :
- ✅ Tous les liens internes doivent passer par `buildUrl()`
- ✅ `buildUrl()` doit être basé sur `import.meta.env.BASE_URL`
- ✅ Tous les composants contenant des `href` doivent documenter cette exigence
- ✅ Tous les assets doivent utiliser un helper `publicAsset()` ou équivalent

### Pourquoi ?
- Compatibilité GitHub Pages
- Compatibilité déploiement en sous-dossier
- Compatibilité sites multiples
- Aucun lien cassé en production

## 🔧 Configuration Astro

### Fichier `astro.config.mjs`

**Pour un site racine :**
```js
export default defineConfig({
  site: 'https://example.com',
  base: '/'
});
```

**Pour GitHub Pages (project site) :**
```js
export default defineConfig({
  site: 'https://user.github.io',
  base: '/repository/'
});
```

**Pour un sous-dossier :**
```js
export default defineConfig({
  site: 'https://example.com',
  base: '/mon-projet/'
});
```

## 🔗 Utilisation de `buildUrl()`

### Dans les composants Astro :

```astro
---
import { buildUrl } from '@/utils/url';
---

<!-- ❌ INTERDIT -->
<a href="/about">À propos</a>
<a href="/fr/contact">Contact</a>

<!-- ✅ CORRECT -->
<a href={buildUrl('/about')}>À propos</a>
<a href={buildUrl('/fr/contact')}>Contact</a>
```

### Dans les sections :

```astro
---
const { cta } = Astro.props;
---

<!-- ✅ CORRECT -->
<a href={buildUrl(cta.href)}>{cta.label}</a>
```

## 🖼️ Gestion des Assets

### Dans les composants :

```astro
---
import { publicAsset } from '@/utils/url';
---

<!-- ❌ INTERDIT -->
<img src="/assets/logo.svg" alt="Logo" />
<img src="/images/hero.jpg" alt="Hero" />

<!-- ✅ CORRECT -->
<img src={publicAsset('logo.svg')} alt="Logo" />
<img src={publicAsset('images/hero.jpg')} alt="Hero" />
```

### Dans les fichiers de contenu :

```json
{
  "image": "team/john.jpg"
}
```

**Le helper `publicAsset()` est appliqué dans les composants**, pas dans le contenu.

## ✅ Tests de Validation

### Scripts de validation obligatoires :

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

### Tests E2E Base Path

Les tests E2E simulent un déploiement en sous-dossier :
```
BASE_PATH=/test-base/ pnpm test:e2e
```

Ils vérifient :
- ✅ Tous les liens internes fonctionnent
- ✅ Toutes les images sont chargées
- ✅ La navigation fonctionne
- ✅ Le language switcher fonctionne

## 📋 Checklist Déploiement

### Avant le déploiement
- [ ] Configuration `astro.config.mjs` correcte
- [ ] Tous les liens utilisent `buildUrl()`
- [ ] Tous les assets utilisent `publicAsset()`
- [ ] `validate:source` OK
- [ ] `validate:build` OK
- [ ] `validate:links` OK
- [ ] `check-links` OK
- [ ] Tests E2E base path OK

### Déploiement GitHub Pages
- [ ] `site` configuré : `https://user.github.io`
- [ ] `base` configuré : `/repository/`
- [ ] Branche de déploiement configurée
- [ ] Actions GitHub configurées (si utilisées)
- [ ] Tests E2E base path passent avec `/repository/`

### Déploiement en sous-dossier
- [ ] `base` configuré avec le bon chemin
- [ ] Tests locaux avec base path
- [ ] Vérification des URLs générées
- [ ] Vérification des assets

## 🎯 Résumé

Pour garantir la compatibilité base path :
1. **Toujours utiliser `buildUrl()`** pour les liens internes
2. **Toujours utiliser `publicAsset()`** pour les assets
3. **Configurer correctement `astro.config.mjs`**
4. **Relancer tous les tests** après toute modification
5. **Tester en local avec base path** avant déploiement

**Le respect de ces règles garantit un site fonctionnel dans TOUS les environnements de déploiement.**
