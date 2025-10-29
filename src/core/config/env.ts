/**
 * Configuration centralisée des variables d'environnement
 * Avec validation au démarrage pour éviter les erreurs en prod
 */

import { logger } from '@/core/utils/logger';

// ===== TYPES =====
interface EnvConfig {
  // Site
  siteUrl: string;
  siteName: string;

  // Services externes
  gtmId: string;
  sentryDsn: string;

  // Contact
  whatsappNumber: string;

  // API (pour plus tard)
  apiUrl: string;

  // Mode
  isDevelopment: boolean;
  isProduction: boolean;
}

// ===== VALIDATION =====
/**
 * Récupère une variable d'environnement avec validation
 */
function getEnvVar(key: string, required: boolean = false): string {
  const value = import.meta.env[key];

  if (required && !value) {
    throw new Error(
      `❌ Variable d'environnement manquante: ${key}\n` +
        `Vérifiez votre fichier .env et assurez-vous que ${key} est défini.`
    );
  }

  return value ?? '';
}

/**
 * Valide le format d'une URL
 */
function validateUrl(url: string, name: string): void {
  if (!url) return; // OK si vide (optionnel)

  try {
    new URL(url);
  } catch {
    throw new Error(
      `❌ ${name} n'est pas une URL valide: ${url}\n` +
        `Format attendu: https://example.com`
    );
  }
}

/**
 * Valide le format d'un ID GTM
 */
function validateGtmId(gtmId: string): void {
  if (!gtmId) return; // OK si vide (optionnel)

  if (!gtmId.startsWith('GTM-')) {
    throw new Error(
      `❌ VITE_GTM_ID doit commencer par 'GTM-': ${gtmId}\n` +
        `Format attendu: GTM-XXXXXXX`
    );
  }
}

/**
 * Valide le format d'un DSN Sentry
 */
function validateSentryDsn(dsn: string): void {
  if (!dsn) return; // OK si vide (optionnel)

  if (!dsn.startsWith('https://')) {
    throw new Error(
      `❌ VITE_SENTRY_DSN doit être une URL HTTPS: ${dsn}\n` +
        `Format attendu: https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`
    );
  }

  if (!dsn.includes('ingest.sentry.io')) {
    logger.warn(
      'VITE_SENTRY_DSN ne semble pas être un DSN Sentry valide',
      { dsn },
      'env'
    );
  }
}

/**
 * Valide le format d'un numéro WhatsApp
 */
function validateWhatsappNumber(number: string): void {
  if (!number) return; // OK si vide (optionnel)

  // Doit être que des chiffres
  if (!/^\d+$/.test(number)) {
    throw new Error(
      `❌ VITE_WHATSAPP_NUMBER doit contenir uniquement des chiffres: ${number}\n` +
        `Format attendu: 33660352267 (sans espaces ni +)`
    );
  }

  // Doit commencer par un code pays valide (1-999)
  const countryCode = number.slice(0, 3);
  if (parseInt(countryCode) < 1) {
    throw new Error(
      `❌ VITE_WHATSAPP_NUMBER doit commencer par un code pays: ${number}\n` +
        `Exemple: 33660352267 pour la France`
    );
  }
}

// ===== CONFIGURATION =====
/**
 * Charge et valide toutes les variables d'environnement
 */
function loadEnvConfig(): EnvConfig {
  // Mode
  const mode = import.meta.env.MODE;
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  // Site
  const siteUrl = getEnvVar('VITE_SITE_URL', true);
  const siteName = getEnvVar('VITE_SITE_NAME', true);

  // Services (optionnels)
  const gtmId = getEnvVar('VITE_GTM_ID');
  const sentryDsn = getEnvVar('VITE_SENTRY_DSN');

  // Contact
  const whatsappNumber = getEnvVar('VITE_WHATSAPP_NUMBER', true);

  // API (optionnel)
  const apiUrl = getEnvVar('VITE_API_URL');

  // Validations
  validateUrl(siteUrl, 'VITE_SITE_URL');
  validateUrl(apiUrl, 'VITE_API_URL');
  validateGtmId(gtmId);
  validateSentryDsn(sentryDsn);
  validateWhatsappNumber(whatsappNumber);

  // Warnings en production
  if (isProduction) {
    if (!gtmId) {
      logger.warn('VITE_GTM_ID non configuré - Analytics désactivés', undefined, 'env');
    }
    if (!sentryDsn) {
      logger.warn(
        "VITE_SENTRY_DSN non configuré - Monitoring d'erreurs désactivé",
        undefined,
        'env'
      );
    }
  }

  return {
    siteUrl,
    siteName,
    gtmId,
    sentryDsn,
    whatsappNumber,
    apiUrl,
    isDevelopment,
    isProduction,
  };
}

// ===== EXPORT =====
/**
 * Configuration chargée et validée au démarrage
 * Utilisation: import { env } from '@/core/config/env'
 */
export const env = loadEnvConfig();

/**
 * Log de la config au démarrage (sans les secrets)
 */
if (env.isDevelopment) {
  logger.info('Environment configuration', {
    mode: import.meta.env.MODE,
    siteUrl: env.siteUrl,
    siteName: env.siteName,
    gtmId: env.gtmId ? '✅ Configuré' : '❌ Non configuré',
    sentryDsn: env.sentryDsn ? '✅ Configuré' : '❌ Non configuré',
    whatsappNumber: env.whatsappNumber ? '✅ Configuré' : '❌ Non configuré',
    apiUrl: env.apiUrl || '❌ Non configuré',
  }, 'env');
}