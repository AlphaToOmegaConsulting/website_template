# OG Default Image Placeholder

This is a placeholder file. Replace this with an actual `og-default.jpg` image file (1200x630px recommended).

## How to create og-default.jpg

### Option 1: Use Figma/Canva
1. Create a 1200x630px canvas
2. Add your brand logo and tagline
3. Use brand colors from `src/styles/tokens.css`
4. Export as JPG (high quality)
5. Save as `public/og-default.jpg`

### Option 2: Use an online generator
- https://www.opengraph.xyz/
- https://www.bannerbear.com/tools/og-image-generator/
- https://og-playground.vercel.app/

### Option 3: Use a screenshot
1. Take a screenshot of your homepage
2. Crop to 1200x630px
3. Add branding overlay
4. Save as `public/og-default.jpg`

## Specifications
- **Size**: 1200x630px (Facebook/LinkedIn standard)
- **Format**: JPG or PNG
- **Max file size**: < 1MB
- **Aspect ratio**: 1.91:1

## Used in
- `src/layouts/BaseLayout.astro` (line ~60)
- Social media previews (Facebook, Twitter, LinkedIn)
- Link sharing previews
