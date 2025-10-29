import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import CookieBanner from '@/ui/components/cookie-banner/CookieBanner';

// Mock localStorage
const localStorageMock = ((): Storage => {
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
    key: (index: number): string | null => {
      const keys = Object.keys(store);
      return keys[index] ?? null;
    },
    get length(): number {
      return Object.keys(store).length;
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
    localStorageMock.setItem(
      'buzztech_cookie_consent',
      JSON.stringify({
        value: 'accepted',
        expiry: Date.now() + 1000000,
      })
    );
    const { container } = render(<CookieBanner />);
    expect(container).toBeInTheDocument();
  });
});