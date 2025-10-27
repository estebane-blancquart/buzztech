export default {
  // ===== INDENTATION =====
  tabWidth: 2,
  useTabs: false,

  // ===== QUOTES =====
  singleQuote: true,
  jsxSingleQuote: false,

  // ===== SEMICOLONS ET VIRGULES =====
  semi: true,
  trailingComma: 'es5',

  // ===== LIGNE =====
  printWidth: 80,

  // ===== BRACKETS =====
  bracketSpacing: true,
  bracketSameLine: false,

  // ===== AUTRES =====
  arrowParens: 'avoid',
  endOfLine: 'lf',

  // ===== OVERRIDES SPÉCIFIQUES =====
  overrides: [
    {
      files: '*.scss',
      options: {
        parser: 'scss',
        singleQuote: false,
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
  ],
};