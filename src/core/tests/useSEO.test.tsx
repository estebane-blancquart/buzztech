import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSEO } from '@/core/hooks/useSEO';

// Mock useLocation
const mockUseLocation = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: (): { pathname: string } => mockUseLocation(),
  };
});

// Create a wrapper that doesn't interfere with our mocked useLocation
const TestWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <>{children}</>;
};

describe('useSEO', () => {
  beforeEach((): void => {
    // Reset DOM
    document.title = '';
    const existingMetas = document.querySelectorAll(
      'meta[name], meta[property], link[rel="canonical"], script[type="application/ld+json"]'
    );
    existingMetas.forEach((meta): void => meta.remove());

    // Reset mock
    vi.clearAllMocks();
  });

  it('should set title for home page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    renderHook(() => useSEO(), { wrapper: TestWrapper });

    expect(document.title).toContain('BuzzTech - Solutions Informatiques');
  });

  it('should set title for depannage page', () => {
    mockUseLocation.mockReturnValue({ pathname: '/depannage' });

    renderHook(() => useSEO(), { wrapper: TestWrapper });

    expect(document.title).toContain('Dépannage Informatique Saint-Étienne');
  });

  it('should set meta description', () => {
    mockUseLocation.mockReturnValue({ pathname: '/depannage' });

    renderHook(() => useSEO(), { wrapper: TestWrapper });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription?.getAttribute('content')).toContain('Saint-Étienne');
  });

  it('should set Open Graph tags', () => {
    mockUseLocation.mockReturnValue({ pathname: '/configuration' });

    renderHook(() => useSEO(), { wrapper: TestWrapper });

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    const ogUrl = document.querySelector('meta[property="og:url"]');

    expect(ogTitle).toBeInTheDocument();
    expect(ogDescription).toBeInTheDocument();
    expect(ogUrl).toBeInTheDocument();
    expect(ogUrl?.getAttribute('content')).toBe(
      'https://www.buzztech-informatique.fr/configuration'
    );
  });

  it('should set Twitter Card tags', () => {
    mockUseLocation.mockReturnValue({ pathname: '/creation-web' });

    renderHook(() => useSEO(), { wrapper: TestWrapper });

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');

    expect(twitterCard).toBeInTheDocument();
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
    expect(twitterTitle).toBeInTheDocument();
  });

  it('should add JSON-LD structured data', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    renderHook(() => useSEO(), { wrapper: TestWrapper });

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    expect(jsonLd).toBeInTheDocument();

    const jsonContent = JSON.parse(jsonLd?.textContent ?? '{}');
    expect(jsonContent['@type']).toBe('LocalBusiness');
    expect(jsonContent.name).toBe('BuzzTech');
  });

  it('should set canonical URL', () => {
    mockUseLocation.mockReturnValue({ pathname: '/depannage' });

    renderHook(() => useSEO(), { wrapper: TestWrapper });

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeInTheDocument();
    expect(canonical?.getAttribute('href')).toBe(
      'https://www.buzztech-informatique.fr/depannage'
    );
  });

  it('should fallback to home data for unknown routes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/unknown-route' });

    renderHook(() => useSEO(), { wrapper: TestWrapper });

    expect(document.title).toContain('BuzzTech - Solutions Informatiques');
  });

  it('should update when pathname changes', () => {
    mockUseLocation.mockReturnValue({ pathname: '/' });

    const { rerender } = renderHook(() => useSEO(), { wrapper: TestWrapper });

    expect(document.title).toContain('Solutions Informatiques');

    // Change pathname
    mockUseLocation.mockReturnValue({ pathname: '/depannage' });
    rerender();

    expect(document.title).toContain('Dépannage Informatique');
  });
});
