import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '@/ui/pages/Home';
import Depannage from '@/ui/pages/Depannage';
import Configuration from '@/ui/pages/Configuration';
import CreationWeb from '@/ui/pages/CreationWeb';

function Router(): JSX.Element {
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
