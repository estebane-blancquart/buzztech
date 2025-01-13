import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Cleaning from './pages/presentation/cleaning';
import Configuration from './pages/presentation/configuration';
import Development from './pages/presentation/development';
import Repair from './pages/presentation/repair';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nettoyage" element={<Cleaning />} />
        <Route path="/conception" element={<Configuration />} />
        <Route path="/developpement" element={<Development />} />
        <Route path="/depannage" element={<Repair />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
