/**
 * Service de monitoring et tracking des erreurs avec Sentry
 */

import * as Sentry from '@sentry/react';
import { env } from '@/core/config/env';

// ===== TYPES =====
interface MonitoringConfig {
  enabled: boolean;
  dsn: string;
  environment: string;
  release?: string;
  tracesSampleRate: number;
  replaysSessionSampleRate: number;
  replaysOnErrorSampleRate: number;
}

// ===== CONFIGURATION =====
/**
 * Configure Sentry selon l'environnement
 */
function getMonitoringConfig(): MonitoringConfig {
  // Activer uniquement en production ET si DSN configuré
  const enabled = env.isProduction && !!env.sentryDsn;

  return {
    enabled,
    dsn: env.sentryDsn,
    environment: env.isProduction ? 'production' : 'development',
    
    // Version de l'app (optionnel, utile pour tracking)
    release: `buzztech@${import.meta.env.VITE_APP_VERSION || 'unknown'}`,

    // Performance Monitoring
    // 1.0 = tracker 100% des transactions (réduire en prod si trop de traffic)
    tracesSampleRate: env.isProduction ? 0.1 : 1.0,

    // Session Replay
    // Enregistre 10% des sessions normales
    replaysSessionSampleRate: env.isProduction ? 0.1 : 0,
    
    // Enregistre 100% des sessions avec erreurs
    replaysOnErrorSampleRate: 1.0,
  };
}

// ===== INITIALISATION =====
/**
 * Initialise Sentry avec la configuration appropriée
 * À appeler au démarrage de l'application
 */
export function initMonitoring(): void {
  const config = getMonitoringConfig();

  // Ne rien faire si monitoring désactivé
  if (!config.enabled) {
    if (env.isDevelopment) {
      console.log('📊 Monitoring désactivé en développement');
    } else {
      console.warn('⚠️  Sentry non configuré - Monitoring désactivé en production');
    }
    return;
  }

  try {
    Sentry.init({
      dsn: config.dsn,
      environment: config.environment,
      // Ne définir release que si on a une valeur
      ...(config.release && { release: config.release }),

      // Intégrations
      integrations: [
        // Browser Tracing pour performance monitoring
        Sentry.browserTracingIntegration(),
        
        // Session Replay pour voir ce que l'utilisateur faisait
        Sentry.replayIntegration({
          maskAllText: true, // Masquer le texte pour RGPD
          blockAllMedia: true, // Bloquer images/vidéos pour RGPD
        }),
      ],

      // Taux d'échantillonnage
      tracesSampleRate: config.tracesSampleRate,
      replaysSessionSampleRate: config.replaysSessionSampleRate,
      replaysOnErrorSampleRate: config.replaysOnErrorSampleRate,

      // Filtrer les erreurs non pertinentes
      beforeSend(event, hint) {
        // Ignorer les erreurs de extensions navigateur
        if (event.exception?.values?.[0]?.value?.includes('Extension')) {
          return null;
        }

        // Ignorer les erreurs réseau communes
        const error = hint.originalException as Error;
        if (error?.message?.includes('Network request failed')) {
          return null;
        }

        return event;
      },

      // Ignorer certaines erreurs courantes
      ignoreErrors: [
        // Erreurs de réseau
        'NetworkError',
        'Network request failed',
        'Failed to fetch',
        'Load failed',
        
        // Erreurs extensions navigateur
        'Extension context invalidated',
        'chrome-extension://',
        'moz-extension://',
        
        // Erreurs adblockers
        'ad blocker',
        'adblock',
        
        // Erreurs Safari
        'ResizeObserver loop',
        
        // Annulations utilisateur
        'cancelled',
        'AbortError',
      ],

      // Ne pas tracker certaines URLs
      denyUrls: [
        // Extensions navigateur
        /extensions\//i,
        /^chrome:\/\//i,
        /^moz-extension:\/\//i,
        
        // Scripts tiers problématiques
        /google-analytics\.com/i,
        /googletagmanager\.com/i,
      ],
    });

    console.log('✅ Sentry initialisé:', {
      environment: config.environment,
      release: config.release,
      tracesSampleRate: `${config.tracesSampleRate * 100}%`,
    });
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de Sentry:', error);
  }
}

// ===== HELPERS =====
/**
 * Capture une erreur manuellement
 * Usage: captureError(new Error('Something went wrong'), { extra: 'context' })
 */
export function captureError(
  error: Error,
  context?: Record<string, unknown>
): void {
  if (env.isDevelopment) {
    console.error('🐛 Erreur capturée:', error, context);
    return;
  }

  // Ne passer extra que si context est défini
  if (context) {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    Sentry.captureException(error);
  }
}

/**
 * Capture un message informatif
 * Usage: captureMessage('User clicked button', 'info')
 */
export function captureMessage(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info'
): void {
  if (env.isDevelopment) {
    console.log(`📝 [${level}]`, message);
    return;
  }

  Sentry.captureMessage(message, level);
}

/**
 * Ajoute un breadcrumb (fil d'Ariane pour debug)
 * Usage: addBreadcrumb('User navigated', { from: '/home', to: '/about' })
 */
export function addBreadcrumb(
  message: string,
  data?: Record<string, unknown>
): void {
  if (env.isDevelopment) {
    console.log('🍞 Breadcrumb:', message, data);
    return;
  }

  // Ne passer data que si défini
  Sentry.addBreadcrumb({
    message,
    ...(data && { data }),
    level: 'info',
  });
}

/**
 * Définit l'utilisateur courant (pour tracking)
 * Usage: setUser({ id: '123', email: 'user@example.com' })
 */
export function setUser(user: {
  id?: string;
  email?: string;
  username?: string;
} | null): void {
  if (env.isDevelopment) {
    console.log('👤 User set:', user);
    return;
  }

  Sentry.setUser(user);
}

/**
 * Ajoute des tags pour filtrer les erreurs
 * Usage: setTag('page', 'checkout')
 */
export function setTag(key: string, value: string): void {
  if (env.isDevelopment) {
    console.log(`🏷️  Tag: ${key} = ${value}`);
    return;
  }

  Sentry.setTag(key, value);
}

/**
 * Ajoute du contexte supplémentaire
 * Usage: setContext('payment', { method: 'card', amount: 100 })
 */
export function setContext(
  name: string,
  context: Record<string, unknown>
): void {
  if (env.isDevelopment) {
    console.log(`🔖 Context: ${name}`, context);
    return;
  }

  Sentry.setContext(name, context);
}

/**
 * Wrapper pour tracker les performances d'une fonction
 * Usage: 
 * await trackPerformance('fetchData', async () => {
 *   return await fetch('/api/data')
 * })
 */
export async function trackPerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  return await Sentry.startSpan(
    {
      name,
      op: 'function',
    },
    async () => {
      try {
        return await fn();
      } catch (error) {
        Sentry.captureException(error);
        throw error;
      }
    }
  );
}

// ===== EXPORT =====
export {
  // Ré-exporter Sentry pour cas avancés
  Sentry,
};