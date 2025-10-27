export default {
  extends: ['stylelint-config-standard-scss'],
  
  plugins: ['stylelint-order'],
  
  rules: {
    // ===== NAMING CONVENTIONS =====
    // Autorise camelCase pour CSS Modules
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,

    // ===== SPECIFICITY =====
    // Désactivé car trop strict en pratique (composants imbriqués)
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,

    // ===== SCSS LEGACY =====
    // Autorise anciennes fonctions SCSS (math.div vs /)
    'scss/no-global-function-names': null,
    'scss/at-extend-no-missing-placeholder': null,

    // ===== SCSS BEST PRACTICES =====
    // Force l'extension .scss dans les imports
    'scss/at-import-partial-extension': 'always',
    // Variables SCSS en camelCase
    'scss/dollar-variable-pattern': '^[a-z][a-zA-Z0-9]*$',

    // ===== COLORS =====
    // Force les couleurs hex courtes (#fff au lieu de #ffffff)
    'color-hex-length': 'short',

    // ===== ORDER =====
    // Ordre logique des propriétés CSS pour lisibilité
    'order/properties-order': [
      'content',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex',
      'flex-direction',
      'flex-wrap',
      'justify-content',
      'align-items',
      'gap',
      'grid',
      'grid-template-columns',
      'grid-template-rows',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'padding',
      'border',
      'border-radius',
      'background',
      'color',
      'font',
      'font-size',
      'font-weight',
      'line-height',
      'text-align',
      'opacity',
      'transform',
      'transition',
      'animation',
    ],

    // ===== VENDOR PREFIXES =====
    // Autorise vendor prefixes (autoprefixer ou fallbacks manuels)
    'property-no-vendor-prefix': null,

    // ===== WHITESPACE =====
    // Désactivé pour plus de flexibilité
    'declaration-empty-line-before': null,
    'rule-empty-line-before': null,

    // ===== SHORTHAND =====
    // Autorise propriétés longues même si shorthand existe
    'declaration-block-no-redundant-longhand-properties': null,
  },
};