import { describe, it, expect } from 'vitest';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join, relative, parse } from 'path';
import matter from 'gray-matter';

/**
 * Test de symétrie des contenus FR ↔ EN
 * Vérifie que chaque contenu présent dans une langue a son équivalent dans l'autre langue
 * et que le frontmatter minimal est présent
 */
describe('i18n content collections symmetry', () => {
    const contentDir = join(process.cwd(), 'src', 'content');

    /**
     * Récupère récursivement tous les fichiers markdown d'un dossier
     */
    function getMarkdownFiles(dir: string, baseDir: string = dir): string[] {
        const files: string[] = [];

        try {
            const entries = readdirSync(dir);

            for (const entry of entries) {
                const fullPath = join(dir, entry);
                const stat = statSync(fullPath);

                if (stat.isDirectory()) {
                    files.push(...getMarkdownFiles(fullPath, baseDir));
                } else if (entry.endsWith('.md')) {
                    const relativePath = relative(baseDir, fullPath);
                    files.push(relativePath);
                }
            }
        } catch {
            return [];
        }

        return files;
    }

    /**
     * Extrait le basename sans extension d'un chemin
     */
    function getBasename(path: string): string {
        return parse(path).name;
    }

    describe('events collection', () => {
        const eventsDir = join(contentDir, 'events');
        const frEventsDir = join(eventsDir, 'fr');
        const enEventsDir = join(eventsDir, 'en');

        it('should have FR and EN events directories', () => {
            expect(statSync(frEventsDir).isDirectory()).toBe(true);
            expect(statSync(enEventsDir).isDirectory()).toBe(true);
        });

        it('should have matching events in FR and EN', () => {
            const frEvents = getMarkdownFiles(frEventsDir);
            const enEvents = getMarkdownFiles(enEventsDir);

            const frEventNames = frEvents.map(getBasename).sort();
            const enEventNames = enEvents.map(getBasename).sort();

            // Vérifie que chaque événement FR a son équivalent EN
            const missingInEn = frEventNames.filter(
                name => !enEventNames.includes(name)
            );
            expect(
                missingInEn,
                `Événements manquants en EN: ${missingInEn.join(', ')}`
            ).toHaveLength(0);

            // Vérifie que chaque événement EN a son équivalent FR
            const missingInFr = enEventNames.filter(
                name => !frEventNames.includes(name)
            );
            expect(
                missingInFr,
                `Événements manquants en FR: ${missingInFr.join(', ')}`
            ).toHaveLength(0);
        });

        it('should have valid frontmatter in FR events', () => {
            const frEvents = getMarkdownFiles(frEventsDir);

            for (const eventFile of frEvents) {
                const fullPath = join(frEventsDir, eventFile);
                const content = readFileSync(fullPath, 'utf-8');
                const { data } = matter(content);

                // Vérifie les champs requis selon le schéma
                expect(data.title, `${eventFile}: title manquant`).toBeDefined();
                expect(data.date, `${eventFile}: date manquante`).toBeDefined();
                expect(
                    data.location,
                    `${eventFile}: location manquante`
                ).toBeDefined();
                expect(
                    data.description,
                    `${eventFile}: description manquante`
                ).toBeDefined();
                expect(data.lang, `${eventFile}: lang manquante`).toBe('fr');
            }
        });

        it('should have valid frontmatter in EN events', () => {
            const enEvents = getMarkdownFiles(enEventsDir);

            for (const eventFile of enEvents) {
                const fullPath = join(enEventsDir, eventFile);
                const content = readFileSync(fullPath, 'utf-8');
                const { data } = matter(content);

                // Vérifie les champs requis selon le schéma
                expect(data.title, `${eventFile}: title manquant`).toBeDefined();
                expect(data.date, `${eventFile}: date manquante`).toBeDefined();
                expect(
                    data.location,
                    `${eventFile}: location manquante`
                ).toBeDefined();
                expect(
                    data.description,
                    `${eventFile}: description manquante`
                ).toBeDefined();
                expect(data.lang, `${eventFile}: lang manquante`).toBe('en');
            }
        });
    });

    describe('pages collection', () => {
        const pagesDir = join(contentDir, 'pages');
        const frPagesDir = join(pagesDir, 'fr');
        const enPagesDir = join(pagesDir, 'en');

        it('should have FR and EN pages directories', () => {
            expect(statSync(frPagesDir).isDirectory()).toBe(true);
            expect(statSync(enPagesDir).isDirectory()).toBe(true);
        });

        it('should have matching pages in FR and EN', () => {
            const frPages = getMarkdownFiles(frPagesDir);
            const enPages = getMarkdownFiles(enPagesDir);

            const frPageNames = frPages.map(getBasename).sort();
            const enPageNames = enPages.map(getBasename).sort();

            // Vérifie la symétrie
            expect(frPageNames).toEqual(enPageNames);
        });

        it('should have valid frontmatter in FR pages', () => {
            const frPages = getMarkdownFiles(frPagesDir);

            for (const pageFile of frPages) {
                const fullPath = join(frPagesDir, pageFile);
                const content = readFileSync(fullPath, 'utf-8');
                const { data } = matter(content);

                // Vérifie les champs requis selon le schéma
                expect(data.title, `${pageFile}: title manquant`).toBeDefined();
                expect(
                    data.description,
                    `${pageFile}: description manquante`
                ).toBeDefined();
                expect(data.lang, `${pageFile}: lang manquante`).toBe('fr');
                expect(
                    data.publishDate,
                    `${pageFile}: publishDate manquante`
                ).toBeDefined();
            }
        });

        it('should have valid frontmatter in EN pages', () => {
            const enPages = getMarkdownFiles(enPagesDir);

            for (const pageFile of enPages) {
                const fullPath = join(enPagesDir, pageFile);
                const content = readFileSync(fullPath, 'utf-8');
                const { data } = matter(content);

                // Vérifie les champs requis selon le schéma
                expect(data.title, `${pageFile}: title manquant`).toBeDefined();
                expect(
                    data.description,
                    `${pageFile}: description manquante`
                ).toBeDefined();
                expect(data.lang, `${pageFile}: lang manquante`).toBe('en');
                expect(
                    data.publishDate,
                    `${pageFile}: publishDate manquante`
                ).toBeDefined();
            }
        });
    });

    describe('sections collection (JSON)', () => {
        const sectionsDir = join(contentDir, 'sections');

        it('should have sections directory', () => {
            expect(statSync(sectionsDir).isDirectory()).toBe(true);
        });

        it('should have valid JSON structure in sections', () => {
            const sectionFiles = readdirSync(sectionsDir).filter(
                file => file.endsWith('.json')
            );

            expect(sectionFiles.length).toBeGreaterThan(0);

            for (const sectionFile of sectionFiles) {
                const fullPath = join(sectionsDir, sectionFile);
                const content = readFileSync(fullPath, 'utf-8');

                // Vérifie que le JSON est valide
                expect(() => JSON.parse(content)).not.toThrow();

                const data = JSON.parse(content);

                // Vérifie les champs requis selon le schéma
                expect(
                    data.type,
                    `${sectionFile}: type manquant`
                ).toBeDefined();
                expect(
                    data.order,
                    `${sectionFile}: order manquant`
                ).toBeDefined();
                expect(
                    typeof data.order,
                    `${sectionFile}: order doit être un nombre`
                ).toBe('number');
                expect(
                    data.data,
                    `${sectionFile}: data manquant`
                ).toBeDefined();
            }
        });
    });
});
