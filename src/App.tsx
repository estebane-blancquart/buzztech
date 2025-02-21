import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './Router';
import "./theme/reset.scss";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
