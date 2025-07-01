import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import qwikPlugin from 'eslint-plugin-qwik';

export default [
  {
    ignores: ['node_modules/**', 'public/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      qwik: qwikPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...qwikPlugin.configs.recommended.rules,
    },
  },
];
