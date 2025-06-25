import { renderHook, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { useScroll } from '../hooks/useScroll';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('useScroll', () => {
  it('should change activeItem when clicking', async () => {
    const { result } = renderHook(
      () => useScroll({ totalItems: 3, initialIndex: 0, fadeDelay: 10 }),
      { wrapper }
    );

    expect(result.current.activeItem).toBe(0);

    act(() => {
      result.current.handleItemClick(2);
    });

    // Attendre que les setTimeout se terminent
    await waitFor(() => {
      expect(result.current.activeItem).toBe(2);
    });
  });
});
