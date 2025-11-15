import { describe, it, expect } from 'vitest';
import { readdirSync, statSync } from 'fs';
import { join, relative, parse } from 'path';

/**
 * Test de symétrie des pages FR ↔ EN
 * Vérifie que chaque page présente dans une langue a son équivalent dans l'autre langue
 */
describe('i18n pages structure symmetry', () => {
    const pagesDir = join(process.cwd(), 'src', 'pages');
    const frPagesDir = join(pagesDir, 'fr');
    const enPagesDir = join(pagesDir, 'en');

    /**
     * Récupère récursivement tous les fichiers .astro d'un dossier
     */
    function getAstroFiles(dir: string, baseDir: string = dir): string[] {
        const files: string[] = [];

        try {
            const entries = readdirSync(dir);

            for (const entry of entries) {
                const fullPath = join(dir, entry);
                const stat = statSync(fullPath);

                if (stat.isDirectory()) {
                    files.push(...getAstroFiles(fullPath, baseDir));
                } else if (entry.endsWith('.astro')) {
                    // Retourne le chemin relatif sans extension
                    const relativePath = relative(baseDir, fullPath);
                    const pathWithoutExt = relativePath.replace(/\.astro$/, '');
                    files.push(pathWithoutExt);
                }
            }
        } catch (error) {
            // Si le dossier n'existe pas, retourne un tableau vide
            return [];
        }

        return files;
    }

    it('should have FR and EN pages directories', () => {
        expect(statSync(frPagesDir).isDirectory()).toBe(true);
        expect(statSync(enPagesDir).isDirectory()).toBe(true);
    });

    it('should have matching pages in FR and EN', () => {
        const frPages = getAstroFiles(frPagesDir);
        const enPages = getAstroFiles(enPagesDir);

        // Vérifie que chaque page FR a son équivalent EN
        const missingInEn = frPages.filter(page => !enPages.includes(page));
        expect(
            missingInEn,
            `Pages manquantes en EN: ${missingInEn.join(', ')}`
        ).toHaveLength(0);

        // Vérifie que chaque page EN a son équivalent FR
        const missingInFr = enPages.filter(page => !frPages.includes(page));
        expect(
            missingInFr,
            `Pages manquantes en FR: ${missingInFr.join(', ')}`
        ).toHaveLength(0);
    });

    it('should have the same number of pages in both languages', () => {
        const frPages = getAstroFiles(frPagesDir);
        const enPages = getAstroFiles(enPagesDir);

        expect(frPages.length).toBe(enPages.length);
        expect(frPages.length).toBeGreaterThan(0); // Au moins une page existe
    });

    it('should have matching directory structure in FR and EN', () => {
        const frPages = getAstroFiles(frPagesDir);
        const enPages = getAstroFiles(enPagesDir);

        // Extrait les dossiers uniques de chaque langue
        const frDirs = new Set(
            frPages
                .map(page => parse(page).dir)
                .filter(dir => dir !== '')
        );
        const enDirs = new Set(
            enPages
                .map(page => parse(page).dir)
                .filter(dir => dir !== '')
        );

        const frDirsArray = Array.from(frDirs).sort();
        const enDirsArray = Array.from(enDirs).sort();

        expect(frDirsArray).toEqual(enDirsArray);
    });
});
