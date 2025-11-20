/**
 * Script de validation des liens dans les fichiers HTML générés
 * Détecte les liens hardcodés sans base path qui ne fonctionneront pas sur GitHub Pages
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');

interface Violation {
  file: string;
  link: string;
  context: string;
}

const violations: Violation[] = [];

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

// Vérifier que le répertoire dist existe
if (!fs.existsSync(distDir)) {
  console.error('❌ Le répertoire dist n\'existe pas. Exécutez "pnpm build" d\'abord.');
  process.exit(1);
}

console.log('🔍 Scanning des fichiers HTML pour détecter les liens hardcodés...\n');

scanAllHtmlFiles(distDir);

if (violations.length > 0) {
  console.error(`❌ ${violations.length} lien(s) hardcodé(s) détecté(s) dans les fichiers HTML générés.`);
  console.error('Ces liens ne fonctionneront pas sur GitHub Pages avec base path.\n');
  
  // Grouper les violations par fichier
  const violationsByFile = new Map<string, Violation[]>();
  for (const v of violations) {
    if (!violationsByFile.has(v.file)) {
      violationsByFile.set(v.file, []);
    }
    violationsByFile.get(v.file)!.push(v);
  }

  // Afficher les violations groupées par fichier
  for (const [file, fileViolations] of violationsByFile.entries()) {
    console.error(`\n📄 ${file} (${fileViolations.length} lien(s)):`);
    for (const v of fileViolations) {
      console.error(`   🔗 ${v.link}`);
      console.error(`   📝 ${v.context}\n`);
    }
  }

  console.error('\n🔧 Solution:');
  console.error('  1. Trouver le fichier source .astro correspondant');
  console.error('  2. Importer buildUrl: import { buildUrl } from \'@/utils/url\';');
  console.error(`  3. Wrapper le lien: href={buildUrl('${violations[0]?.link}')}\n`);
  
  process.exit(1);
} else {
  console.log('✅ Aucun lien hardcodé détecté. Tous les liens utilisent le base path correctement.\n');
  process.exit(0);
}
