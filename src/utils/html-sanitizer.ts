/**
 * HTML Sanitizer Utility
 *
 * Provides basic HTML sanitization for user-generated content or CMS content.
 * This is a simple implementation that allows common HTML tags while blocking
 * potentially dangerous ones.
 *
 * For production use with untrusted content, consider using a library like DOMPurify.
 */

/**
 * List of allowed HTML tags
 */
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 'b', 'i', 'span', 'div',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'a', 'img',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
];

/**
 * List of allowed attributes per tag
 */
const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  'a': ['href', 'title', 'target', 'rel'],
  'img': ['src', 'alt', 'title', 'width', 'height'],
  'span': ['class'],
  'div': ['class'],
  'p': ['class'],
  'h1': ['class'],
  'h2': ['class'],
  'h3': ['class'],
  'h4': ['class'],
  'h5': ['class'],
  'h6': ['class'],
  'blockquote': ['class'],
  'pre': ['class'],
  'code': ['class'],
};

/**
 * List of dangerous URL protocols to block
 */
const DANGEROUS_PROTOCOLS = ['javascript:', 'data:', 'vbscript:'];

/**
 * Sanitizes HTML content by removing dangerous tags and attributes
 *
 * @param html - The HTML string to sanitize
 * @param options - Sanitization options
 * @returns Sanitized HTML string
 *
 * @example
 * ```ts
 * const cleanHtml = sanitizeHtml('<p>Hello <script>alert("XSS")</script></p>');
 * // Returns: '<p>Hello </p>'
 * ```
 *
 * @warning This is a basic implementation. For production use with untrusted
 * content, use a robust library like DOMPurify.
 */
export function sanitizeHtml(
  html: string,
  options: {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
  } = {}
): string {
  const allowedTags = options.allowedTags || ALLOWED_TAGS;
  const allowedAttributes = options.allowedAttributes || ALLOWED_ATTRIBUTES;

  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove style tags and their content
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\son\w+\s*=\s*[^\s>]*/gi, '');

  // Remove dangerous protocols from href and src attributes
  DANGEROUS_PROTOCOLS.forEach(protocol => {
    const regex = new RegExp(`(href|src)\\s*=\\s*["']?${protocol}[^"'\\s>]*["']?`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  // Parse and filter tags
  sanitized = sanitized.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tagName) => {
    const tag = tagName.toLowerCase();

    // Check if tag is allowed
    if (!allowedTags.includes(tag)) {
      return '';
    }

    // If closing tag, allow it
    if (match.startsWith('</')) {
      return match;
    }

    // Filter attributes
    const tagAllowedAttributes = allowedAttributes[tag] || [];
    if (tagAllowedAttributes.length === 0) {
      return `<${tag}>`;
    }

    // Extract and filter attributes
    const attributeRegex = /(\w+)\s*=\s*["']([^"']*)["']/g;
    const attributes: string[] = [];
    let attrMatch;

    while ((attrMatch = attributeRegex.exec(match)) !== null) {
      const [, attrName, attrValue] = attrMatch;
      if (tagAllowedAttributes.includes(attrName.toLowerCase())) {
        attributes.push(`${attrName}="${attrValue}"`);
      }
    }

    return attributes.length > 0
      ? `<${tag} ${attributes.join(' ')}>`
      : `<${tag}>`;
  });

  return sanitized.trim();
}

/**
 * Strips all HTML tags from a string, leaving only text content
 *
 * @param html - The HTML string to strip
 * @returns Plain text string
 *
 * @example
 * ```ts
 * const text = stripHtml('<p>Hello <strong>World</strong></p>');
 * // Returns: 'Hello World'
 * ```
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

/**
 * Escapes HTML special characters to prevent XSS
 *
 * @param text - The text to escape
 * @returns Escaped text safe for HTML insertion
 *
 * @example
 * ```ts
 * const escaped = escapeHtml('<script>alert("XSS")</script>');
 * // Returns: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
 * ```
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}
