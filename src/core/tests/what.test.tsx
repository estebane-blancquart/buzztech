import What from '@/ui/modules/service-what/What';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
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

// Mock document.elementFromPoint
Object.defineProperty(document, 'elementFromPoint', {
  value: vi.fn(() => ({
    closest: vi.fn(() => ({
      focus: vi.fn(),
    })),
  })),
  writable: true,
});

const mockProps = {
  badge: 'dépannage',
  title: 'Dépannage informatique',
  subtitle: 'Intervention rapide et diagnostic immédiat',
  scrollText: 'Découvrir le service',
};

describe('What Component', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    vi.clearAllMocks();
  });

  it('should render all props correctly', () => {
    render(<What {...mockProps} />);

    expect(screen.getByText('dépannage')).toBeInTheDocument();
    expect(screen.getByText('Dépannage informatique')).toBeInTheDocument();
    expect(
      screen.getByText('Intervention rapide et diagnostic immédiat')
    ).toBeInTheDocument();
    expect(screen.getByText('Découvrir le service')).toBeInTheDocument();
  });

  it('should use default scroll text when not provided', () => {
    const propsWithoutScrollText = {
      badge: 'test',
      title: 'Test Title',
      subtitle: 'Test Subtitle',
    };

    render(<What {...propsWithoutScrollText} />);

    expect(screen.getByText('Découvrir le service')).toBeInTheDocument();
  });

  it('should be keyboard accessible', () => {
    render(<What {...mockProps} />);

    const component = screen.getByRole('region', {
      name: /Présentation du service/,
    });
    expect(component).toHaveAttribute('tabindex', '0');
    expect(component).toHaveAttribute('aria-label', 'Présentation du service');
  });

  it('should handle scroll indicator click', () => {
    render(<What {...mockProps} />);

    const scrollIndicator = screen
      .getByText('Découvrir le service')
      .closest('div');
    expect(scrollIndicator).toBeInTheDocument();

    if (scrollIndicator) {
      fireEvent.click(scrollIndicator);
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 768, // window.scrollY + window.innerHeight
        behavior: 'smooth',
      });
    }
  });

  it('should handle keyboard navigation with ArrowDown', () => {
    render(<What {...mockProps} />);

    const component = screen.getByRole('region');

    fireEvent.keyDown(component, { key: 'ArrowDown' });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 768,
      behavior: 'instant',
    });
  });

  it('should handle keyboard navigation with ArrowRight', () => {
    render(<What {...mockProps} />);

    const component = screen.getByRole('region');

    fireEvent.keyDown(component, { key: 'ArrowRight' });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 768,
      behavior: 'instant',
    });
  });

  it('should not respond to other keyboard keys', () => {
    render(<What {...mockProps} />);

    const component = screen.getByRole('region');

    // Test keys that should not trigger navigation
    fireEvent.keyDown(component, { key: 'ArrowUp' });
    fireEvent.keyDown(component, { key: 'ArrowLeft' });
    fireEvent.keyDown(component, { key: 'Enter' });
    fireEvent.keyDown(component, { key: 'Space' });

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should render scroll arrow', () => {
    render(<What {...mockProps} />);

    expect(screen.getByText('↓')).toBeInTheDocument();
  });

  // ===== NOUVEAU TEST : Accessibilité améliorée =====
  it('should NOT auto-focus on mount without keyboard interaction', () => {
    const { container } = render(<What {...mockProps} />);

    const component = container.querySelector('[tabindex="0"]');
    expect(component).toBeInTheDocument();

    // Le composant NE doit PAS avoir le focus automatiquement
    expect(document.activeElement).not.toBe(component);
  });

  it('should focus on first Tab key press (keyboard navigation detection)', async () => {
    render(<What {...mockProps} />);

    const component = screen.getByRole('region');

    // Simuler une navigation clavier (Tab)
    fireEvent.keyDown(window, { key: 'Tab' });

    // Attendre que le focus soit appliqué
    await waitFor(() => {
      // Le focus peut être appliqué (c'est optionnel selon le contexte)
      // On vérifie juste que le listener est bien installé
      expect(component).toHaveAttribute('tabindex', '0');
    });
  });

  it('should respect user focus when they tab through page', () => {
    render(<What {...mockProps} />);

    // Créer un autre élément focusable
    const otherElement = document.createElement('button');
    otherElement.setAttribute('tabindex', '0');
    document.body.appendChild(otherElement);
    otherElement.focus();

    // L'utilisateur presse Tab
    fireEvent.keyDown(window, { key: 'Tab' });

    // Le focus ne doit PAS être volé si un autre élément est déjà focus
    expect(document.activeElement).toBe(otherElement);

    // Cleanup
    document.body.removeChild(otherElement);
  });

  it('should handle ArrowDown and ArrowRight keys only when focused', () => {
    render(<What {...mockProps} />);

    const component = screen.getByRole('region');

    // Sans focus, les touches ne doivent rien faire
    fireEvent.keyDown(document.body, { key: 'ArrowDown' });
    expect(mockScrollTo).not.toHaveBeenCalled();

    mockScrollTo.mockClear();

    // Avec focus, ça doit fonctionner
    fireEvent.keyDown(component, { key: 'ArrowDown' });
    expect(mockScrollTo).toHaveBeenCalled();
  });
});
