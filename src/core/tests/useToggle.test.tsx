import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useToggle } from '../hooks/useToggle';

describe('useToggle', () => {
  it('should initialize with default value false', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
    expect(typeof result.current[1]).toBe('function');
  });

  it('should initialize with custom initial value', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it('should toggle value from false to true', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1](); // Call toggle function
    });

    expect(result.current[0]).toBe(true);
  });

  it('should toggle value from true to false', () => {
    const { result } = renderHook(() => useToggle(true));

    act(() => {
      result.current[1](); // Call toggle function
    });

    expect(result.current[0]).toBe(false);
  });

  it('should toggle multiple times correctly', () => {
    const { result } = renderHook(() => useToggle(false));

    // false -> true
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    // true -> false
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);

    // false -> true again
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });

  it('should return the same toggle function reference', () => {
    const { result, rerender } = renderHook(() => useToggle());

    const firstToggleRef = result.current[1];

    // Force re-render
    rerender();

    const secondToggleRef = result.current[1];

    // Should be the same function reference (useCallback)
    expect(firstToggleRef).toBe(secondToggleRef);
  });
});
