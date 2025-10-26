import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import CookieBanner from '@/ui/components/cookie-banner/CookieBanner';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string): string | null => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
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
    localStorageMock.setItem('buzztech_cookie_consent', JSON.stringify({
      value: 'accepted',
      expiry: Date.now() + 1000000
    }));
    
    const { container } = render(<CookieBanner />);
    expect(container).toBeInTheDocument();
  });
});