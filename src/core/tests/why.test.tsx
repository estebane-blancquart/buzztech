import Why, { WhyPage } from '@/ui/modules/service-why/Why';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

// Wrapper pour React Router
const RouterWrapper = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => <BrowserRouter>{children}</BrowserRouter>;

// Mock data pour les tests
const mockChildren = [
  <WhyPage
    key="distance"
    title="À distance"
    points={['Point 1 distance', 'Point 2 distance']}
    icon="💻"
    landingDescription="Description à distance"
  />,
  <WhyPage
    key="atelier"
    title="À l'atelier"
    points={['Point 1 atelier', 'Point 2 atelier']}
    icon="🔧"
    landingDescription="Description atelier"
  />,
  <WhyPage
    key="domicile"
    title="À domicile"
    points={['Point 1 domicile', 'Point 2 domicile']}
    icon="🏠"
    landingDescription="Description domicile"
  />,
];

describe('Why Component', () => {
  it('should render the main title', () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    expect(screen.getByText('Nos interventions')).toBeInTheDocument();
  });

  it('should start at landing page by default', () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    // Should show landing descriptions
    expect(screen.getByText('Description à distance')).toBeInTheDocument();
    expect(screen.getByText('Description atelier')).toBeInTheDocument();
    expect(screen.getByText('Description domicile')).toBeInTheDocument();
  });

  it('should render navigation buttons for each service', () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    // Use more specific selectors to avoid conflicts with landing content
    expect(screen.getByRole('tab', { name: /À distance/ })).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: /À l'atelier/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /À domicile/ })).toBeInTheDocument();
  });

  it('should navigate to detail page when clicking nav button', async () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    // Click on "À distance" nav button
    fireEvent.click(screen.getByRole('tab', { name: /À distance/ }));

    // Should show detail points (not landing description)
    await waitFor(() => {
      expect(screen.getByText('Point 1 distance')).toBeInTheDocument();
      expect(screen.getByText('Point 2 distance')).toBeInTheDocument();
    });

    // Should not show landing descriptions anymore
    expect(
      screen.queryByText('Description à distance')
    ).not.toBeInTheDocument();
  });

  it('should navigate to detail page when clicking "voir plus"', async () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    // Click on "Voir plus →" button for first service (regex pour supporter les variations)
    const voirPlusButtons = screen.getAllByText(/Voir plus/i);
    expect(voirPlusButtons.length).toBeGreaterThan(0);

    if (voirPlusButtons[0]) {
      fireEvent.click(voirPlusButtons[0]);
    }
    // Should show detail points
    await waitFor(() => {
      expect(screen.getByText('Point 1 distance')).toBeInTheDocument();
      expect(screen.getByText('Point 2 distance')).toBeInTheDocument();
    });
  });

  it('should update main button state when navigating', async () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    // Initially, main button should be pressed (on landing page)
    const mainButton = screen.getByLabelText(/Retour à la vue d'ensemble/);
    expect(mainButton).toHaveAttribute('aria-pressed', 'true');

    // Navigate to detail page
    fireEvent.click(screen.getByRole('tab', { name: /À distance/ }));

    await waitFor(() => {
      expect(screen.getByText('Point 1 distance')).toBeInTheDocument();
    });

    // Main button should no longer be pressed
    expect(mainButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should highlight active navigation button', () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    // Main title should be active initially (landing page)
    const mainButton = screen.getByText('Nos interventions');
    expect(mainButton).toHaveAttribute('aria-pressed', 'true');

    // Other buttons should not be active
    const distanceButton = screen.getByRole('tab', { name: /À distance/ });
    expect(distanceButton).toHaveAttribute('aria-selected', 'false');
  });

  it('should update active state when navigating', async () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    // Click on "À distance"
    const distanceButton = screen.getByRole('tab', { name: /À distance/ });
    fireEvent.click(distanceButton);

    // Wait for navigation to complete
    await waitFor(() => {
      expect(distanceButton).toHaveAttribute('aria-selected', 'true');
    });

    // Main title should no longer be active
    const mainButton = screen.getByText('Nos interventions');
    expect(mainButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should render contact button in detail view', async () => {
    render(
      <RouterWrapper>
        <Why title="Nos interventions">{mockChildren}</Why>
      </RouterWrapper>
    );

    // Navigate to detail page
    fireEvent.click(screen.getByRole('tab', { name: /À distance/ }));

    // Should show contact button
    await waitFor(() => {
      expect(screen.getByText('Contactez-nous')).toBeInTheDocument();
    });
  });

  it('should handle empty children gracefully', () => {
    render(
      <RouterWrapper>
        <Why title="Test Title">{[]}</Why>
      </RouterWrapper>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    // Should not crash with empty children
  });
});