/**
 * Script de validation des sources .astro
 * Vérifie que les pages critiques utilisent buildUrl() pour les liens internes
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Issue {
  page: string;
  problem: string;
  lineNumber?: number;
  code?: string;
}

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

const issues: Issue[] = [];

console.log('🔍 Validation des fichiers sources .astro...\n');

for (const page of criticalPages) {
  const filePath = path.join(__dirname, '..', page);

  if (!fs.existsSync(filePath)) {
    issues.push({
      page,
      problem: 'Fichier source non trouvé'
    });
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Vérifier que buildUrl est importé si la page contient des liens
  const hasLinks = /<a\s[^>]*href=/.test(content);
  const hasBuildUrlImport = content.includes('buildUrl');

  if (hasLinks && !hasBuildUrlImport) {
    // Vérifier si ce sont des liens internes
    const hasInternalLinks = /href=["']\/(?:fr|en)\//.test(content);
    
    if (hasInternalLinks) {
      issues.push({
        page,
        problem: 'buildUrl() non importé mais liens internes détectés'
      });
    }
  }

  // Vérifier qu'il n'y a pas de href="/ hardcodé dans les balises <a>
  // (à l'exception des liens racine comme href="/fr/" ou href="/en/")
  const hardcodedLinkPattern = /<a\s[^>]*href=["'](\/(?:fr|en)\/[^"'#]+)["']/g;
  let match;

  while ((match = hardcodedLinkPattern.exec(content)) !== null) {
    const url = match[1];
    
    // Trouver le numéro de ligne
    const position = match.index;
    const lineNumber = content.substring(0, position).split('\n').length;
    
    // Vérifier si c'est dans un buildUrl() ou non
    const surroundingCode = content.substring(Math.max(0, match.index - 30), match.index + 50);

    if (!surroundingCode.includes('buildUrl')) {
      // Extraire la ligne de code
      const codeLine = lines[lineNumber - 1]?.trim() || '';
      
      issues.push({
        page,
        problem: `Lien <a> hardcodé trouvé sans buildUrl(): ${url}`,
        lineNumber,
        code: codeLine.substring(0, 80)
      });
    }
  }

  // Vérifier aussi les href dans les interpolations {}
  const templateLinkPattern = /href=\{`(\/(?:fr|en)\/[^`#]+)`\}/g;
  
  while ((match = templateLinkPattern.exec(content)) !== null) {
    const url = match[1];
    const position = match.index;
    const lineNumber = content.substring(0, position).split('\n').length;
    const surroundingCode = content.substring(Math.max(0, match.index - 30), match.index + 50);

    if (!surroundingCode.includes('buildUrl')) {
      const codeLine = lines[lineNumber - 1]?.trim() || '';
      
      issues.push({
        page,
        problem: `Lien interpolé hardcodé trouvé sans buildUrl(): ${url}`,
        lineNumber,
        code: codeLine.substring(0, 80)
      });
    }
  }
}

if (issues.length > 0) {
  console.error(`❌ ${issues.length} problème(s) détecté(s) dans les fichiers sources:\n`);

  // Grouper par page
  const issuesByPage = new Map<string, Issue[]>();
  for (const issue of issues) {
    if (!issuesByPage.has(issue.page)) {
      issuesByPage.set(issue.page, []);
    }
    issuesByPage.get(issue.page)!.push(issue);
  }

  for (const [page, pageIssues] of issuesByPage.entries()) {
    console.error(`\n📄 ${page} (${pageIssues.length} problème(s)):`);
    for (const issue of pageIssues) {
      if (issue.lineNumber) {
        console.error(`   ⚠️  Ligne ${issue.lineNumber}: ${issue.problem}`);
        if (issue.code) {
          console.error(`   📝 ${issue.code}...`);
        }
      } else {
        console.error(`   ⚠️  ${issue.problem}`);
      }
    }
  }

  console.error('\n\n🔧 Solution:');
  console.error('  1. Importer buildUrl: import { buildUrl } from \'@/utils/url\';');
  console.error('  2. Wrapper les liens internes:');
  console.error('     - Pour <a>: href={buildUrl(\'/fr/library/primitives\')}');
  console.error('     - Pour template: href={buildUrl(`/en/library/primitives/${slug}`)}\n');

  process.exit(1);
} else {
  console.log('✅ Toutes les pages critiques utilisent buildUrl() correctement.\n');
  process.exit(0);
}
