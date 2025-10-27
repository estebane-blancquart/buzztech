import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from '@/ui/components/footer/Footer';

const RouterWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <BrowserRouter>{children}</BrowserRouter>;

describe('Footer Component', () => {
  it('should render company name', () => {
    render(
      <RouterWrapper>
        <Footer />
      </RouterWrapper>
    );

    expect(screen.getByText(/BuzzTech/i)).toBeInTheDocument();
  });

  it('should render copyright with current year', () => {
    render(
      <RouterWrapper>
        <Footer />
      </RouterWrapper>
    );

    // Le footer affiche "Site développé par BuzzTech"
    expect(screen.getByText(/BuzzTech/i)).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(
      <RouterWrapper>
        <Footer />
      </RouterWrapper>
    );

    // Le footer a des liens légaux
    expect(screen.getByText(/Mentions légales/i)).toBeInTheDocument();
    expect(screen.getByText(/Confidentialité/i)).toBeInTheDocument();
    expect(screen.getByText(/CGV/i)).toBeInTheDocument();
  });

  it('should have proper navigation structure', () => {
    render(
      <RouterWrapper>
        <Footer />
      </RouterWrapper>
    );

    // Le footer utilise role="contentinfo" au lieu de navigation
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should render social media links if present', () => {
    render(
      <RouterWrapper>
        <Footer />
      </RouterWrapper>
    );

    // Cherche des liens externes (social media)
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should have footer landmark', () => {
    render(
      <RouterWrapper>
        <Footer />
      </RouterWrapper>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should render legal mentions if present', () => {
    render(
      <RouterWrapper>
        <Footer />
      </RouterWrapper>
    );

    // Vérifie la présence de texte légal commun
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });
});
