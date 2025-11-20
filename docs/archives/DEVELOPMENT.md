# Development Workflow Guide

This document describes the development workflow and tooling setup for the Astro multilingual website project.

## Available Scripts

### Development
- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
- `pnpm preview` - Preview the production build locally

### Code Quality
- `pnpm lint` - Run ESLint to check code quality
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking

### Testing
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:watch` - Run unit tests in watch mode
- `pnpm test:ui` - Run unit tests with UI
- `pnpm test:coverage` - Run unit tests with coverage report
- `pnpm test:e2e` - Run E2E tests with Playwright
- `pnpm test:e2e:ui` - Run E2E tests with Playwright UI
- `pnpm test:e2e:debug` - Debug E2E tests with Playwright

### Quality Checks
- `pnpm check-links` - Verify all internal links are valid
- `pnpm lighthouse` - Run Lighthouse CI audits
- `pnpm a11y-audit` - Run accessibility audit
- `pnpm test:keyboard` - Test keyboard navigation

## Tooling Setup

### ESLint
ESLint is configured with:
- TypeScript support via `typescript-eslint`
- Astro plugin for `.astro` files
- JSX accessibility plugin for a11y checks

Configuration: `eslint.config.js`

### Prettier
Prettier is configured with:
- Astro plugin for `.astro` file formatting
- Consistent code style across the project

Configuration: `.prettierrc`

### TypeScript
TypeScript is configured in strict mode with:
- All strict checks enabled
- No implicit any
- Unused locals and parameters detection

Configuration: `tsconfig.json`

### Vitest
Vitest is configured for unit testing with:
- Happy DOM environment for DOM testing
- Coverage reporting with v8
- Test files: `src/**/*.{test,spec}.{js,ts}`

Configuration: `vitest.config.ts`

Example test: `src/utils/date-formatter.test.ts`

### Playwright
Playwright is configured for E2E testing with:
- Multiple browser support (Chromium, Firefox, WebKit)
- Mobile viewport testing
- Automatic dev server startup

Configuration: `playwright.config.ts`

Example test: `tests/e2e/navigation.spec.ts`

### Lighthouse CI
Lighthouse CI is configured to ensure:
- Performance score > 95
- Accessibility score > 95
- Best Practices score > 95
- SEO score > 95

Configuration: `lighthouserc.json`

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

### Quality Job
1. Install dependencies
2. Run linter
3. Run type check
4. Run unit tests
5. Build project
6. Check internal links
7. Run Lighthouse CI
8. Upload build artifacts

### E2E Job
1. Install dependencies
2. Install Playwright browsers
3. Build project
4. Run E2E tests
5. Upload test reports

Configuration: `.github/workflows/ci.yml`

## Pre-commit Checklist

Before committing code, ensure:
1. ✅ Code is formatted: `pnpm format`
2. ✅ No linting errors: `pnpm lint`
3. ✅ No type errors: `pnpm typecheck`
4. ✅ All tests pass: `pnpm test`
5. ✅ Build succeeds: `pnpm build`

## Deployment

The project generates static files in the `dist/` directory that can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- Any static hosting service

To verify deployment readiness:
1. Run `pnpm build`
2. Run `pnpm preview` to test the build locally
3. Run `pnpm check-links` to verify all links work
4. Run `pnpm lighthouse` to verify performance scores

## Troubleshooting

### Build Errors
- Check TypeScript errors: `pnpm typecheck`
- Check for syntax errors: `pnpm lint`
- Clear cache: Delete `.astro/` and `node_modules/.vite/`

### Test Failures
- Run tests in watch mode: `pnpm test:watch`
- Debug E2E tests: `pnpm test:e2e:debug`
- Check test coverage: `pnpm test:coverage`

### Link Checker Failures
- Ensure all pages are built: `pnpm build`
- Check for broken links in the output
- Update ignored patterns in `scripts/check-links.ts` if needed
