import '@testing-library/jest-dom';

// Mock window.scrollTo pour les tests
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});

// Mock window.innerHeight
Object.defineProperty(window, 'innerHeight', {
  value: 768,
  writable: true,
});

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});
