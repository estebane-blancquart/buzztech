import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './pages/home/home';
import Cleaning from './pages/presentation/cleaning';
import Configuration from './pages/presentation/configuration';
import Development from './pages/presentation/development';
import Repair from './pages/presentation/repair';
import './styles/transitions.scss';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/nettoyage" element={<Cleaning />} />
          <Route path="/conception" element={<Configuration />} />
          <Route path="/developpement" element={<Development />} />
          <Route path="/depannage" element={<Repair />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function AppRouter() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default AppRouter;
