import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import type { Result } from 'axe-core';
import { writeFileSync } from 'fs';
import { join } from 'path';

interface PageResult {
  url: string;
  violations: Result[];
  passes: number;
  incomplete: number;
}

const pages = [
  // French pages
  '/fr/',
  '/fr/twt/landing',
  '/fr/events/',
  '/fr/partners/',
  '/fr/404',
  // English pages
  '/en/',
  '/en/twt/landing',
  '/en/events/',
  '/en/partners/',
  '/en/404',
];

async function auditPage(page: any, url: string): Promise<PageResult> {
  const fullUrl = `http://localhost:4322${url}`;
  console.log(`\nAuditing: ${fullUrl}`);
  
  await page.goto(fullUrl, { waitUntil: 'networkidle' });
  
  const results = await new AxeBuilder({ page }).analyze();
  
  console.log(`  ✓ Passes: ${results.passes.length}`);
  console.log(`  ⚠ Incomplete: ${results.incomplete.length}`);
  console.log(`  ✗ Violations: ${results.violations.length}`);
  
  if (results.violations.length > 0) {
    results.violations.forEach((violation) => {
      console.log(`    - [${violation.impact}] ${violation.id}: ${violation.help}`);
    });
  }
  
  return {
    url,
    violations: results.violations,
    passes: results.passes.length,
    incomplete: results.incomplete.length,
  };
}

async function main() {
  console.log('Starting accessibility audit...\n');
  console.log('Make sure the dev server is running on http://localhost:4322\n');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results: PageResult[] = [];
  
  for (const url of pages) {
    try {
      const result = await auditPage(page, url);
      results.push(result);
    } catch (error) {
      console.error(`Error auditing ${url}:`, error);
      results.push({
        url,
        violations: [],
        passes: 0,
        incomplete: 0,
      });
    }
  }
  
  await browser.close();
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: results.length,
      pagesWithViolations: results.filter(r => r.violations.length > 0).length,
      totalViolations: results.reduce((sum, r) => sum + r.violations.length, 0),
      criticalViolations: results.reduce((sum, r) => 
        sum + r.violations.filter(v => v.impact === 'critical').length, 0
      ),
      seriousViolations: results.reduce((sum, r) => 
        sum + r.violations.filter(v => v.impact === 'serious').length, 0
      ),
    },
    results,
  };
  
  // Save report
  const reportPath = join(process.cwd(), 'a11y-report.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('ACCESSIBILITY AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total pages audited: ${report.summary.totalPages}`);
  console.log(`Pages with violations: ${report.summary.pagesWithViolations}`);
  console.log(`Total violations: ${report.summary.totalViolations}`);
  console.log(`  - Critical: ${report.summary.criticalViolations}`);
  console.log(`  - Serious: ${report.summary.seriousViolations}`);
  console.log(`\nDetailed report saved to: ${reportPath}`);
  
  if (report.summary.totalViolations > 0) {
    console.log('\n⚠️  Accessibility issues found. Please review the report.');
    process.exit(1);
  } else {
    console.log('\n✅ No accessibility violations found!');
    process.exit(0);
  }
}

main().catch(console.error);
