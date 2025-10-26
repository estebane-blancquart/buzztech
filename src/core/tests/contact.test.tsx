import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from '@/ui/modules/home-contact/Contact';

// Mock fetch pour Formspree
global.fetch = vi.fn();

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render contact form title', () => {
    render(<Contact />);

    expect(screen.getByText(/contactez-nous/i)).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service concerné/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('should have submit button', () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /envoyer/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should validate required fields', () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /envoyer/i });
    
    // Soumettre sans remplir
    fireEvent.click(submitButton);

    // Fetch ne devrait pas être appelé
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should have proper input types', () => {
    render(<Contact />);

    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/téléphone/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });

  it('should have RGPD checkbox', () => {
    render(<Contact />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('required');
  });

  it('should have service select with options', () => {
    render(<Contact />);

    const select = screen.getByLabelText(/service concerné/i);
    expect(select).toBeInTheDocument();
    
    // Vérifier les options
    expect(screen.getByText(/Dépannage informatique/i)).toBeInTheDocument();
    expect(screen.getByText(/Configuration PC/i)).toBeInTheDocument();
    expect(screen.getByText(/Création site web/i)).toBeInTheDocument();
  });
});