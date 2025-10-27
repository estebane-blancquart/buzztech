import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import styles from './ErrorBoundary.module.scss';
import { env } from '@/core/config/env';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  eventId: string | null;
}

/**
 * Error Boundary avec intégration Sentry
 * Capture toutes les erreurs React et les envoie à Sentry
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log en console en dev
    if (env.isDevelopment) {
      console.error('🔴 ErrorBoundary caught an error:', error, errorInfo);
    }

    // Envoyer à Sentry
    Sentry.withScope(scope => {
      // Ajouter contexte React
      scope.setContext('react', {
        componentStack: errorInfo.componentStack,
      });

      // Capturer l'erreur et récupérer l'event ID
      const eventId = Sentry.captureException(error);

      // Stocker l'event ID dans le state pour le feedback utilisateur
      this.setState({
        errorInfo,
        eventId,
      });
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null,
    });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  handleReportFeedback = (): void => {
    if (this.state.eventId) {
      // Ouvrir le formulaire de feedback Sentry
      Sentry.showReportDialog({
        eventId: this.state.eventId,
        title: 'Signaler un problème',
        subtitle: "Vous pouvez nous aider en décrivant ce qui s'est passé.",
        subtitle2: 'Nous vous recontacterons si besoin.',
        labelName: 'Nom',
        labelEmail: 'Email',
        labelComments: "Que s'est-il passé ?",
        labelClose: 'Fermer',
        labelSubmit: 'Envoyer',
        errorGeneric:
          "Une erreur est survenue lors de l'envoi du rapport. Veuillez réessayer.",
        errorFormEntry:
          'Certains champs sont invalides. Merci de les corriger.',
        successMessage: 'Merci pour votre retour !',
      });
    }
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      const { error, errorInfo, eventId } = this.state;

      return (
        <div className={styles.errorBoundary}>
          <div className={styles.content}>
            <div className={styles.icon}>⚠️</div>

            <h1 className={styles.title}>Oups, une erreur est survenue</h1>

            <p className={styles.message}>
              Nous sommes désolés pour ce désagrément. L'erreur a été
              automatiquement signalée à notre équipe.
            </p>

            <div className={styles.actions}>
              <button
                onClick={this.handleReset}
                className={styles.btnPrimary}
                aria-label="Réessayer"
              >
                Réessayer
              </button>

              <button
                onClick={this.handleReload}
                className={styles.btnSecondary}
                aria-label="Recharger la page"
              >
                Recharger la page
              </button>

              {env.isProduction && eventId && (
                <button
                  onClick={this.handleReportFeedback}
                  className={styles.btnSecondary}
                  aria-label="Signaler le problème"
                >
                  Signaler le problème
                </button>
              )}
            </div>

            {env.isDevelopment && error && (
              <details className={styles.errorDetails}>
                <summary>Détails techniques (dev only)</summary>
                <div className={styles.errorStack}>
                  <strong>Error:</strong>
                  <pre>{error.toString()}</pre>

                  {error.stack && (
                    <>
                      <strong>Stack:</strong>
                      <pre>{error.stack}</pre>
                    </>
                  )}

                  {errorInfo && (
                    <>
                      <strong>Component Stack:</strong>
                      <pre>{errorInfo.componentStack}</pre>
                    </>
                  )}

                  {eventId && (
                    <>
                      <strong>Sentry Event ID:</strong>
                      <pre>{eventId}</pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
