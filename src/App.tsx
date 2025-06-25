import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './Router';
import '@/theme/reset.scss';
import '@/theme/module.scss';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
