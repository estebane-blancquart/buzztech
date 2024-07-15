import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router.tsx'
import './styles/mixins.scss'
import './styles/reset.scss'
import './styles/variables.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
