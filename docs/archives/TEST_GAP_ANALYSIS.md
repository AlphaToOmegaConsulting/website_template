# Analyse des lacunes dans les tests

## Problème identifié

**Page affectée :** `/en/library/primitives/index.astro` (et version FR)
**Liens cassés :** Les liens "View Details" vers les pages de détail des primitives
**Exemple :** `href="/en/library/primitives/button"` devrait être `href="/website_template/en/library/primitives/button"` sur GitHub Pages

## Pourquoi les tests ne détectent pas ce problème

### 1. **Le fichier n'est pas dans la liste des "critical pages"**

Dans `base-path-validation.spec.ts`, le test `should validate buildUrl usage in critical navigation pages` vérifie une liste **hardcodée** de pages :

```typescript
const criticalPages = [
  'src/pages/en/library/index.astro',      // ✅ Vérifié
  'src/pages/fr/library/index.astro',      // ✅ Vérifié
  'src/pages/en/demo/index.astro',         // ✅ Vérifié
  // ...
  // ❌ MANQUANT: 'src/pages/en/library/primitives/index.astro'
  // ❌ MANQUANT: 'src/pages/fr/library/primitives/index.astro'
];
```

**Problème :** La page `src/pages/en/library/primitives/index.astro` n'est **pas dans cette liste**, donc le test ne vérifie jamais si elle utilise `buildUrl()`.

### 2. **Le test de validation du HTML construit est insuffisant**

Le test `should not have hardcoded absolute paths without base path in HTML files` recherche les patterns suivants :

```typescript
const problematicLinkPattern = /href=["'](\/(fr|en)\/[^"'#]+)["']/g;
```

Ce pattern **devrait détecter** `href="/en/library/primitives/button"`, mais il y a un problème dans la logique :

**Analyse du code :**
```typescript
while ((match = problematicLinkPattern.exec(line)) !== null) {
  const url = match[1];  // url = "/en/library/primitives/button"
  
  // Vérifier si c'est une exception valide
  const isException = validExceptions.some(exc => url.startsWith(exc));
  // validExceptions = ['/assets/', '/_astro/', '/#']
  
  if (!isException) {
    violations.push(...);  // ✅ Devrait ajouter une violation
  }
}
```

**Le test devrait détecter le problème !** Mais pourquoi ne le fait-il pas ?

### 3. **Vérification : Le test fonctionne-t-il vraiment ?**

Pour vérifier, regardons les résultats du dernier test :

```bash
pnpm test:e2e
```

Si le test `base-path-validation.spec.ts` passe, cela signifie soit :
- Le fichier HTML n'est pas scanné (problème de parcours de répertoire)
- Le pattern regex ne matche pas correctement
- Une autre issue technique

### 4. **Le test link-integrity.spec.ts ne vérifie pas cette page**

Dans `link-integrity.spec.ts`, la liste des pages testées est limitée :

```typescript
const pages = [
  '/fr/',
  '/en/',
  '/fr/demo/',
  '/en/demo/',
  '/fr/library/',          // ✅ Teste la page index de library
  '/en/library/',          // ✅ Teste la page index de library
  '/fr/guides/',
  '/en/guides/',
  // ❌ MANQUANT: '/en/library/primitives/'
  // ❌ MANQUANT: '/fr/library/primitives/'
];
```

**Problème :** Ce test vérifie que les liens ne retournent pas 404, mais il ne teste **jamais** la page `/en/library/primitives/` elle-même.

### 5. **Les tests s'exécutent en mode preview local**

Les tests E2E s'exécutent avec `pnpm preview`, qui utilise le base path **local** défini dans `astro.config.mjs` :

```javascript
const repo = process.env.PUBLIC_REPO_NAME || '';
base: repo ? `/${repo}` : '/',
```

Localement, `PUBLIC_REPO_NAME` n'est pas défini, donc `base = '/'`.

**Conséquence :** Les tests E2E vérifient les liens avec `base = '/'`, ce qui signifie :
- Les liens `href="/en/library/primitives/button"` fonctionnent en local
- Mais ne fonctionneront pas sur GitHub Pages avec `base = '/website_template/'`

## Solutions pour améliorer la couverture des tests

### Solution 1 : Ajouter les pages manquantes aux tests de validation

Modifier `base-path-validation.spec.ts` :

```typescript
const criticalPages = [
  // ... pages existantes
  'src/pages/en/library/primitives/index.astro',  // ✅ Ajouter
  'src/pages/fr/library/primitives/index.astro',  // ✅ Ajouter
  'src/pages/en/library/sections/index.astro',    // ✅ Ajouter aussi
  'src/pages/fr/library/sections/index.astro',    // ✅ Ajouter aussi
  'src/pages/en/library/layout/index.astro',      // ✅ Ajouter aussi
  'src/pages/fr/library/layout/index.astro',      // ✅ Ajouter aussi
];
```

### Solution 2 : Scanner automatiquement tous les fichiers .astro

Au lieu d'une liste hardcodée, scanner récursivement tous les fichiers :

```typescript
function getAllAstroPages(dir: string): string[] {
  const pages: string[] = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      pages.push(...getAllAstroPages(filePath));
    } else if (file.endsWith('.astro')) {
      pages.push(filePath);
    }
  }
  
  return pages;
}

const pagesDir = path.join(process.cwd(), 'src/pages');
const allPages = getAllAstroPages(pagesDir);
```

### Solution 3 : Tester avec base path en environnement de test

Forcer les tests E2E à s'exécuter avec le base path configuré :

```bash
# Dans package.json
"test:e2e:github": "cross-env PUBLIC_REPO_NAME=website_template pnpm build && pnpm preview --base /website_template & pnpm playwright test"
```

### Solution 4 : Ajouter les sous-pages de library aux tests d'intégrité

Modifier `link-integrity.spec.ts` :

```typescript
const pages = [
  // ... pages existantes
  '/en/library/primitives/',    // ✅ Ajouter
  '/fr/library/primitives/',    // ✅ Ajouter
  '/en/library/sections/',      // ✅ Ajouter
  '/fr/library/sections/',      // ✅ Ajouter
  '/en/library/layout/',        // ✅ Ajouter
  '/fr/library/layout/',        // ✅ Ajouter
];
```

### Solution 5 : Test automatique de tous les liens dans le build

Créer un test qui scanne **tous** les fichiers HTML et vérifie **tous** les liens :

```typescript
test('should validate all links in all HTML files', async () => {
  const distDir = path.join(process.cwd(), 'dist');
  const violations: Array<{file: string; link: string}> = [];
  
  // Scanner récursivement tous les HTML
  function scanAllHtml(dir: string) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanAllHtml(filePath);
      } else if (file.endsWith('.html')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Extraire tous les href
        const hrefPattern = /href=["']([^"']+)["']/g;
        let match;
        
        while ((match = hrefPattern.exec(content)) !== null) {
          const url = match[1];
          
          // Vérifier si c'est un lien interne absolu sans base path
          if (url.match(/^\/(fr|en)\/.+/) && !url.startsWith('/assets/') && !url.startsWith('/_astro/')) {
            violations.push({
              file: path.relative(distDir, filePath),
              link: url
            });
          }
        }
      }
    }
  }
  
  scanAllHtml(distDir);
  expect(violations).toEqual([]);
});
```

## Recommandations

1. **Court terme :** Ajouter manuellement les pages manquantes à la liste des "critical pages"
2. **Moyen terme :** Implémenter un scanner automatique de tous les fichiers `.astro`
3. **Long terme :** Créer un test qui vérifie **tous** les liens dans **tous** les fichiers HTML générés

## Conclusion

Les tests actuels ont deux faiblesses principales :

1. **Liste hardcodée incomplète** : Les pages de sous-sections (comme `/library/primitives/`) ne sont pas testées
2. **Tests E2E en local** : Les tests s'exécutent avec `base = '/'` au lieu de `base = '/website_template/'`, masquant les problèmes de base path

Pour une couverture complète, il faut :
- Scanner **toutes** les pages `.astro` automatiquement
- Ou tester **tous** les fichiers HTML générés dans `dist/`
- Exécuter les tests E2E avec le même base path que GitHub Pages
