import Prices from '@/ui/modules/service-prices/Prices';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock window and document for keyboard navigation
Object.defineProperty(window, 'scrollY', { value: 768, writable: true });
Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
Object.defineProperty(document, 'elementFromPoint', {
  value: vi.fn(() => ({ closest: vi.fn(() => ({ focus: vi.fn() })) })),
  writable: true,
});

const mockCards = [
  {
    title: 'BASIQUE',
    price: '30',
    unit: '€',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    title: 'PREMIUM',
    price: '50',
    unit: '€',
    features: ['Premium feature 1', 'Premium feature 2'],
  },
  {
    title: 'ENTERPRISE',
    price: '100',
    unit: '€',
    features: [
      'Enterprise feature 1',
      'Enterprise feature 2',
      'Enterprise feature 3',
      'Enterprise feature 4',
    ],
  },
];

describe('Prices Component', () => {
  it('should render all price cards', () => {
    render(<Prices service="depannage" cards={mockCards} />);

    expect(screen.getByText('BASIQUE')).toBeInTheDocument();
    expect(screen.getByText('PREMIUM')).toBeInTheDocument();
    expect(screen.getByText('ENTERPRISE')).toBeInTheDocument();
  });

  it('should display prices and units correctly', () => {
    render(<Prices service="depannage" cards={mockCards} />);

    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getAllByText('€')).toHaveLength(3);
  });

  it('should render all features for each card', () => {
    render(<Prices service="depannage" cards={mockCards} />);

    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Premium feature 1')).toBeInTheDocument();
    expect(screen.getByText('Enterprise feature 1')).toBeInTheDocument();
    expect(screen.getByText('Enterprise feature 4')).toBeInTheDocument();
  });

  it('should apply correct layout class for depannage service', () => {
    const { container } = render(
      <Prices service="depannage" cards={mockCards} />
    );

    const pricesContainer = container.querySelector(
      '[class*="layout-depannage-custom"]'
    );
    expect(pricesContainer).toBeInTheDocument();
  });

  it('should apply correct layout class for configuration service', () => {
    const { container } = render(
      <Prices service="configuration" cards={mockCards} />
    );

    const pricesContainer = container.querySelector(
      '[class*="layout-configuration-custom"]'
    );
    expect(pricesContainer).toBeInTheDocument();
  });

  it('should apply correct layout class for creation-web service', () => {
    const { container } = render(
      <Prices service="creation-web" cards={mockCards} />
    );

    const pricesContainer = container.querySelector('[class*="layout-grid"]');
    expect(pricesContainer).toBeInTheDocument();
  });

  it('should be keyboard accessible', () => {
    render(<Prices service="depannage" cards={mockCards} />);

    const component = screen.getByRole('region', {
      name: /Grilles tarifaires/,
    });
    expect(component).toHaveAttribute('tabindex', '0');
    expect(component).toHaveAttribute('aria-label', 'Grilles tarifaires');
  });

  it('should handle keyboard navigation to previous module', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<Prices service="depannage" cards={mockCards} />);

    const component = screen.getByRole('region');

    // Test ArrowUp
    fireEvent.keyDown(component, { key: 'ArrowUp' });
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0, // Previous module position
      behavior: 'instant',
    });

    // Reset mock
    scrollToMock.mockClear();

    // Test ArrowLeft
    fireEvent.keyDown(component, { key: 'ArrowLeft' });
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'instant',
    });
  });

  it('should not respond to down/right arrow keys', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<Prices service="depannage" cards={mockCards} />);

    const component = screen.getByRole('region');

    fireEvent.keyDown(component, { key: 'ArrowDown' });
    fireEvent.keyDown(component, { key: 'ArrowRight' });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it('should handle cards without units', () => {
    const cardsWithoutUnit = [
      {
        title: 'FREE',
        price: '0',
        features: ['Basic feature'],
      },
    ];

    render(<Prices service="depannage" cards={cardsWithoutUnit} />);

    expect(screen.getByText('FREE')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Basic feature')).toBeInTheDocument();
  });

  it('should render bullet points for features', () => {
    render(<Prices service="depannage" cards={mockCards} />);

    const bullets = screen.getAllByText('•');
    // Should have one bullet per feature across all cards
    const totalFeatures = mockCards.reduce(
      (sum, card) => sum + card.features.length,
      0
    );
    expect(bullets).toHaveLength(totalFeatures);
  });

  it('should handle empty cards array', () => {
    render(<Prices service="depannage" cards={[]} />);

    const component = screen.getByRole('region');
    expect(component).toBeInTheDocument();
  });
});
