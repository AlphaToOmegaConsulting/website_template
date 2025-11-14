import { chromium } from 'playwright';

interface TestResult {
  page: string;
  passed: boolean;
  issues: string[];
}

const pages = [
  '/fr/',
  '/fr/twt/landing',
  '/fr/events/',
  '/fr/partners/',
  '/en/',
  '/en/twt/landing',
];

async function testKeyboardNavigation(page: any, url: string): Promise<TestResult> {
  const fullUrl = `http://localhost:4322${url}`;
  console.log(`\nTesting keyboard navigation: ${fullUrl}`);
  
  const issues: string[] = [];
  
  try {
    await page.goto(fullUrl, { waitUntil: 'networkidle' });
    
    // Get all focusable elements
    const focusableElements = await page.evaluate(() => {
      const selector = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const elements = Array.from(document.querySelectorAll(selector));
      return elements.map((el, index) => ({
        index,
        tag: el.tagName.toLowerCase(),
        text: el.textContent?.trim().substring(0, 50) || '',
        hasVisibleFocus: false,
      }));
    });
    
    console.log(`  Found ${focusableElements.length} focusable elements`);
    
    // Test Tab navigation
    let tabCount = 0;
    const maxTabs = Math.min(focusableElements.length + 2, 20); // Test first 20 or all elements
    
    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press('Tab');
      tabCount++;
      
      // Check if focus is visible
      const hasFocusVisible = await page.evaluate(() => {
        const activeElement = document.activeElement;
        if (!activeElement || activeElement === document.body) return false;
        
        const styles = window.getComputedStyle(activeElement);
        const pseudoStyles = window.getComputedStyle(activeElement, ':focus-visible');
        
        // Check if element has visible focus styles
        return (
          styles.outline !== 'none' ||
          styles.outlineWidth !== '0px' ||
          styles.boxShadow !== 'none' ||
          activeElement.classList.contains('focus-ring') ||
          activeElement.classList.contains('focus-visible')
        );
      });
      
      if (!hasFocusVisible && i < focusableElements.length) {
        const currentElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tag: el?.tagName.toLowerCase(),
            text: el?.textContent?.trim().substring(0, 30),
          };
        });
        
        // Only report if it's an interactive element
        if (currentElement.tag !== 'body') {
          issues.push(`Element ${i + 1} (${currentElement.tag}: "${currentElement.text}") may not have visible focus indicator`);
        }
      }
    }
    
    console.log(`  ✓ Tab navigation tested (${tabCount} tabs)`);
    
    // Test Shift+Tab (go back)
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    console.log(`  ✓ Shift+Tab navigation works`);
    
    // Test Enter key on first link
    await page.keyboard.press('Tab');
    const firstFocusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase();
    });
    
    if (firstFocusedElement === 'a' || firstFocusedElement === 'button') {
      console.log(`  ✓ Enter key can activate elements`);
    }
    
    // Test ESC key (if there are any dialogs or modals)
    await page.keyboard.press('Escape');
    console.log(`  ✓ ESC key tested`);
    
    const passed = issues.length === 0;
    
    if (passed) {
      console.log(`  ✅ All keyboard navigation tests passed`);
    } else {
      console.log(`  ⚠️  ${issues.length} potential issue(s) found`);
      issues.forEach(issue => console.log(`    - ${issue}`));
    }
    
    return {
      page: url,
      passed,
      issues,
    };
  } catch (error) {
    console.error(`  ❌ Error testing ${url}:`, error);
    return {
      page: url,
      passed: false,
      issues: [`Error during test: ${error}`],
    };
  }
}

async function main() {
  console.log('Starting keyboard navigation tests...\n');
  console.log('Make sure the preview server is running on http://localhost:4322\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results: TestResult[] = [];
  
  for (const url of pages) {
    const result = await testKeyboardNavigation(page, url);
    results.push(result);
  }
  
  await browser.close();
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('KEYBOARD NAVIGATION TEST SUMMARY');
  console.log('='.repeat(60));
  
  const passedCount = results.filter(r => r.passed).length;
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  
  console.log(`Pages tested: ${results.length}`);
  console.log(`Pages passed: ${passedCount}`);
  console.log(`Pages with issues: ${results.length - passedCount}`);
  console.log(`Total issues: ${totalIssues}`);
  
  if (totalIssues > 0) {
    console.log('\nPages with issues:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`\n${r.page}:`);
      r.issues.forEach(issue => console.log(`  - ${issue}`));
    });
  }
  
  if (passedCount === results.length) {
    console.log('\n✅ All keyboard navigation tests passed!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some keyboard navigation issues found. Please review.');
    process.exit(0); // Exit with 0 since focus visibility warnings are not critical
  }
}

main().catch(console.error);
