# Implementation Plan - Alpha Web Core (Simplified & Pragmatic)

## ✅ Completed Tasks (Keep as-is)

- [x] 1. Setup design token system foundation
- [x] 1.1 Create token directory structure and base tokens file
- [x] 1.2 Create semantic utility classes
- [x] 2. Create theme system and neutral theme
- [x] 2.1 Create theme directory and neutral theme
- [x] 2.2 Update global.css to load token system
- [x] 3. Simplify Tailwind configuration
- [x] 3.1 Refactor tailwind.config.mjs
- [x] 4. Create content collection schemas with strict typing
- [x] 4.1 Create section registry and enum
- [x] 4.2 Create Hero section schema
- [x] 4.3 Create Features section schema
- [x] 4.4 Create CTA section schema
- [x] 4.5 Create Events section schema
- [x] 4.6 Create About section schema
- [x] 4.7 Create Team section schema
- [x] 4.8 Update content/config.ts with discriminated union
- [x] 5. Refactor Hero section component
- [x] 5.1 Replace hardcoded styles in Hero.astro
- [x] 6. Refactor Features section component
- [x] 6.1 Replace hardcoded styles in Features.astro
- [x] 7. Refactor CTA section component
- [x] 7.1 Replace hardcoded styles in CTA.astro

## 📝 Remaining Tasks (Simplified)

- [x] 8. Refactor remaining section components with pragmatic approach




  - Update Events, About, and Team components to use brand classes + standard Tailwind
  - Replace old `primary-600` colors with `brand-primary` classes
  - Keep standard Tailwind utilities (rounded-lg, shadow-md, p-4, etc.)
  - Use gray colors for neutral elements (text-gray-600, bg-gray-50)
  - _Requirements: 4.4, 4.5, 4.6_

- [x] 8.1 Refactor Events.astro


  - Replace `primary-*` colors with `brand-primary` or `brand-accent`
  - Use standard Tailwind for layout, spacing, shadows, borders
  - Keep component readable and AI-friendly
  - _Requirements: 4.4_

- [x] 8.2 Refactor About.astro


  - Replace `primary-*` colors with `brand-primary` or `brand-accent`
  - Use standard Tailwind for layout, spacing, shadows, borders
  - Keep component readable and AI-friendly
  - _Requirements: 4.5_

- [x] 8.3 Refactor Team.astro


  - Replace `primary-*` colors with `brand-primary` or `brand-accent`
  - Use standard Tailwind for layout, spacing, shadows, borders
  - Keep component readable and AI-friendly
  - _Requirements: 4.6_

- [ ] 9. Refactor Header and Footer components
  - Update Header and Footer to use brand classes for logo/links
  - Keep standard Tailwind for everything else
  - _Requirements: 4.8, 4.9_

- [ ] 9.1 Refactor Header.astro
  - Replace `text-primary-600` with `text-brand-primary`
  - Use standard gray colors for borders and backgrounds
  - Keep navigation logic intact
  - _Requirements: 4.8_

- [ ] 9.2 Refactor Footer.astro
  - Replace brand colors with `brand-primary` classes
  - Use standard Tailwind for layout and spacing
  - Keep footer structure intact
  - _Requirements: 4.9_
- [x] 10. Refactor primitive components (ButtonLink, etc.)




- [ ] 10. Refactor primitive components (ButtonLink, etc.)

  - Update ButtonLink to use brand colors for primary variant
  - Keep secondary/ghost variants using standard Tailwind
  - Update any other primitives (Card, Dialog) if they exist
  - _Requirements: 1.1, 1.2_

- [x] 10.1 Refactor ButtonLink.astro


  - Primary variant: use `bg-brand-accent` or `bg-brand-primary`
  - Secondary variant: use standard gray colors
  - Keep size variants and hover states
  - _Requirements: 1.1, 1.2_

- [x] 10.2 Refactor other primitives if needed


  - Check for Card, Dialog, or other primitive components
  - Update brand colors only, keep Tailwind utilities
  - Skip if no other primitives exist
  - _Requirements: 1.1, 1.2_
-

- [x] 11. Remove Google Fonts and use system fonts




  - Remove Google Fonts imports from BaseLayout
  - Verify system-ui font stack is working
  - _Requirements: 7.2, 1.2_

- [x] 11.1 Update BaseLayout.astro


  - Remove `<link rel="preconnect">` for Google Fonts
  - Remove Google Fonts stylesheet import
  - Verify fonts render correctly with system-ui
  - _Requirements: 7.2, 1.2_
-

- [x] 12. Migrate existing content files to new schemas




  - Update section JSON files to match strict schemas
  - Fix any Zod validation errors during build
  - _Requirements: 5.1, 5.9_

- [x] 12.1 Update features-home.json


  - Verify structure matches featuresDataSchema
  - Remove any invalid properties
  - Test with `pnpm build`
  - _Requirements: 5.3, 5.9_


- [x] 12.2 Update about-twt-landing.json

  - Verify structure matches aboutDataSchema
  - Remove any invalid properties
  - Test with `pnpm build`
  - _Requirements: 5.6, 5.9_



- [ ] 12.3 Update other section files
  - Check all other JSON files in `src/content/sections/`
  - Fix any schema validation errors
  - _Requirements: 5.1, 5.9_

- [x] 13. Create one example brand theme




  - Create a simple example theme to demonstrate brand color swapping
  - Keep it minimal: just override brand colors
  - _Requirements: 6.3, 8.1_

- [x] 13.1 Create theme-brand-example.css (optional)


  - Create `apps/website/src/styles/themes/theme-brand-example.css`
  - Override `--brand-primary`, `--brand-secondary`, `--brand-accent` with different colors
  - Document how to switch themes in comments
  - _Requirements: 6.3, 8.1_
-

- [x] 14. Clean up test pages



  - Remove test page files to keep project clean
  - Keep only real pages (home, about, events, etc.)
  - _Requirements: 7.1_

- [x] 14.1 Delete test pages


  - Delete `features-test.astro`, `section-layout-test.astro`, `content-test.astro`, `primitives-test.astro`
  - Keep only production pages

  - _Requirements: 7.1_

- [x] 15. Update documentation




  - Update README with simple theming guide
  - Document brand color system
  - Explain how to customize for new projects
  - _Requirements: 7.4, 7.5, 10.1, 10.2, 10.3_


- [x] 15.1 Update README.md

  - Add "Alpha Web Core" section explaining the system
  - Document the 5-10 brand color tokens
  - Explain how to change brand colors (CSS variables or Tailwind config)
  - Provide example of customizing for a new project
  - Keep it concise and practical
  - _Requirements: 7.4, 7.5, 10.1, 10.2, 10.3_



- [ ] 15.2 Add inline comments to key files
  - Add comments to `tokens.css` explaining brand variables
  - Add JSDoc to schema files
  - Add usage examples in component files
  - Keep comments helpful but minimal
  - _Requirements: 10.6_
-

- [x] 16. Final validation




  - Build the site and verify everything works
  - Manually test theme switching
  - Check that content validates against schemas
  - _Requirements: All_


- [x] 16.1 Build and test

  - Run `pnpm build` and fix any errors
  - Run `pnpm dev` and visually verify pages
  - Test changing brand colors in `tokens.css`
  - Verify all pages render correctly
  - _Requirements: All_



- [ ] 16.2 Manual theme test
  - Change `--brand-primary` to a different color (e.g., red)
  - Reload site and verify brand color appears throughout
  - Change back to original color
  - Document the process in README
  - _Requirements: 8.2, 8.3_

## 🚫 Removed Tasks (Over-engineered)

The following tasks from the original spec have been removed to keep the system pragmatic:

- ❌ Complex theme files (theme-light, theme-dark, theme-test) - Keep it simple with one example
- ❌ Automated tests for token validation - Build errors are sufficient
- ❌ Automated tests scanning for forbidden classes - Manual review is fine
- ❌ Visual regression testing - Manual testing is sufficient for small sites
- ❌ Component isolation tests - Trust the developer
- ❌ Extensive DEVELOPMENT.md updates - Keep docs minimal

## 📊 Summary

**Total tasks:** 16 main tasks (vs 20 in original)
**Completed:** 7 tasks (1-7)
**Remaining:** 9 tasks (8-16)
**Approach:** Pragmatic, AI-friendly, suitable for 20-50 page websites
**Philosophy:** Minimal tokens, standard Tailwind, strict schemas, simple theming
