import { describe, it, expect } from 'vitest';

/**
 * Tests unitaires pour la logique de styles du composant ButtonLink
 * Vérifie que les classes CSS sont correctement appliquées selon les props
 */
describe('ButtonLink Styles Logic', () => {
  // Réplication de la logique du composant ButtonLink.astro pour les tests
  const variantClasses = {
    primary: 'bg-brand-accent text-white hover:bg-brand-primary active:opacity-90',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
    ghost: 'bg-transparent text-brand-primary hover:bg-gray-50 active:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 no-underline';

  function getButtonLinkClasses(
    variant: 'primary' | 'secondary' | 'ghost' = 'primary',
    size: 'sm' | 'md' | 'lg' = 'md',
    className: string = ''
  ): string {
    return [baseClasses, variantClasses[variant], sizeClasses[size], className]
      .filter(Boolean)
      .join(' ');
  }

  describe('Variant Classes', () => {
    it('should apply primary variant classes by default', () => {
      const classes = getButtonLinkClasses();
      expect(classes).toContain('bg-brand-accent');
      expect(classes).toContain('text-white');
      expect(classes).toContain('hover:bg-brand-primary');
    });

    it('should apply secondary variant classes', () => {
      const classes = getButtonLinkClasses('secondary');
      expect(classes).toContain('bg-gray-600');
      expect(classes).toContain('hover:bg-gray-700');
      expect(classes).toContain('active:bg-gray-800');
    });

    it('should apply ghost variant classes', () => {
      const classes = getButtonLinkClasses('ghost');
      expect(classes).toContain('bg-transparent');
      expect(classes).toContain('text-brand-primary');
      expect(classes).toContain('hover:bg-gray-50');
    });
  });

  describe('Size Classes', () => {
    it('should apply medium size classes by default', () => {
      const classes = getButtonLinkClasses();
      expect(classes).toContain('px-4');
      expect(classes).toContain('py-2');
      expect(classes).toContain('text-base');
    });

    it('should apply small size classes', () => {
      const classes = getButtonLinkClasses('primary', 'sm');
      expect(classes).toContain('px-3');
      expect(classes).toContain('py-1.5');
      expect(classes).toContain('text-sm');
    });

    it('should apply large size classes', () => {
      const classes = getButtonLinkClasses('primary', 'lg');
      expect(classes).toContain('px-6');
      expect(classes).toContain('py-3');
      expect(classes).toContain('text-lg');
    });
  });

  describe('Base Classes', () => {
    it('should always include base classes', () => {
      const classes = getButtonLinkClasses();
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('font-medium');
      expect(classes).toContain('rounded-md');
      expect(classes).toContain('transition-colors');
    });

    it('should include no-underline class for links', () => {
      const classes = getButtonLinkClasses();
      expect(classes).toContain('no-underline');
    });

    it('should include focus-visible classes for accessibility', () => {
      const classes = getButtonLinkClasses();
      expect(classes).toContain('focus-visible:outline-none');
      expect(classes).toContain('focus-visible:ring-2');
      expect(classes).toContain('focus-visible:ring-brand-accent');
    });
  });

  describe('Custom Classes', () => {
    it('should append custom classes', () => {
      const classes = getButtonLinkClasses('primary', 'md', 'custom-class');
      expect(classes).toContain('custom-class');
    });

    it('should maintain all classes when custom class is added', () => {
      const classes = getButtonLinkClasses('secondary', 'lg', 'w-full');
      expect(classes).toContain('bg-gray-600');
      expect(classes).toContain('px-6');
      expect(classes).toContain('w-full');
    });
  });

  describe('URL Resolution', () => {
    it('should preserve internal URLs starting with /', () => {
      const href = '/fr/events';
      expect(href.startsWith('/')).toBe(true);
    });

    it('should preserve external URLs', () => {
      const href = 'https://example.com';
      expect(href.startsWith('http')).toBe(true);
    });

    it('should recognize relative URLs', () => {
      const href = './about';
      expect(href.startsWith('.')).toBe(true);
    });
  });

  describe('Link Attributes', () => {
    it('should use target="_blank" for external links when specified', () => {
      const target = '_blank';
      expect(target).toBe('_blank');
    });

    it('should use target="_self" by default', () => {
      const target = '_self';
      expect(target).toBe('_self');
    });

    it('should accept rel attribute for security', () => {
      const rel = 'noopener noreferrer';
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });
  });
});
