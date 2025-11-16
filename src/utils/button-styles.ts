/**
 * Button Styles Utilities
 *
 * Shared styling logic for Button and ButtonLink primitives.
 * Following Alpha WebCore v3 principles: centralized, reusable, brand-agnostic.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-accent text-white hover:bg-brand-primary active:opacity-90',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
  ghost: 'bg-transparent text-brand-primary hover:bg-gray-50 active:bg-gray-100',
};

export const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2';

/**
 * Get combined button classes
 */
export function getButtonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  disabled = false,
  className = ''
): string {
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className,
  ].filter(Boolean).join(' ');
}
