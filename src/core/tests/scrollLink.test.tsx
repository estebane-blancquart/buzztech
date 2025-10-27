import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollLink from '@/ui/components/scroller/scrollLink';

// Mock useLocation and useNavigate
const mockNavigate = vi.fn();
const mockLocation = { pathname: '/' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  };
});

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

const RouterWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <BrowserRouter>{children}</BrowserRouter>;

describe('ScrollLink Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockScrollTo.mockClear();
  });

  it('should render children correctly', () => {
    render(
      <RouterWrapper>
        <ScrollLink to="/test">Test Link</ScrollLink>
      </RouterWrapper>
    );

    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <RouterWrapper>
        <ScrollLink to="/test" className="custom-class">
          Link
        </ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByText('Link');
    expect(link).toHaveClass('custom-class');
  });

  it('should scroll to top when clicked', () => {
    render(
      <RouterWrapper>
        <ScrollLink to="/test">Click Me</ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByText('Click Me');
    fireEvent.click(link);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'instant',
    });
  });

  it('should navigate to correct path', () => {
    render(
      <RouterWrapper>
        <ScrollLink to="/depannage">Dépannage</ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByText('Dépannage');
    fireEvent.click(link);

    expect(mockNavigate).toHaveBeenCalledWith(
      '/depannage',
      expect.objectContaining({
        state: expect.objectContaining({
          resetKey: expect.any(Number),
        }),
      })
    );
  });

  it('should call onClick callback if provided', () => {
    const mockOnClick = vi.fn();

    render(
      <RouterWrapper>
        <ScrollLink to="/test" onClick={mockOnClick}>
          Click
        </ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByText('Click');
    fireEvent.click(link);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should prevent default link behavior', () => {
    render(
      <RouterWrapper>
        <ScrollLink to="/test">Link</ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByText('Link');
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
    link.dispatchEvent(clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should handle navigation to same path', () => {
    mockLocation.pathname = '/test';

    render(
      <RouterWrapper>
        <ScrollLink to="/test">Same Path</ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByText('Same Path');
    fireEvent.click(link);

    // Should use replace when on same path
    expect(mockNavigate).toHaveBeenCalledWith(
      '/test',
      expect.objectContaining({
        replace: true,
      })
    );
  });

  it('should handle navigation to different path', () => {
    mockLocation.pathname = '/home';

    render(
      <RouterWrapper>
        <ScrollLink to="/about">Different Path</ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByText('Different Path');
    fireEvent.click(link);

    // Should NOT use replace when navigating to different path
    expect(mockNavigate).toHaveBeenCalledWith(
      '/about',
      expect.objectContaining({
        state: expect.objectContaining({
          resetKey: expect.any(Number),
        }),
      })
    );
  });

  it('should be accessible as a link', () => {
    render(
      <RouterWrapper>
        <ScrollLink to="/test">Accessible Link</ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should generate unique resetKey on each click', async () => {
    render(
      <RouterWrapper>
        <ScrollLink to="/test">Click Multiple</ScrollLink>
      </RouterWrapper>
    );

    const link = screen.getByText('Click Multiple');

    fireEvent.click(link);
    const firstCall = mockNavigate.mock.calls[0];

    // Attendre un peu pour que Date.now() change
    await new Promise(resolve => setTimeout(resolve, 10));

    fireEvent.click(link);
    const secondCall = mockNavigate.mock.calls[1];

    // Vérifier que les appels existent
    expect(firstCall).toBeDefined();
    expect(secondCall).toBeDefined();

    // resetKey devrait être différent à chaque clic
    if (firstCall && secondCall) {
      expect(firstCall[1].state.resetKey).not.toBe(
        secondCall[1].state.resetKey
      );
    }
  });
});
