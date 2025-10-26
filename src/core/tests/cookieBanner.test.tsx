import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import CookieBanner from '@/ui/components/cookie-banner/CookieBanner';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CookieBanner Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should render without crashing', () => {
    const { container } = render(<CookieBanner />);
    expect(container).toBeInTheDocument();
  });

  it('should not crash when consent is already stored', () => {
    localStorageMock.setItem('cookie-consent', 'accepted');
    
    const { container } = render(<CookieBanner />);
    expect(container).toBeInTheDocument();
  });
});