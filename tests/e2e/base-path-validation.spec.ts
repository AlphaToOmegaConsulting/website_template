import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Test de validation du base path pour GitHub Pages
 *
 * Ce test vérifie que tous les liens internes dans les fichiers HTML générés
 * utilisent correctement le base path. Il simule l'environnement GitHub Pages
 * où le site est déployé dans un sous-dossier (ex: /website_template/).
 *
 * Le test analyse les fichiers HTML du build et vérifie que :
 * 1. Aucun lien interne absolu ne commence par /fr/, /en/ sans le base path
 * 2. Tous les liens internes utilisent soit des chemins relatifs, soit le base path complet
 */

test.describe('Base Path Validation', () => {
  const distDir = path.join(process.cwd(), 'dist');

  test('should not have hardcoded absolute paths without base path in HTML files', async () => {
    // Vérifier que le répertoire dist existe
    if (!fs.existsSync(distDir)) {
      throw new Error('Le répertoire dist n\'existe pas. Exécutez "pnpm build" d\'abord.');
    }

    const violations: Array<{file: string; line: number; content: string}> = [];

    // Pattern pour détecter les liens problématiques :
    // - href="/fr/... ou href="/en/... (liens absolus sans base path)
    // - Exclusions : href="/#" (ancres), href="/assets/", href="/_astro/" (assets)
    const problematicLinkPattern = /href=["'](\/(fr|en)\/[^"'#]+)["']/g;
    const validExceptions = ['/assets/', '/_astro/', '/#'];

    // Fonction récursive pour parcourir tous les fichiers HTML
    function scanDirectory(dir: string) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          scanDirectory(filePath);
        } else if (file.endsWith('.html')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const lines = content.split('\n');

          lines.forEach((line, index) => {
            let match;
            while ((match = problematicLinkPattern.exec(line)) !== null) {
              const url = match[1];

              // Vérifier si c'est une exception valide
              const isException = validExceptions.some(exc => url.startsWith(exc));

              if (!isException) {
                violations.push({
                  file: path.relative(distDir, filePath),
                  line: index + 1,
                  content: line.trim()
                });
              }
            }
          });
        }
      }
    }

    scanDirectory(distDir);

    // Si des violations sont trouvées, générer un message d'erreur détaillé
    if (violations.length > 0) {
      const errorMessage = violations
        .map(v => `  ${v.file}:${v.line}\n    ${v.content}`)
        .join('\n\n');

      expect(violations,
        `Liens absolus trouvés sans base path. Ces liens ne fonctionneront pas sur GitHub Pages.\n\n` +
        `Pour corriger, utilisez la fonction buildUrl() de @/utils/url dans vos composants Astro :\n` +
        `  import { buildUrl } from '@/utils/url';\n` +
        `  <a href={buildUrl('/fr/library/primitives')}>...</a>\n\n` +
        `Violations trouvées:\n\n${errorMessage}`
      ).toEqual([]);
    }
  });

  test('should have valid internal links structure in index pages', async () => {
    // Tester spécifiquement les pages index qui sont souvent problématiques
    const indexPages = [
      'en/library/index.html',
      'fr/library/index.html',
      'en/page/index.html',
      'fr/page/index.html',
      'en/demo/index.html',
      'fr/demo/index.html',
    ];

    const issues: Array<{page: string; problem: string}> = [];

    for (const page of indexPages) {
      const filePath = path.join(distDir, page);

      if (!fs.existsSync(filePath)) {
        issues.push({
          page,
          problem: 'Page non trouvée dans le build'
        });
        continue;
      }

      const content = fs.readFileSync(filePath, 'utf-8');

      // Extraire tous les liens href
      const hrefPattern = /href=["']([^"']+)["']/g;
      let match;

      while ((match = hrefPattern.exec(content)) !== null) {
        const url = match[1];

        // Vérifier les liens internes absolus
        if (url.startsWith('/') && !url.startsWith('//')) {
          // Exclure les assets et les ancres
          if (url.startsWith('/assets/') || url.startsWith('/_astro/') || url === '/' || url.match(/^\/(fr|en)\/?$/)) {
            continue;
          }

          // Si c'est un lien vers /fr/ ou /en/ (autre que racine), c'est un problème
          if (url.match(/^\/(fr|en)\/.+/)) {
            issues.push({
              page,
              problem: `Lien absolu sans base path trouvé: ${url}`
            });
          }
        }
      }
    }

    if (issues.length > 0) {
      const errorMessage = issues
        .map(i => `  ${i.page}: ${i.problem}`)
        .join('\n');

      expect(issues,
        `Problèmes de structure de liens détectés dans les pages index:\n\n${errorMessage}`
      ).toEqual([]);
    }
  });

  test('should validate buildUrl usage in critical navigation pages', async () => {
    // Ce test vérifie que les pages critiques utilisent buildUrl()
    // en inspectant le code source (avant build) pour s'assurer que
    // les développeurs utilisent la bonne pratique

    const criticalPages = [
      'src/pages/en/library/index.astro',
      'src/pages/fr/library/index.astro',
      'src/pages/en/page/index.astro',
      'src/pages/fr/page/index.astro',
      'src/pages/en/demo/index.astro',
      'src/pages/fr/demo/index.astro',
      // Pages 404
      'src/pages/en/404.astro',
      'src/pages/fr/404.astro',
    ];

    const issues: Array<{page: string; problem: string}> = [];

    for (const page of criticalPages) {
      const filePath = path.join(process.cwd(), page);

      if (!fs.existsSync(filePath)) {
        issues.push({
          page,
          problem: 'Fichier source non trouvé'
        });
        continue;
      }

      const content = fs.readFileSync(filePath, 'utf-8');

      // Vérifier que buildUrl est importé
      if (!content.includes('buildUrl')) {
        issues.push({
          page,
          problem: 'buildUrl() non importé - risque de liens cassés sur GitHub Pages'
        });
        continue;
      }

      // Vérifier qu'il n'y a pas de href="/ hardcodé dans les balises <a>
      // (à l'exception des liens racine comme href="/fr/" ou href="/en/")
      // IMPORTANT : On exclut ButtonLink car il gère buildUrl() en interne
      const hardcodedLinkPattern = /<a\s[^>]*href=["'](\/(?: fr|en)\/[^"'#]+)["']/g;
      let match;

      while ((match = hardcodedLinkPattern.exec(content)) !== null) {
        const url = match[1];
        // Vérifier si c'est dans un buildUrl() ou non
        const surroundingCode = content.substring(Math.max(0, match.index - 20), match.index + 50);

        if (!surroundingCode.includes('buildUrl')) {
          // Extraire un contexte plus large pour le message d'erreur
          const lineStart = content.lastIndexOf('\n', match.index);
          const lineEnd = content.indexOf('\n', match.index + 50);
          const fullLine = content.substring(lineStart + 1, lineEnd > 0 ? lineEnd : undefined).trim();
          
          issues.push({
            page,
            problem: `Lien <a> hardcodé trouvé sans buildUrl(): ${url}\n      Code: ${fullLine.substring(0, 100)}...`
          });
        }
      }
    }

    if (issues.length > 0) {
      const errorMessage = issues
        .map(i => `  ${i.page}:\n    ${i.problem}`)
        .join('\n\n');

      expect(issues,
        `Problèmes d'utilisation de buildUrl() détectés dans les pages critiques:\n\n${errorMessage}\n\n` +
        `Pour corriger:\n` +
        `  1. Importer buildUrl: import { buildUrl } from '@/utils/url';\n` +
        `  2. Wrapper tous les liens internes: href={buildUrl('/fr/library/primitives')}\n`
      ).toEqual([]);
    }
  });

  test('should scan all HTML files for hardcoded links without base path', async () => {
    // Ce test scanne TOUS les fichiers HTML générés pour détecter les liens hardcodés
    // C'est un filet de sécurité pour attraper les pages non listées dans criticalPages

    if (!fs.existsSync(distDir)) {
      throw new Error('Le répertoire dist n\'existe pas. Exécutez "pnpm build" d\'abord.');
    }

    const violations: Array<{file: string; link: string; context: string}> = [];

    // Scanner récursivement tous les fichiers HTML
    function scanAllHtmlFiles(dir: string) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          scanAllHtmlFiles(filePath);
        } else if (file.endsWith('.html')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          
          // Pattern pour détecter les liens internes sans base path
          // Cherche href="/fr/... ou href="/en/... (pas href="/website_template/...
          const hrefPattern = /href=["'](\/(?:fr|en)\/[^"'#]+)["']/g;
          let match;

          while ((match = hrefPattern.exec(content)) !== null) {
            const url = match[1];
            
            // Exclure les assets et autres exceptions
            if (url.startsWith('/assets/') || url.startsWith('/_astro/')) {
              continue;
            }

            // Extraire le contexte autour du lien
            const contextStart = Math.max(0, match.index - 50);
            const contextEnd = Math.min(content.length, match.index + 100);
            const context = content.substring(contextStart, contextEnd)
              .replace(/\n/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();

            violations.push({
              file: path.relative(distDir, filePath),
              link: url,
              context: context.substring(0, 80) + '...'
            });
          }
        }
      }
    }

    scanAllHtmlFiles(distDir);

    if (violations.length > 0) {
      const errorMessage = violations
        .map(v => `  📄 ${v.file}\n     🔗 ${v.link}\n     📝 ${v.context}\n`)
        .join('\n');

      expect(violations,
        `❌ ${violations.length} lien(s) hardcodé(s) détecté(s) dans les fichiers HTML générés.\n` +
        `Ces liens ne fonctionneront pas sur GitHub Pages avec base path.\n\n` +
        `Violations trouvées:\n\n${errorMessage}\n` +
        `🔧 Solution:\n` +
        `  1. Trouver le fichier source .astro correspondant\n` +
        `  2. Importer buildUrl: import { buildUrl } from '@/utils/url';\n` +
        `  3. Wrapper le lien: href={buildUrl('${violations[0]?.link}')}\n`
      ).toEqual([]);
    }
  });
});
