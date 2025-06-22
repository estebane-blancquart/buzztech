import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import '@/theme/reset.scss'
import '@/theme/module.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)