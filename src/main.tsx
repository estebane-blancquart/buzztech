// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import '@/theme/reset.scss';
import '@/theme/module.scss';
import ErrorBoundary from './ui/components/error-boundary/ErrorBoundary';

// ===== CONFIGURATION =====
import '@/core/config/env';

// ===== MONITORING =====
import { initMonitoring } from '@/core/services/monitoring';

// Initialiser Sentry AVANT le rendu de l'app
initMonitoring();

// ===== APP =====
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </StrictMode>
);