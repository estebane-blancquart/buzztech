import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Depannage from './pages/Depannage';
import Configuration from './pages/Configuration';
import CreationWeb from './pages/CreationWeb';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="depannage" element={<Depannage />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="creation-web" element={<CreationWeb />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;