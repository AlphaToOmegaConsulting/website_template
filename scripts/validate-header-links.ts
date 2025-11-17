/**
 * Script de validation des liens du header
 * Vérifie que tous les liens présents dans la navigation pointent vers des pages existantes
 *
 * Usage: pnpm tsx scripts/validate-header-links.ts
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = 'dist';

interface LinkIssue {
  page: string;
  link: string;
  issue: string;
}

function extractLinksFromHTML(html: string): string[] {
  const links: string[] = [];

  // Extraire les liens dans les éléments <nav> et <header>
  const navMatch = html.match(/<nav[\s\S]*?<\/nav>/gi) || [];
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/gi) || [];

  const sectionsToCheck = [...navMatch, ...headerMatch];

  for (const section of sectionsToCheck) {
    const hrefMatches = section.matchAll(/href=["']([^"']+)["']/gi);
    for (const match of hrefMatches) {
      const href = match[1];
      // Ignorer les liens externes et les ancres
      if (!href.startsWith('http') && !href.startsWith('#') && href !== '/') {
        links.push(href);
      }
    }
  }

  return Array.from(new Set(links));
}

function findHTMLFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const items = readdirSync(currentDir);

    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

function checkLinkExists(link: string): boolean {
  // Nettoyer le lien (enlever le leading slash)
  const cleanLink = link.startsWith('/') ? link.slice(1) : link;

  // Vérifier si le fichier HTML existe
  const possiblePaths = [
    join(DIST_DIR, cleanLink, 'index.html'),
    join(DIST_DIR, cleanLink + '.html'),
    join(DIST_DIR, cleanLink + '/index.html'),
  ];

  return possiblePaths.some(path => existsSync(path));
}

async function validateHeaderLinks(): Promise<void> {
  console.log('🔍 Validation des liens du header...\n');

  if (!existsSync(DIST_DIR)) {
    console.error(`❌ Le dossier ${DIST_DIR}/ n'existe pas. Veuillez d'abord builder le projet avec: pnpm build`);
    process.exit(1);
  }

  // Trouver tous les fichiers HTML
  const htmlFiles = findHTMLFiles(DIST_DIR);

  const issues: LinkIssue[] = [];
  const checkedLinks = new Map<string, Set<string>>();

  for (const htmlFile of htmlFiles) {
    const relativePath = htmlFile.replace(DIST_DIR + '/', '');
    const html = readFileSync(htmlFile, 'utf-8');
    const links = extractLinksFromHTML(html);

    for (const link of links) {
      // Éviter de vérifier le même lien plusieurs fois pour la même page
      if (!checkedLinks.has(relativePath)) {
        checkedLinks.set(relativePath, new Set());
      }

      if (checkedLinks.get(relativePath)!.has(link)) {
        continue;
      }

      checkedLinks.get(relativePath)!.add(link);

      if (!checkLinkExists(link)) {
        issues.push({
          page: relativePath,
          link,
          issue: 'Page cible introuvable'
        });
      }
    }
  }

  // Afficher les résultats
  if (issues.length === 0) {
    console.log('✅ Tous les liens du header sont valides!\n');
    return;
  }

  console.log(`❌ ${issues.length} lien(s) cassé(s) détecté(s) dans le header:\n`);

  // Grouper les issues par lien
  const issuesByLink = new Map<string, Set<string>>();
  for (const issue of issues) {
    if (!issuesByLink.has(issue.link)) {
      issuesByLink.set(issue.link, new Set());
    }
    issuesByLink.get(issue.link)!.add(issue.page);
  }

  for (const [link, pages] of issuesByLink.entries()) {
    console.log(`  🔗 ${link}`);
    console.log(`     Trouvé dans: ${Array.from(pages).slice(0, 3).join(', ')}${pages.size > 3 ? '...' : ''}`);
    console.log(`     ${pages.size} page(s) affectée(s)\n`);
  }

  process.exit(1);
}

validateHeaderLinks().catch((error) => {
  console.error('❌ Erreur:', error);
  process.exit(1);
});
