export default {
  extends: [
    'stylelint-config-standard-scss',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    // ✅ Autoriser camelCase
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    
    // ✅ Désactiver warnings spécificité
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    
    // ✅ Autoriser fonctions SCSS legacy
    'scss/no-global-function-names': null,
    'scss/at-extend-no-missing-placeholder': null,
    
    // ✅ Désactiver l'ordre des propriétés (trop strict)
    'order/properties-order': null,
    
    // ✅ Autoriser vendor prefixes (nécessaires pour compatibilité)
    'property-no-vendor-prefix': null,
    
    // ✅ Désactiver règles trop strictes
    'declaration-empty-line-before': null,
    'rule-empty-line-before': null,
    'declaration-block-no-redundant-longhand-properties': null,
  },
};