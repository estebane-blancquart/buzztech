import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router.tsx';

import './styles/mixins.scss';
import './styles/reset.scss';
import './styles/variables.scss';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("L'élément 'root' est introuvable dans le DOM.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
