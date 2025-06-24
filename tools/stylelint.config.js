export default {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-order"],
  rules: {
    "order/properties-order": [
      // Layout
      "position", "top", "right", "bottom", "left", "z-index",
      
      // Display & Flexbox
      "display", "flex-direction", "justify-content", "align-items",
      
      // Dimensions
      "width", "height", "min-width", "max-width", "min-height", "max-height",
      
      // Spacing
      "margin", "padding",
      
      // Border
      "border", "border-radius",
      
      // Visual
      "background", "color", "opacity",
      
      // Typography
      "font-family", "font-size", "font-weight", "line-height", "text-align",
      
      // Transforms (toujours à la fin)
      "transform", "transition", "animation"
    ]
  }
};