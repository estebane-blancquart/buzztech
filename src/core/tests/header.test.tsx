import Header from '@/ui/components/header/Header';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

const RouterWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <BrowserRouter>{children}</BrowserRouter>;

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('Header Component', () => {
  it('should render logo', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    expect(screen.getByText('BUZZTECH')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    expect(screen.getByText('Dépannage')).toBeInTheDocument();
    expect(screen.getByText('Configuration')).toBeInTheDocument();
    expect(screen.getByText('Création Web')).toBeInTheDocument();
  });

  it('should have mobile menu toggle button', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    const toggleButton = screen.getByRole('button', { name: /menu/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should toggle mobile menu when clicking toggle button', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    const toggleButton = screen.getByRole('button', { name: /menu/i });

    // Initially closed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Click to close
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should support keyboard navigation on toggle button', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    const toggleButton = screen.getByRole('button', { name: /menu/i });

    // Test Enter key
    fireEvent.keyDown(toggleButton, { key: 'Enter' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Test Space key
    fireEvent.keyDown(toggleButton, { key: ' ' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Test Escape key (should close if open)
    fireEvent.click(toggleButton); // Open first
    fireEvent.keyDown(toggleButton, { key: 'Escape' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should close mobile menu when clicking navigation link', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    const toggleButton = screen.getByRole('button', { name: /menu/i });
    const depannageLink = screen.getByText('Dépannage');

    // Open menu
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

    // Click nav link should close menu
    fireEvent.click(depannageLink);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('should have proper accessibility attributes', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navigation principale');

    const toggleButton = screen.getByRole('button', { name: /menu/i });
    expect(toggleButton).toHaveAttribute('aria-controls', 'main-navigation');
  });

  it('should have logo as link to home', () => {
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    const logoLink = screen.getByText('BUZZTECH').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
