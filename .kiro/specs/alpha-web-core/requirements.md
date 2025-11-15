# Requirements Document - Alpha Web Core

## Introduction

Alpha Web Core est une transformation du template Astro multilingue existant en un système design-agnostic et theme-swappable. L'objectif est de neutraliser complètement le design actuel (couleurs cyan/purple/red, fonts Inter/Poppins, gradients hardcodés) et de créer une architecture permettant de changer l'apparence visuelle du site sans modifier les composants ou le contenu.

Le système doit séparer strictement la structure/logique du design visuel, permettant l'injection de thèmes via CSS variables et garantissant qu'aucune valeur stylistique ne soit couplée au code des composants ou aux content collections.

## Glossary

- **Alpha Web Core**: Le système de template design-agnostic résultant de cette transformation
- **Design Token**: Variable CSS réutilisable définissant une propriété visuelle (couleur, espacement, ombre, etc.)
- **Theme**: Ensemble cohérent de design tokens définissant l'apparence visuelle complète du site
- **Semantic Class**: Classe CSS utilitaire basée sur la fonction plutôt que l'apparence (ex: `.section-bg` au lieu de `.bg-white`)
- **Content Collection**: Système Astro de gestion de contenu structuré avec validation Zod
- **Discriminated Union**: Pattern TypeScript permettant de typer strictement différentes variantes d'un type
- **Section Registry**: Fichier centralisé définissant tous les types de sections disponibles et leurs schemas
- **Hardcoded Style**: Valeur de style directement écrite dans le code (ex: `bg-white`, `text-gray-900`)
- **Theme Swappability**: Capacité à changer l'apparence complète du site en changeant uniquement le fichier de thème CSS

## Requirements

### Requirement 1: Neutralisation complète du design existant

**User Story:** En tant que développeur, je veux supprimer tous les choix esthétiques du template actuel, afin que le système soit une base neutre prête à recevoir n'importe quel thème visuel.

#### Acceptance Criteria

1. WHEN THE Alpha Web Core SHALL render any component, THE Alpha Web Core SHALL NOT use any custom color values from the current palette (primary, secondary, accent)
2. WHEN THE Alpha Web Core SHALL display text content, THE Alpha Web Core SHALL use system-ui font stack instead of Inter or Poppins
3. WHEN THE Alpha Web Core SHALL render any visual element, THE Alpha Web Core SHALL NOT apply any gradient backgrounds defined in component code
4. WHEN THE Alpha Web Core SHALL style any element, THE Alpha Web Core SHALL NOT use direct Tailwind color classes (bg-white, text-gray-900, etc.)
5. WHEN THE Alpha Web Core SHALL render any component, THE Alpha Web Core SHALL NOT apply hardcoded shadow, border-radius, or border values

### Requirement 2: Système de design tokens minimal

**User Story:** En tant que développeur, je veux un petit ensemble de design tokens essentiels, afin de pouvoir personnaliser les couleurs et l'identité de marque sans complexité excessive.

#### Acceptance Criteria

1. THE Alpha Web Core SHALL define 5-10 essential CSS custom properties for brand colors and key visual properties
2. THE Alpha Web Core SHALL define primary brand color, secondary color, and accent color as CSS variables
3. THE Alpha Web Core SHALL define surface background and text colors as CSS variables
4. THE Alpha Web Core SHALL allow standard Tailwind utilities (rounded-lg, shadow-md, etc.) to be used directly in components
5. THE Alpha Web Core SHALL expose brand color tokens through Tailwind's theme.extend configuration
6. THE Alpha Web Core SHALL organize tokens in a simple file at `apps/website/src/styles/tokens.css`

### Requirement 3: Classes utilitaires sémantiques minimales

**User Story:** En tant que développeur, je veux quelques classes sémantiques pour les éléments de marque, tout en gardant la flexibilité d'utiliser Tailwind directement.

#### Acceptance Criteria

1. THE Alpha Web Core SHALL provide semantic classes for brand colors (`.text-brand-primary`, `.bg-brand-primary`, `.text-brand-secondary`)
2. THE Alpha Web Core SHALL allow direct use of Tailwind utilities for layout, spacing, shadows, and borders
3. THE Alpha Web Core SHALL keep semantic classes minimal (5-10 classes maximum)
4. THE Alpha Web Core SHALL define semantic classes using design tokens for brand colors only

### Requirement 4: Refactorisation des composants sections

**User Story:** En tant que développeur, je veux que tous les composants sections soient découplés du design, afin qu'ils puissent s'adapter automatiquement à n'importe quel thème.

#### Acceptance Criteria

1. WHEN THE Alpha Web Core SHALL render the Hero section, THE Hero component SHALL use only semantic classes and design tokens
2. WHEN THE Alpha Web Core SHALL render the Features section, THE Features component SHALL use only semantic classes and design tokens
3. WHEN THE Alpha Web Core SHALL render the CTA section, THE CTA component SHALL use only semantic classes and design tokens
4. WHEN THE Alpha Web Core SHALL render the Events section, THE Events component SHALL use only semantic classes and design tokens
5. WHEN THE Alpha Web Core SHALL render the About section, THE About component SHALL use only semantic classes and design tokens
6. WHEN THE Alpha Web Core SHALL render the Team section, THE Team component SHALL use only semantic classes and design tokens
7. WHEN a section component SHALL accept visual customization, THE component SHALL expose props for semantic variants (not specific colors or styles)
8. WHEN THE Alpha Web Core SHALL render the Header component, THE Header component SHALL use only semantic classes and design tokens
9. WHEN THE Alpha Web Core SHALL render the Footer component, THE Footer component SHALL use only semantic classes and design tokens

### Requirement 5: Schemas Zod stricts mais pragmatiques

**User Story:** En tant que développeur, je veux des schemas Zod stricts pour chaque type de section, afin de garantir la cohérence des données tout en restant simple et maintenable.

#### Acceptance Criteria

1. THE Alpha Web Core SHALL replace `data: z.record(z.any())` with strict individual schemas for each section type
2. THE Alpha Web Core SHALL define a dedicated Zod schema for each section type (Hero, Features, CTA, Events, About, Team)
3. THE Alpha Web Core SHALL use a discriminated union in content/config.ts for type safety
4. THE Alpha Web Core SHALL keep schemas simple and focused on content structure, not over-validated
5. THE Alpha Web Core SHALL allow semantic variant props (like 'emphasized', 'minimal') but prevent direct style values

### Requirement 6: Theming simple et pragmatique

**User Story:** En tant que développeur, je veux pouvoir changer les couleurs de marque facilement, afin de réutiliser le template pour différents clients ou projets.

#### Acceptance Criteria

1. THE Alpha Web Core SHALL allow theme switching by changing CSS variables or Tailwind config
2. THE Alpha Web Core SHALL provide a default neutral theme with grayscale colors
3. THE Alpha Web Core SHALL provide 2-3 example themes (neutral, brand example, dark mode optional)
4. WHEN a theme SHALL be changed, THE theme SHALL override brand color tokens only
5. THE Alpha Web Core SHALL keep theming simple: CSS variables or Tailwind theme extension, not a complex engine
6. THE Alpha Web Core SHALL ensure components work with any theme without modification

### Requirement 7: Nettoyage et simplification du projet

**User Story:** En tant que développeur, je veux un projet propre sans fichiers de test ou configurations inutiles, afin de faciliter la maintenance et la compréhension du système.

#### Acceptance Criteria

1. THE Alpha Web Core SHALL remove all test page files (`features-test.astro`, `section-layout-test.astro`, `content-test.astro`, `primitives-test.astro`)
2. THE Alpha Web Core SHALL remove Google Fonts imports from BaseLayout
3. THE Alpha Web Core SHALL simplify the Tailwind configuration to remove custom color palettes
4. THE Alpha Web Core SHALL update the README to document the theming system architecture
5. THE Alpha Web Core SHALL update the README to provide examples of creating custom themes

### Requirement 8: Validation simple de la swappabilité

**User Story:** En tant que développeur, je veux vérifier rapidement que le système de theming fonctionne, sans tests complexes.

#### Acceptance Criteria

1. THE Alpha Web Core SHALL provide one example brand theme with distinct colors
2. WHEN the theme SHALL be changed, THE developer SHALL manually verify the site displays correctly
3. THE Alpha Web Core SHALL document the theme switching process in the README with screenshots or examples

### Requirement 9: Configuration Tailwind pragmatique

**User Story:** En tant que développeur, je veux une configuration Tailwind simple qui expose les couleurs de marque via CSS variables.

#### Acceptance Criteria

1. THE Alpha Web Core SHALL expose brand colors in Tailwind config via CSS custom properties
2. THE Alpha Web Core SHALL remove the old custom color palettes (primary, secondary, accent with 50-950 shades)
3. THE Alpha Web Core SHALL keep standard Tailwind utilities available (colors, shadows, spacing, etc.)
4. THE Alpha Web Core SHALL use system fonts by default (system-ui stack)

### Requirement 10: Documentation du système

**User Story:** En tant que développeur utilisant Alpha Web Core, je veux une documentation claire du système de theming, afin de pouvoir créer et appliquer mes propres thèmes facilement.

#### Acceptance Criteria

1. THE Alpha Web Core SHALL provide documentation explaining the design token architecture
2. THE Alpha Web Core SHALL provide documentation listing all available semantic classes
3. THE Alpha Web Core SHALL provide documentation with step-by-step instructions for creating a new theme
4. THE Alpha Web Core SHALL provide documentation explaining how to switch between themes
5. THE Alpha Web Core SHALL provide documentation with examples of theme customization patterns
6. THE Alpha Web Core SHALL include inline code comments explaining the theming system in key files
