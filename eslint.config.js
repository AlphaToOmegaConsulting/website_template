import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default [
  // Global ignores MUST be in a separate config object with ONLY ignores
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.astro/**',
      '**/tests/**',
      '**/scripts/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
  // Then apply configs to everything else
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Astro rules
      'astro/no-set-html-directive': 'error',
      'astro/no-unused-css-selector': 'warn',

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
    },
  },
];
