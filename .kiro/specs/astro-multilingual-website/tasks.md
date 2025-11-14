# Implementation Plan

- [x] 1. Setup monorepo structure with pnpm workspaces





  - Create root `package.json` with workspace configuration
  - Create `pnpm-workspace.yaml` defining `apps/*` and `packages/*` patterns
  - Create `apps/website` directory structure
  - Add root-level scripts for workspace commands (`dev`, `build`, `lint`, `format`)
  - Verify pnpm installation and workspace detection
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Bootstrap Astro application with TypeScript and Tailwind





  - [x] 2.1 Initialize Astro project in `apps/website`


    - Run `pnpm create astro@latest` with TypeScript strict mode
    - Configure `tsconfig.json` with strict settings
    - Set up basic project structure
    - _Requirements: 2.1, 2.2_
  

  - [x] 2.2 Integrate Tailwind CSS

    - Install and configure Tailwind CSS
    - Create `tailwind.config.mjs` with custom theme tokens (colors, spacing, fonts)
    - Create `src/styles/global.css` with Tailwind imports and design tokens
    - Configure Astro to use Tailwind integration
    - _Requirements: 2.2_
  

  - [x] 2.3 Create minimal homepage

    - Create `src/pages/index.astro` with basic content
    - Verify page renders correctly
    - _Requirements: 2.3_
  

  - [x] 2.4 Verify Lighthouse score

    - Run Lighthouse audit locally
    - Ensure score > 95 f

or Performance, Accessibility, Best Practices, SEO


    - _Requirements: 2.4_

- [x] 3. Implement design system primitives

  - [x] 3.1 Create Button component
    - Implement `src/components/primitives/Button.astro` with variants (primary, secondary, ghost)


    - Add size options (sm, md, lg)
    - Implement disabled state with `aria-disabled`
    - Add focus-visible styles with Tailwind ring
    - Ensure keyboard navigation works correctly



    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 3.2 Create Card component
    - Implement `src/components/primitives/Card.astro` with variants (default, bordered, elevated)
    - Add padding options (none, sm, md, lg)
    - Make component responsive by default
    - _Requirements: 3.1, 3.2_
  
  - [x] 3.3 Create Input component
    - Implement `src/components/primitives/Input.astro` with type support (text, email, password, number)
    - Add label, placeholder, required, disabled props
    - Implement error state with `aria-invalid` and `aria-describedby`
    - Add focus-visible styles
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [x] 3.4 Create Dialog component (Radix-inspired)


    - Copy and adapt Dialog code from shadcn/ui patterns
    - Implement using native HTML dialog element
    - Add focus trap and ESC key handling
    - Implement `aria-labelledby` and `aria-describedby`
    - Ensure no runtime Radix dependency
    - _Requirements: 3.5, 3.6_
  
  - [x] 3.5 Verify accessibility compliance



    - Test keyboard navigation (Tab, Shift+Tab, Enter, Space, ESC)
    - Verify ARIA roles and attributes
    - Check focus order is logical
    - _Requirements: 3.4, 3.5_

- [x] 4. Setup Content Collections with Zod validation





  - [x] 4.1 Create content configuration


    - Create `src/content/config.ts` with Zod schemas
    - Define `pages` collection schema (title, description, lang, dates, SEO)
    - Define `sections` collection schema (type, order, visible, data)
    - Define `events` collection schema (title, date, location, description, lang, tags)
    - Export collections object
    - _Requirements: 4.1, 4.2, 4.5_
  

  - [x] 4.2 Create content directories

    - Create `src/content/pages/` directory structure
    - Create `src/content/sections/` directory structure
    - Create `src/content/events/` directory structure
    - _Requirements: 4.1, 4.2_
  
  - [x] 4.3 Add sample content files



    - Create sample page content in `src/content/pages/`
    - Create sample section data in `src/content/sections/`
    - Create sample event content in `src/content/events/`
    - _Requirements: 4.2_
  
  - [x] 4.4 Verify build-time validation


    - Test that build fails with invalid frontmatter
    - Verify TypeScript autoco
mpletion works with `getCollection()`
    - _Requirements: 4.3, 4.4_




- [x] 5. Create layout components



  - [x] 5.1 Implement BaseLayout





    - Create `src/layouts/BaseLayout.astro` with HTML structure
    - Add meta tags (title, description, OG, Twitter)
    - Implement hreflang links for i18n
    - Create Header component with navigation
    - Create Footer component
    - Add global scripts placeholder
    - _Requirements: 5.1, 5.3, 5.4_


  -

  - [x] 5.2 Implement SectionLayout




    - Create `src/layouts/SectionLayout.astro` with container logic
    - Add width options (narrow, default, wide, full)
    - Add spacing options (none, sm, md, lg, xl)
    - Add background customization support
    - Make layout responsive
    - _Requirements: 5.2, 5.3_
-

- [x] 6. Build section components library




  - [x] 6.1 Create Hero section


    - Implement `src/components/sections/Hero.astro`
    - Add props for title, subtitle, CTA, image, background
    - Make section responsive
    - Use primitives (Button) for CTAs
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  


  - [x] 6.2 Create About section

    - Implement `src/components/sections/About.astro`
    - Add props for title, content (Markdown support), image, stats
    - Support image positioning (left/right)
    - Make section responsive


    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  

  - [x] 6.3 Create Features section





    - Implement `src/components/sections/Features.astro`
    - Add props for title, subtitle, features array, layout, columns


    - Support grid and list layouts
    - Make section responsive with configurable columns
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  
  - [x] 6.4 Create Events section





    - Implement `src/components/sections/Events.astro`


    - Add props for title, events array, displayMode, limit
    - Support filtering (upcoming, past, all)
    - Integrate with events Content Collection
    - Use Card primitive for event display

    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  -

  - [x] 6.5 Create CTA section




    - Implement `src/components/sections/CTA.astro`
    - Add props for title, description, primary/secondary CTAs, background
    - Use Button primitive for CTAs
    - Make section responsive
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
-

- [x] 7. Create canonical landing page (French)



  - [x] 7.1 Setup French page structure


    - Create `src/pages/fr/twt/landing.astro`
    - Import BaseLayout and all section components
    - _Requirements: 7.1, 7.5_
  
  - [x] 7.2 Add real content from collections


    - Fetch content from Content Collections using `getCollection()`
    - Create content files for landing page sections
    - Pass real data to section components
    - _Requirements: 7.2_
  
  - [x] 7.3 Compose page with sections


    - Assemble page using Hero, About, Features, Events, and CTA sections
    - Ensure proper section ordering
    - Remove all TODO comments and placeholders
    - _Requirements: 7.4, 7.5_
  

  - [x] 7.4 Verify responsive design

    - Test page on mobile, tablet, and desktop breakpoints
    - Ensure all sections are responsive
    - _Requirements: 7.3_

- [x] 8. Implement multi-page navigation






  - [x] 8.1 Create additional pages


    - Create `src/pages/fr/events/index.astro` (Events listing page)
    - Create `src/pages/fr/partners/index.astro` (Partners page)
    - Create `src/pages/fr/index.astro` (French homepage)
    - _Requirements: 8.1, 8.5_
  
  - [x] 8.2 Implement navigation component


    - Create `src/components/Navigation.astro` with links to all pages
    - Add active state indication based on current URL
    - Make navigation responsive (mobile menu)
    - Integrate navigation into Header (in BaseLayout)
    - _Requirements: 8.2_
  
  - [x] 8.3 Configure sitemap generation


    - Install and configure `@astrojs/sitemap` integration
    - Set site URL in `astro.config.mjs`
    - Verify sitemap.xml is generated
    - _Requirements: 8.3_
  
  - [x] 8.4 Verify internal links


    - Create script to check all internal links
    - Ensure no broken links exist
    - _Requirements: 8.4_

-

- [x] 9. Setup data collections




  - [x] 9.1 Create data collection schemas


    - Add `authors` data collection schema in `src/content/config.ts`
    - Add `domains` data collection schema (if needed)
    - Add `tags` data collection schema (if needed)
    - _Requirements: 9.1, 9.2_
  
  - [x] 9.2 Create data files


    - Create `src/content/data/authors.json` with sample data
    - Create other data files as needed
    - _Requirements: 9.1_
  
  - [x] 9.3 Use data collections in sections


    - Import and use data collections in relevant sections
    - Ensure TypeScript types are correctly inferred
    - _Requirements: 9.3, 9.4_

-

- [x] 10. Implement internationalization




  - [x] 10.1 Duplicate page structure for English


    - Create `src/pages/en/index.astro`
    - Create `src/pages/en/twt/landing.astro`
    - Create `src/pages/en/events/index.astro`
    - Create `src/pages/en/partners/index.astro`
    - _Requirements: 10.1, 10.2, 10.5_
  
  - [x] 10.2 Create English content


    - Create English content files in `src/content/pages/en/`
    - Create English event files in `src/content/events/en/`
    - Duplicate and translate all necessary content
    - _Requirements: 10.2_
  
  - [x] 10.3 Implement hreflang in BaseLayout


    - Add hreflang link tags in BaseLayout head
    - Pass alternateUrls prop to BaseLayout from pages
    - Add x-default hreflang
    - _Requirements: 10.3_
  
  - [x] 10.4 Create language switcher


    - Create `src/components/LanguageSwitcher.astro`
    - Add language switcher to Header
    - Link to alternate language versions of current page
    - _Requirements: 10.5_
  
  - [x] 10.5 Create 404 pages per language


    - Create `src/pages/fr/404.astro`
    - Create `src/pages/en/404.astro`
    - _Requirements: 10.4_
-

- [x] 11. Accessibility audit and fixes




  - [x] 11.1 Run axe DevTools audit


    - Install axe DevTools browser extension
    - Run audit on all pages
    - Document any issues found
    - _Requirements: 11.4_
  
  - [x] 11.2 Fix accessibility issues


    - Fix any critical or serious issues found
    - Verify focus order on all pages
    - Check color contrast ratios meet WCAG AA
    - Ensure all interactive elements have proper ARIA roles
    - _Requirements: 11.1, 11.2, 11.3, 11.5_
  
  - [x] 11.3 Verify keyboard navigation


    - Test full keyboard navigation on all pages
    - Ensure Tab, Shift+Tab, Enter, Space, ESC work correctly
    - Verify focus is visible at all times
    - _Requirements: 11.1_

- [x] 12. Development workflow and industrialization




  - [x] 12.1 Setup linting and formatting


    - Install and configure ESLint with Astro plugin
    - Install and configure Prettier
    - Add `lint` and `format` scripts to package.json
    - Create `.eslintrc.cjs` and `.prettierrc` config files
    - _Requirements: 12.1_
  
  - [x] 12.2 Configure TypeScript checking


    - Add `typecheck` script to package.json
    - Ensure strict mode is enabled
    - _Requirements: 12.1_
  
  - [x] 12.3 Setup Vitest for unit tests


    - Install Vitest and testing utilities
    - Create `vitest.config.ts`
    - Add `test` script to package.json
    - Create sample test for utility functions
    - _Requirements: 12.1, 12.5_
  
  - [x] 12.4 Setup Playwright for E2E tests


    - Install Playwright
    - Create `playwright.config.ts`
    - Add `test:e2e` script to package.json
    - Create sample E2E test for navigation
    - _Requirements: 12.1, 12.5_
  
  - [x] 12.5 Create link checker script


    - Create `scripts/check-links.ts` to verify internal links
    - Add script to CI workflow
    - _Requirements: 12.3_
  
  - [x] 12.6 Setup CI pipeline


    - Create `.github/workflows/ci.yml` (or equivalent for your CI)
    - Add steps for: install, lint, typecheck, test, build, check-links
    - Configure to run on push and pull requests
    - _Requirements: 12.2, 12.3_
  up Lighthouse CI
    - Install Lighthouse CI
    - Create `lighthouserc.json` config
    - Add Lighthouse CI step to pipeline
    - Configure assertions for scores > 95
    - _Requirements: 12.4_ for scores > 95
    - _Requirements: 12.4_
  
  - [x] 12.8 Verify deployment readiness


    - Run full build locally
    - Verify all static artifacts are generated correctly
    - Test preview build
    - _Requirements: 12.4_
