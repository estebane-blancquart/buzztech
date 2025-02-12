import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/home/Home';
import Repair from './pages/repair/Repair';
import Configuration from './pages/configuration/Configuration';
import Development from './pages/development/Development';
import Cleaning from './pages/cleaning/Cleaning';


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="depannage" element={<Repair />} />
          <Route path="conception" element={<Configuration />} />
          <Route path="developpement" element={<Development />} />
          <Route path="nettoyage" element={<Cleaning />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
