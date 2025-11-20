import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LinkCheck {
  file: string;
  link: string;
  exists: boolean;
}

// Get the dist directory path
const distDir = path.join(__dirname, '..', 'dist');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ Error: dist directory not found. Please run "pnpm build" first.');
  process.exit(1);
}

// Function to recursively get all HTML files
function getHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to extract internal links from HTML content
function extractInternalLinks(html: string): string[] {
  const links: string[] = [];
  
  // Match href attributes in anchor tags
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;

  while ((match = hrefRegex.exec(html)) !== null) {
    const link = match[1];
    
    // Only check internal links (starting with /)
    if (link.startsWith('/') && !link.startsWith('//')) {
      // Remove hash fragments
      const cleanLink = link.split('#')[0];
      if (cleanLink) {
        links.push(cleanLink);
      }
    }
  }

  return [...new Set(links)]; // Remove duplicates
}

/**
 * Check if a link should be ignored during validation
 * Ignores assets and external placeholder links that may not exist yet
 */
function shouldIgnoreLink(link: string): boolean {
  const ignorePatterns = [
    '/favicon.svg',
    '/assets/',
    '/_astro/',
    // Add other patterns here for links that are intentionally external
    // or placeholder links in the template
  ];

  return ignorePatterns.some(pattern => link.startsWith(pattern));
}

// Function to check if a link exists in the dist directory
function linkExists(link: string): boolean {
  // Remove leading slash
  const relativePath = link.startsWith('/') ? link.slice(1) : link;
  
  // Try different possible file paths
  const possiblePaths = [
    path.join(distDir, relativePath),
    path.join(distDir, relativePath, 'index.html'),
    path.join(distDir, relativePath + '.html'),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return true;
    }
  }

  return false;
}

// Main function
function checkLinks() {
  console.log('🔍 Checking internal links...\n');

  const htmlFiles = getHtmlFiles(distDir);
  console.log(`Found ${htmlFiles.length} HTML files\n`);

  const results: LinkCheck[] = [];
  let totalLinks = 0;
  let brokenLinks = 0;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf-8');
    const links = extractInternalLinks(html);
    
    for (const link of links) {
      // Skip ignored links
      if (shouldIgnoreLink(link)) {
        continue;
      }
      
      totalLinks++;
      const exists = linkExists(link);
      
      if (!exists) {
        brokenLinks++;
        results.push({
          file: path.relative(distDir, file),
          link,
          exists: false,
        });
      }
    }
  }

  // Print results
  if (brokenLinks === 0) {
    console.log('✅ All internal links are valid!');
    console.log(`   Checked ${totalLinks} links across ${htmlFiles.length} files\n`);
  } else {
    console.log(`❌ Found ${brokenLinks} broken link(s):\n`);
    
    for (const result of results) {
      console.log(`   File: ${result.file}`);
      console.log(`   Link: ${result.link}`);
      console.log('');
    }
    
    console.log(`   Total: ${brokenLinks} broken out of ${totalLinks} links\n`);
    process.exit(1);
  }
}

// Run the check
try {
  checkLinks();
} catch (error) {
  console.error('❌ Error checking links:', error);
  process.exit(1);
}
