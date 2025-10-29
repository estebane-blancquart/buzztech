/**
 * Logger professionnel pour BuzzTech
 * Remplace console.log/error/warn avec un système structuré
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data: unknown | undefined;
  timestamp: string;
  context: string | undefined;
}

class Logger {
  private isDevelopment: boolean;
  private logs: LogEntry[] = [];
  private maxLogs = 100; // Garde les 100 derniers logs en mémoire

  constructor() {
    this.isDevelopment = import.meta.env.DEV ?? false;
  }

  private log(level: LogLevel, message: string, data?: unknown, context?: string): void {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      context,
    };

    // Stocker en mémoire (circular buffer)
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // En développement, afficher dans la console
    if (this.isDevelopment) {
      const prefix = `[${entry.timestamp}] [${level.toUpperCase()}]${context ? ` [${context}]` : ''}`;
      
      switch (level) {
        case 'debug':
        case 'info':
          // eslint-disable-next-line no-console
          console.log(prefix, message, data ?? '');
          break;
        case 'warn':
          // eslint-disable-next-line no-console
          console.warn(prefix, message, data ?? '');
          break;
        case 'error':
          // eslint-disable-next-line no-console
          console.error(prefix, message, data ?? '');
          break;
      }
    }

    // En production, on pourrait envoyer à un service externe (Sentry, LogRocket, etc.)
    if (!this.isDevelopment && level === 'error') {
      // TODO: Envoyer les erreurs à un service de monitoring
      // Exemple: Sentry.captureException(data);
    }
  }

  /**
   * Log de debug (seulement en dev)
   */
  debug(message: string, data?: unknown, context?: string): void {
    this.log('debug', message, data, context);
  }

  /**
   * Log d'information
   */
  info(message: string, data?: unknown, context?: string): void {
    this.log('info', message, data, context);
  }

  /**
   * Log d'avertissement
   */
  warn(message: string, data?: unknown, context?: string): void {
    this.log('warn', message, data, context);
  }

  /**
   * Log d'erreur
   */
  error(message: string, data?: unknown, context?: string): void {
    this.log('error', message, data, context);
  }

  /**
   * Récupère tous les logs en mémoire (utile pour debug)
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Vide les logs en mémoire
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Récupère les logs d'un certain niveau
   */
  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }
}

// Export d'une instance singleton
export const logger = new Logger();

// Export de la classe pour les tests
export { Logger };
export type { LogLevel, LogEntry };