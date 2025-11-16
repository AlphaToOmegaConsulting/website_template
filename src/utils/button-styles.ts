/**
 * Shared Button Styles
 *
 * Centralized button styling utilities used by Button.astro and ButtonLink.astro
 * to maintain consistency and avoid duplication.
 */

export const variantClasses = {
  primary: 'bg-brand-accent text-white hover:bg-brand-primary active:opacity-90',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
  ghost: 'bg-transparent text-brand-primary hover:bg-gray-50 active:bg-gray-100',
} as const;

export const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
} as const;

export const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2';

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;
