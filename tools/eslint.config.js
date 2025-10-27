import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  {
    // Fichiers à linter
    files: ['**/*.{js,jsx,ts,tsx}'],
    
    // Ignorer les dossiers de build et dépendances
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.netlify/**'],
    
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksPlugin,
    },
    
    rules: {
      // ===== TYPESCRIPT STRICT =====
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      
      // ===== REACT HOOKS =====
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      
      // ===== CODE QUALITY =====
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'no-duplicate-imports': 'error',
      
      // ===== IMPORTS =====
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**/'],
              message: 'Utilise les path aliases @ au lieu de ../',
            },
          ],
        },
      ],
    },
  },
];