# Multi-Brand Guide

This guide explains how to use this template to create multiple branded websites by duplicating the project and modifying a single file.

## Philosophy

This template is designed for **duplication-based multi-branding**, not runtime theme switching.

**Approach**: Copy project → Edit 1 file → Build → Deploy

**Benefits**:
- Simple and predictable
- No runtime complexity
- Each brand is independent
- Easy to understand and maintain
- Perfect for static sites

## Quick Start (5 minutes)

### Step 1: Duplicate the project

```bash
# Copy the entire project
cp -r web_template/ my-new-brand/
cd my-new-brand/
```

### Step 2: Edit tokens.css

Open `src/styles/tokens.css` and change the brand colors:

```css
:root {
  /* BRAND COLORS - CHANGE THESE */
  --brand-primary: #1e40af;        /* New primary color */
  --brand-primary-hover: #1e3a8a;  /* Darker shade */
  --brand-secondary: #64748b;      /* Keep or change */
  --brand-accent: #10b981;         /* New accent color */
  --brand-accent-hover: #059669;   /* Darker shade */

  /* NEUTRAL COLORS - Usually keep these */
  --color-text: #1a1a1a;
  --color-text-muted: #64748b;
  --color-bg: #ffffff;
  --color-bg-alt: #f8fafc;

  /* VISUAL EFFECTS - Usually keep these */
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --radius: 0.5rem;
}
```

### Step 3: Update configuration files

#### Update `package.json`:
```json
{
  "name": "my-new-brand",
  "version": "1.0.0",
  // ...
}
```

#### Update `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://mynewbrand.com',
  // ...
});
```

### Step 4: Build and test

```bash
# Install dependencies (if not already done)
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

### Step 5: Deploy

Deploy the `dist/` folder to your hosting provider.

**Done!** You now have a fully branded website.

---

## Detailed Customization

### Token Reference

#### Brand Primary
Used for: Main text, headings, primary elements

```css
--brand-primary: #334155;        /* Main brand color */
--brand-primary-hover: #1e293b;  /* Hover state (darker) */
```

**Where it's used**:
- H1, H2 headings
- Important text
- 404 page numbers
- Language switcher hover

#### Brand Accent
Used for: CTAs, links, interactive elements

```css
--brand-accent: #3b82f6;         /* Accent/CTA color */
--brand-accent-hover: #2563eb;   /* Hover state (darker) */
```

**Where it's used**:
- Primary buttons
- Call-to-action buttons
- Links
- Focus rings
- Featured badges

#### Brand Secondary
Used for: Secondary elements, subtle branding

```css
--brand-secondary: #64748b;      /* Secondary brand color */
```

**Where it's used**:
- Secondary buttons
- Subtle text
- Less important elements

### Color Choosing Guidelines

#### 1. Choose your primary color
This is your main brand color. It should be:
- Readable (good contrast with white/light backgrounds)
- Not too bright or saturated
- Representative of your brand

**Examples**:
- Corporate: `#1e40af` (blue)
- Tech: `#6366f1` (indigo)
- Eco: `#059669` (green)
- Creative: `#9333ea` (purple)

#### 2. Calculate hover states
Hover states should be 10-20% darker:

```css
/* Primary: #3b82f6 (blue-500) */
/* Hover: #2563eb (blue-600) - one shade darker */
```

Use tools like:
- https://tailwindcss.com/docs/customizing-colors
- https://www.tailwindshades.com/

#### 3. Choose your accent color
This should complement your primary color:
- **Analogous**: Similar hue (e.g., blue → teal)
- **Complementary**: Opposite hue (e.g., blue → orange)
- **Same hue**: Different saturation (e.g., dark blue → bright blue)

#### 4. Test contrast
Ensure WCAG AA compliance:
- Text on backgrounds: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio

Use: https://webaim.org/resources/contrastchecker/

### Advanced Customization

#### Changing Neutral Colors

If you need a dark mode or different neutral palette:

```css
/* Light mode (default) */
--color-text: #1a1a1a;
--color-text-muted: #64748b;
--color-bg: #ffffff;
--color-bg-alt: #f8fafc;

/* Dark mode example */
--color-text: #f8fafc;
--color-text-muted: #94a3b8;
--color-bg: #0f172a;
--color-bg-alt: #1e293b;
```

**Note**: You'll need to test thoroughly as this affects the entire site.

#### Changing Visual Effects

##### Shadows
```css
/* Default (subtle) */
--shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/* Stronger shadow */
--shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* No shadow (flat design) */
--shadow: none;
```

##### Border Radius
```css
/* Default (rounded) */
--radius: 0.5rem;

/* More rounded */
--radius: 1rem;

/* Sharp corners */
--radius: 0;

/* Pill shape */
--radius: 9999px;
```

### Brand-Specific Content

Beyond `tokens.css`, you may want to customize:

#### 1. Favicon and OG Images
```
public/
├── favicon.svg          # Browser tab icon
├── og-default.jpg       # Social media preview image
└── apple-touch-icon.png # iOS home screen icon
```

#### 2. Site Metadata
Edit `src/layouts/BaseLayout.astro`:

```astro
<meta property="og:site_name" content="Your Brand Name" />
<meta name="twitter:site" content="@yourbrand" />
```

#### 3. Content Collections
Update content in `src/content/`:
- Events: `src/content/events/`
- Pages: `src/content/pages/`
- Sections: `src/content/sections/`

#### 4. Navigation & Footer
Edit:
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/Navigation.astro`

---

## Multi-Brand Workflow Examples

### Example 1: Agency Managing 3 Clients

```bash
# Project structure
projects/
├── client-a/          # Blue corporate brand
│   └── src/styles/tokens.css  (blue theme)
├── client-b/          # Green eco brand
│   └── src/styles/tokens.css  (green theme)
└── client-c/          # Purple creative brand
    └── src/styles/tokens.css  (purple theme)
```

**Workflow**:
1. Create feature in base template
2. Test thoroughly
3. Copy changes to all 3 client folders
4. Each client builds independently
5. Deploy to separate domains

### Example 2: Product with Multiple Sub-Brands

```bash
# Project structure
product-suite/
├── main-product/      # Primary brand (blue)
├── enterprise/        # Enterprise variant (dark blue)
└── education/         # Education variant (green)
```

**Workflow**:
1. Maintain shared component updates in main-product
2. Sync changes to other brands quarterly
3. Each brand has independent content
4. Deploy to subdomains: product.com, enterprise.product.com, edu.product.com

### Example 3: White-Label SaaS

```bash
# Project structure
white-label/
├── template/          # Base template (no deploy)
├── customer-1/        # Customer 1 brand
├── customer-2/        # Customer 2 brand
└── customer-3/        # Customer 3 brand
```

**Workflow**:
1. Develop features in `template/`
2. Script to copy updates to all customers
3. Each customer customizes:
   - `tokens.css`
   - Content collections
   - Logo/favicon
4. Independent builds and deployments

---

## Brand Color Presets

Copy-paste these presets into your `tokens.css`:

### Preset 1: Corporate Blue
```css
--brand-primary: #1e40af;
--brand-primary-hover: #1e3a8a;
--brand-secondary: #64748b;
--brand-accent: #0ea5e9;
--brand-accent-hover: #0284c7;
```

### Preset 2: Tech Purple
```css
--brand-primary: #6366f1;
--brand-primary-hover: #4f46e5;
--brand-secondary: #8b5cf6;
--brand-accent: #a78bfa;
--brand-accent-hover: #8b5cf6;
```

### Preset 3: Eco Green
```css
--brand-primary: #065f46;
--brand-primary-hover: #064e3b;
--brand-secondary: #059669;
--brand-accent: #10b981;
--brand-accent-hover: #059669;
```

### Preset 4: Creative Orange
```css
--brand-primary: #c2410c;
--brand-primary-hover: #9a3412;
--brand-secondary: #ea580c;
--brand-accent: #f97316;
--brand-accent-hover: #ea580c;
```

### Preset 5: Elegant Slate
```css
--brand-primary: #0f172a;
--brand-primary-hover: #020617;
--brand-secondary: #334155;
--brand-accent: #64748b;
--brand-accent-hover: #475569;
```

### Preset 6: Modern Pink
```css
--brand-primary: #be185d;
--brand-primary-hover: #9f1239;
--brand-secondary: #db2777;
--brand-accent: #ec4899;
--brand-accent-hover: #db2777;
```

---

## Testing Your Brand

### Visual Testing Checklist

After changing `tokens.css`, test these pages:

- [ ] Home page (`/en/` and `/fr/`)
- [ ] 404 page (`/en/404` and `/fr/404`)
- [ ] Events page (`/en/events` and `/fr/events`)
- [ ] Partners page (`/en/partners` and `/fr/partners`)
- [ ] TWT Landing page (`/en/twt/landing` and `/fr/twt/landing`)

### Elements to Check

- [ ] H1 headings use brand-primary
- [ ] Primary buttons use brand-accent
- [ ] Secondary buttons use brand-secondary or border
- [ ] Links use brand-accent
- [ ] Hover states work correctly
- [ ] Focus rings are visible
- [ ] Cards and shadows render correctly
- [ ] Language switcher hover uses brand-primary

### Automated Tests

```bash
# Run all tests
pnpm test           # Unit tests
pnpm test:e2e       # E2E tests
pnpm lighthouse     # Performance audit
pnpm a11y-audit     # Accessibility audit
```

### Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if possible)
- Mobile Safari (iOS)
- Mobile Chrome (Android)

---

## Troubleshooting

### Colors not applying

**Problem**: Changed `tokens.css` but colors don't update.

**Solutions**:
1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear Astro cache: `rm -rf .astro/ && pnpm dev`
3. Check browser DevTools → Elements → Computed to see if CSS variables are applied

### Build fails after duplication

**Problem**: Build command fails in new brand folder.

**Solutions**:
1. Delete `node_modules/` and reinstall: `rm -rf node_modules && pnpm install`
2. Delete `.astro/` cache: `rm -rf .astro/`
3. Check `package.json` name is unique

### Contrast issues

**Problem**: Text not readable on backgrounds.

**Solutions**:
1. Use contrast checker: https://webaim.org/resources/contrastchecker/
2. Darken text colors or lighten backgrounds
3. Consider using `--color-text` instead of brand colors for body text

### Git conflicts when syncing changes

**Problem**: Updating multiple brand repos causes conflicts.

**Solutions**:
1. Keep brands in separate repos
2. Use Git submodules or subtree for shared components
3. Script updates to automate syncing
4. Document which files are brand-specific vs. shared

---

## Best Practices

### DO ✅

- Keep `tokens.css` as the ONLY brand-specific styling file
- Use version control (Git) for each brand
- Document custom changes in a `CUSTOMIZATIONS.md` file
- Test thoroughly after token changes
- Use CI/CD for automated deployments
- Keep brands in sync for security updates

### DON'T ❌

- Don't create additional CSS files for brand styling
- Don't hardcode colors in components
- Don't modify Tailwind config for brand colors (use tokens instead)
- Don't share databases between brands (keep data separate)
- Don't ignore accessibility (test contrast)
- Don't forget to update `package.json` and `astro.config.mjs`

---

## Support & Resources

### Tools
- **Color Picker**: https://www.tailwindshades.com/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Palette Generator**: https://coolors.co/

### Documentation
- Astro Docs: https://docs.astro.build/
- Tailwind CSS: https://tailwindcss.com/docs
- CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

### Getting Help
- Open an issue on GitHub
- Check existing documentation
- Review example presets above

---

## Changelog Template

Track changes in each brand with a `CHANGELOG.md`:

```markdown
# Changelog - Brand Name

## [1.0.0] - 2024-01-15
### Changed
- Initial brand colors (blue theme)
- Updated logo and favicon
- Customized hero section content

## [1.0.1] - 2024-01-20
### Changed
- Adjusted primary color contrast
- Updated OG image

## [1.1.0] - 2024-02-01
### Added
- New Events page section
### Changed
- Synced with base template v1.1.0
```

---

**That's it!** You now have everything you need to create unlimited branded websites from this template.

For questions or issues, refer to the main [README.md](README.md) or open an issue on GitHub.
