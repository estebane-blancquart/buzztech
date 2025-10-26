import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Scroller from '@/ui/components/scroller/scroller';

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
  configurable: true,
});

// Mock location
const mockLocation: { pathname: string; state: null | { resetKey: number } } = { 
  pathname: '/', 
  state: null 
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockLocation,
  };
});

const RouterWrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Scroller Component', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    mockLocation.state = null;
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });
  });

  it('should render children correctly', () => {
    render(
      <RouterWrapper>
        <Scroller>
          <div>Test Content</div>
        </Scroller>
      </RouterWrapper>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should scroll to top on mount when resetKey is present', async () => {
    mockLocation.state = { resetKey: Date.now() };

    render(
      <RouterWrapper>
        <Scroller>
          <div>Content</div>
        </Scroller>
      </RouterWrapper>
    );

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'instant',
      });
    });
  });

  it('should handle multiple children', () => {
    render(
      <RouterWrapper>
        <Scroller>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Scroller>
      </RouterWrapper>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
    expect(screen.getByText('Child 3')).toBeInTheDocument();
  });

  it('should scroll on mount even without resetKey', () => {
    mockLocation.state = null;

    render(
      <RouterWrapper>
        <Scroller>
          <div>Content</div>
        </Scroller>
      </RouterWrapper>
    );

    // Le composant Scroller scroll toujours au montage
    expect(mockScrollTo).toHaveBeenCalled();
  });

  it('should scroll to top when mounted', () => {
    // Simuler un scroll existant
    Object.defineProperty(window, 'scrollY', {
      value: 500,
      writable: true,
      configurable: true,
    });

    mockLocation.state = null;

    render(
      <RouterWrapper>
        <Scroller>
          <div>Content</div>
        </Scroller>
      </RouterWrapper>
    );

    // Devrait scroll vers le haut
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'instant',
    });
  });

  it('should reset scroll even if already at top', async () => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });

    mockLocation.state = { resetKey: Date.now() };

    render(
      <RouterWrapper>
        <Scroller>
          <div>Content</div>
        </Scroller>
      </RouterWrapper>
    );

    await waitFor(() => {
      // Devrait appeler scrollTo même si déjà en haut
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'instant',
      });
    });
  });

  it('should handle React fragments as children', () => {
    render(
      <RouterWrapper>
        <Scroller>
          <>
            <div>Fragment Child 1</div>
            <div>Fragment Child 2</div>
          </>
        </Scroller>
      </RouterWrapper>
    );

    expect(screen.getByText('Fragment Child 1')).toBeInTheDocument();
    expect(screen.getByText('Fragment Child 2')).toBeInTheDocument();
  });

  it('should use instant scroll behavior', async () => {
    mockLocation.state = { resetKey: Date.now() };

    render(
      <RouterWrapper>
        <Scroller>
          <div>Content</div>
        </Scroller>
      </RouterWrapper>
    );

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: 'instant',
        })
      );
    });
  });

  it('should scroll to exact top position', async () => {
    mockLocation.state = { resetKey: Date.now() };

    render(
      <RouterWrapper>
        <Scroller>
          <div>Content</div>
        </Scroller>
      </RouterWrapper>
    );

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          top: 0,
        })
      );
    });
  });

  it('should work with empty children', () => {
    render(
      <RouterWrapper>
        <Scroller>{null}</Scroller>
      </RouterWrapper>
    );

    // Should render without errors
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should re-scroll on location state change', async () => {
    const { rerender } = render(
      <RouterWrapper>
        <Scroller>
          <div>Content</div>
        </Scroller>
      </RouterWrapper>
    );

    mockScrollTo.mockClear();

    // Changer le state
    mockLocation.state = { resetKey: Date.now() };
    
    rerender(
      <RouterWrapper>
        <Scroller>
          <div>Content</div>
        </Scroller>
      </RouterWrapper>
    );

    await waitFor(() => {
      expect(mockScrollTo).toHaveBeenCalled();
    });
  });
});