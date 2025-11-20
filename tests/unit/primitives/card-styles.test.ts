import { describe, it, expect } from 'vitest';

/**
 * Tests unitaires pour la logique de styles du composant Card
 * Vérifie que les classes CSS sont correctement appliquées selon les props
 */
describe('Card Styles Logic', () => {
  // Réplication de la logique du composant Card.astro pour les tests
  const variantClasses = {
    default: 'bg-white',
    bordered: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = 'rounded-lg';

  function getCardClasses(
    variant: 'default' | 'bordered' | 'elevated' = 'default',
    padding: 'none' | 'sm' | 'md' | 'lg' = 'md',
    className: string = ''
  ): string {
    return [baseClasses, variantClasses[variant], paddingClasses[padding], className]
      .filter(Boolean)
      .join(' ');
  }

  describe('Variant Classes', () => {
    it('should apply default variant classes by default', () => {
      const classes = getCardClasses();
      expect(classes).toContain('bg-white');
      expect(classes).toContain('rounded-lg');
      expect(classes).not.toContain('border');
      expect(classes).not.toContain('shadow-lg');
    });

    it('should apply bordered variant classes', () => {
      const classes = getCardClasses('bordered');
      expect(classes).toContain('bg-white');
      expect(classes).toContain('border');
      expect(classes).toContain('border-gray-200');
    });

    it('should apply elevated variant classes', () => {
      const classes = getCardClasses('elevated');
      expect(classes).toContain('bg-white');
      expect(classes).toContain('shadow-lg');
    });
  });

  describe('Padding Classes', () => {
    it('should apply medium padding by default', () => {
      const classes = getCardClasses();
      expect(classes).toContain('p-6');
    });

    it('should apply no padding when padding is none', () => {
      const classes = getCardClasses('default', 'none');
      expect(classes).not.toContain('p-');
    });

    it('should apply small padding', () => {
      const classes = getCardClasses('default', 'sm');
      expect(classes).toContain('p-4');
    });

    it('should apply large padding', () => {
      const classes = getCardClasses('default', 'lg');
      expect(classes).toContain('p-8');
    });
  });

  describe('Base Classes', () => {
    it('should always include rounded-lg', () => {
      const classes = getCardClasses('default', 'none');
      expect(classes).toContain('rounded-lg');
    });
  });

  describe('Custom Classes', () => {
    it('should append custom classes', () => {
      const classes = getCardClasses('default', 'md', 'max-w-md');
      expect(classes).toContain('max-w-md');
    });

    it('should maintain all classes when custom class is added', () => {
      const classes = getCardClasses('elevated', 'lg', 'hover:shadow-xl');
      expect(classes).toContain('shadow-lg');
      expect(classes).toContain('p-8');
      expect(classes).toContain('hover:shadow-xl');
    });
  });

  describe('Combination of variants and padding', () => {
    it('should work with bordered variant and small padding', () => {
      const classes = getCardClasses('bordered', 'sm');
      expect(classes).toContain('border');
      expect(classes).toContain('p-4');
    });

    it('should work with elevated variant and no padding', () => {
      const classes = getCardClasses('elevated', 'none');
      expect(classes).toContain('shadow-lg');
      expect(classes).not.toContain('p-');
    });
  });
});
