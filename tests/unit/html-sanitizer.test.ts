import { describe, it, expect } from 'vitest';
import { sanitizeHtml, stripHtml, escapeHtml } from '../../src/utils/html-sanitizer';

describe('HTML Sanitizer', () => {
  describe('sanitizeHtml', () => {
    it('should allow safe HTML tags', () => {
      const input = '<p>Hello <strong>World</strong></p>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Hello <strong>World</strong></p>');
    });

    it('should remove script tags', () => {
      const input = '<p>Hello</p><script>alert("XSS")</script>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Hello</p>');
    });

    it('should remove style tags', () => {
      const input = '<p>Hello</p><style>body { display: none; }</style>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Hello</p>');
    });

    it('should remove event handlers', () => {
      const input = '<p onclick="alert(1)">Click me</p>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Click me</p>');
    });

    it('should remove dangerous protocols from links', () => {
      const input = '<a href="javascript:alert(1)">Click</a>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<a>Click</a>');
    });

    it('should allow safe attributes', () => {
      const input = '<a href="/page" title="Page">Link</a>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<a href="/page" title="Page">Link</a>');
    });

    it('should remove disallowed tags', () => {
      const input = '<p>Hello</p><iframe src="evil.com"></iframe>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Hello</p>');
    });

    it('should allow images with safe attributes', () => {
      const input = '<img src="/image.jpg" alt="Image" width="100">';
      const result = sanitizeHtml(input);
      expect(result).toBe('<img src="/image.jpg" alt="Image" width="100">');
    });

    it('should handle nested HTML', () => {
      const input = '<div><p>Hello <strong><em>World</em></strong></p></div>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<div><p>Hello <strong><em>World</em></strong></p></div>');
    });

    it('should handle empty input', () => {
      const result = sanitizeHtml('');
      expect(result).toBe('');
    });

    it('should remove javascript: from image src', () => {
      const input = '<img src="javascript:alert(1)" alt="Evil">';
      const result = sanitizeHtml(input);
      expect(result).toBe('<img alt="Evil">');
    });

    it('should allow custom allowed tags', () => {
      const input = '<p>Hello</p><custom>World</custom>';
      const result = sanitizeHtml(input, {
        allowedTags: ['p', 'custom'],
      });
      expect(result).toBe('<p>Hello</p><custom>World</custom>');
    });
  });

  describe('stripHtml', () => {
    it('should remove all HTML tags', () => {
      const input = '<p>Hello <strong>World</strong></p>';
      const result = stripHtml(input);
      expect(result).toBe('Hello World');
    });

    it('should decode HTML entities', () => {
      const input = 'Hello&nbsp;&amp;&nbsp;World';
      const result = stripHtml(input);
      expect(result).toBe('Hello & World');
    });

    it('should handle complex HTML', () => {
      const input = '<div><p>Hello</p><script>alert(1)</script><p>World</p></div>';
      const result = stripHtml(input);
      expect(result).toBe('Helloalert(1)World');
    });

    it('should handle empty input', () => {
      const result = stripHtml('');
      expect(result).toBe('');
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      const input = '<script>alert("XSS")</script>';
      const result = escapeHtml(input);
      expect(result).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
    });

    it('should escape ampersands', () => {
      const input = 'A & B';
      const result = escapeHtml(input);
      expect(result).toBe('A &amp; B');
    });

    it('should escape quotes', () => {
      const input = `Hello "World" and 'Universe'`;
      const result = escapeHtml(input);
      expect(result).toBe('Hello &quot;World&quot; and &#x27;Universe&#x27;');
    });

    it('should handle empty input', () => {
      const result = escapeHtml('');
      expect(result).toBe('');
    });

    it('should escape slashes', () => {
      const input = '</script>';
      const result = escapeHtml(input);
      expect(result).toBe('&lt;&#x2F;script&gt;');
    });
  });

  describe('Real-world scenarios', () => {
    it('should sanitize typical blog post content', () => {
      const input = `
        <h1>Blog Post Title</h1>
        <p>This is a <strong>blog post</strong> with <em>formatting</em>.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <p>Check out <a href="/page">this link</a>!</p>
      `;
      const result = sanitizeHtml(input);
      expect(result).toContain('<h1>');
      expect(result).toContain('<strong>');
      expect(result).toContain('<a href="/page">');
      expect(result).not.toContain('<script>');
    });

    it('should prevent XSS attacks', () => {
      const maliciousInputs = [
        '<img src=x onerror="alert(1)">',
        '<a href="javascript:alert(1)">Click</a>',
        '<script>alert(document.cookie)</script>',
        '<iframe src="evil.com"></iframe>',
        '<object data="evil.swf"></object>',
        '<embed src="evil.swf">',
      ];

      maliciousInputs.forEach(input => {
        const result = sanitizeHtml(input);
        expect(result).not.toContain('javascript:');
        expect(result).not.toContain('onerror');
        expect(result).not.toContain('<script');
        expect(result).not.toContain('<iframe');
        expect(result).not.toContain('<object');
        expect(result).not.toContain('<embed');
      });
    });

    it('should handle CMS-generated content safely', () => {
      const cmsContent = `
        <div class="content">
          <h2>Section Title</h2>
          <p>Some text with <a href="https://example.com" target="_blank" rel="noopener">external link</a>.</p>
          <img src="/uploads/image.jpg" alt="Description" />
          <blockquote class="quote">
            <p>A quoted text</p>
          </blockquote>
        </div>
      `;
      const result = sanitizeHtml(cmsContent);
      expect(result).toContain('<div class="content">');
      expect(result).toContain('<h2>');
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('target="_blank"');
      expect(result).toContain('<img src="/uploads/image.jpg"');
      expect(result).toContain('<blockquote class="quote">');
    });
  });
});
