import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/home/Home';
import Repair from './pages/repair/Repair';
import Configuration from './pages/configuration/Configuration';
import Creation from './pages/creation/Creation';
import Test from './pages/test/Test';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="depannage" element={<Repair />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="creation" element={<Creation />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
