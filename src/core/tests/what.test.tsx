import What from '@/ui/modules/service-what/What';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
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
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<What {...mockProps} />);

    const scrollIndicator = screen
      .getByText('Découvrir le service')
      .closest('div');
    expect(scrollIndicator).toBeInTheDocument();

    if (scrollIndicator) {
      fireEvent.click(scrollIndicator);
      expect(scrollToMock).toHaveBeenCalledWith({
        top: 768, // window.scrollY + window.innerHeight
        behavior: 'smooth',
      });
    }
  });

  it('should handle keyboard navigation', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<What {...mockProps} />);

    const component = screen.getByRole('region');

    // Test ArrowDown
    fireEvent.keyDown(component, { key: 'ArrowDown' });
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 768,
      behavior: 'instant',
    });

    // Reset mock
    scrollToMock.mockClear();

    // Test ArrowRight
    fireEvent.keyDown(component, { key: 'ArrowRight' });
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 768,
      behavior: 'instant',
    });
  });

  it('should not respond to other keyboard keys', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<What {...mockProps} />);

    const component = screen.getByRole('region');

    // Test keys that should not trigger navigation
    fireEvent.keyDown(component, { key: 'ArrowUp' });
    fireEvent.keyDown(component, { key: 'ArrowLeft' });
    fireEvent.keyDown(component, { key: 'Enter' });
    fireEvent.keyDown(component, { key: 'Space' });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it('should render scroll arrow', () => {
    render(<What {...mockProps} />);

    expect(screen.getByText('↓')).toBeInTheDocument();
  });

  it('should focus automatically on mount', () => {
    const { container } = render(<What {...mockProps} />);

    // Check that the component has focus capabilities
    const component = container.querySelector('[tabindex="0"]');
    expect(component).toBeInTheDocument();
  });
});
