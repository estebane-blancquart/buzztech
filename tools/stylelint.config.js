export default {
  extends: [
    'stylelint-config-standard-scss',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    // ✅ Autoriser camelCase pour les classes (convention React)
    'selector-class-pattern': null,
    
    // ✅ Autoriser camelCase pour les keyframes
    'keyframes-name-pattern': null,
    
    // ✅ Désactiver l'avertissement de spécificité descendante
    'no-descending-specificity': null,
    
    // ✅ Autoriser les fonctions SCSS legacy (lighten, darken, etc.)
    'scss/no-global-function-names': null,
    
    // ✅ Autoriser @extend sans placeholder
    'scss/at-extend-no-missing-placeholder': null,
    
    // ✅ Autoriser les sélecteurs dupliqués
    'no-duplicate-selectors': null,
    
    // Ordre des propriétés CSS
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'flex',
      'flex-direction',
      'justify-content',
      'align-items',
      'width',
      'height',
      'margin',
      'padding',
      'border',
      'background',
      'color',
      'font-family',
      'font-size',
      'font-weight',
      'transition',
    ],
  },
};