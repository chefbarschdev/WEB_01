import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import qwikPlugin from 'eslint-plugin-qwik';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
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
