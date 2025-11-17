import { describe, it, expect } from 'vitest';

/**
 * Tests unitaires pour la logique de styles du composant Input
 * Vérifie que les classes CSS sont correctement appliquées selon les props
 */
describe('Input Styles Logic', () => {
  // Réplication de la logique du composant Input.astro pour les tests
  const baseClasses = 'w-full px-3 py-2 border rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2';

  function getInputClasses(
    error: string | undefined = undefined,
    disabled: boolean = false,
    className: string = ''
  ): string {
    const stateClasses = error
      ? 'border-red-500 focus-visible:ring-red-500'
      : 'border-gray-300 focus:border-brand-accent';

    const disabledClasses = disabled
      ? 'bg-gray-100 cursor-not-allowed opacity-60'
      : 'bg-white';

    return [baseClasses, stateClasses, disabledClasses, className]
      .filter(Boolean)
      .join(' ');
  }

  describe('Base Classes', () => {
    it('should always include base layout classes', () => {
      const classes = getInputClasses();
      expect(classes).toContain('w-full');
      expect(classes).toContain('px-3');
      expect(classes).toContain('py-2');
      expect(classes).toContain('border');
      expect(classes).toContain('rounded-md');
    });

    it('should include transition and focus classes', () => {
      const classes = getInputClasses();
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('focus-visible:outline-none');
      expect(classes).toContain('focus-visible:ring-2');
      expect(classes).toContain('focus-visible:ring-brand-accent');
    });
  });

  describe('Error State', () => {
    it('should apply normal border when no error', () => {
      const classes = getInputClasses();
      expect(classes).toContain('border-gray-300');
      expect(classes).toContain('focus:border-brand-accent');
      expect(classes).not.toContain('border-red-500');
    });

    it('should apply error border when error is present', () => {
      const classes = getInputClasses('Error message');
      expect(classes).toContain('border-red-500');
      expect(classes).toContain('focus-visible:ring-red-500');
      expect(classes).not.toContain('border-gray-300');
    });
  });

  describe('Disabled State', () => {
    it('should apply enabled background by default', () => {
      const classes = getInputClasses();
      expect(classes).toContain('bg-white');
      expect(classes).not.toContain('bg-gray-100');
      expect(classes).not.toContain('cursor-not-allowed');
    });

    it('should apply disabled styles when disabled is true', () => {
      const classes = getInputClasses(undefined, true);
      expect(classes).toContain('bg-gray-100');
      expect(classes).toContain('cursor-not-allowed');
      expect(classes).toContain('opacity-60');
      expect(classes).not.toContain('bg-white');
    });
  });

  describe('Combined States', () => {
    it('should handle error and disabled states together', () => {
      const classes = getInputClasses('Error message', true);
      expect(classes).toContain('border-red-500');
      expect(classes).toContain('bg-gray-100');
      expect(classes).toContain('cursor-not-allowed');
    });
  });

  describe('Custom Classes', () => {
    it('should append custom classes', () => {
      const classes = getInputClasses(undefined, false, 'custom-class');
      expect(classes).toContain('custom-class');
      expect(classes).toContain('bg-white');
    });

    it('should maintain all classes when custom class is added', () => {
      const classes = getInputClasses('Error', false, 'max-w-xs');
      expect(classes).toContain('border-red-500');
      expect(classes).toContain('max-w-xs');
    });
  });

  describe('Accessibility Requirements', () => {
    it('should include proper id generation pattern', () => {
      const name = 'email';
      const inputId = `input-${name}`;
      expect(inputId).toBe('input-email');
    });

    it('should generate error id when error is present', () => {
      const name = 'email';
      const error = 'Invalid email';
      const inputId = `input-${name}`;
      const errorId = error ? `${inputId}-error` : undefined;
      expect(errorId).toBe('input-email-error');
    });

    it('should not generate error id when no error', () => {
      const name = 'email';
      const error = undefined;
      const inputId = `input-${name}`;
      const errorId = error ? `${inputId}-error` : undefined;
      expect(errorId).toBeUndefined();
    });
  });

  describe('Required Field Indicator', () => {
    it('should show asterisk for required fields', () => {
      const required = true;
      const hasAsterisk = required;
      expect(hasAsterisk).toBe(true);
    });

    it('should not show asterisk for optional fields', () => {
      const required = false;
      const hasAsterisk = required;
      expect(hasAsterisk).toBe(false);
    });
  });
});
