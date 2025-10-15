import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './Layout';

const Home = lazy(() => import('@/ui/pages/Home'));
const Depannage = lazy(() => import('@/ui/pages/Depannage'));
const Configuration = lazy(() => import('@/ui/pages/Configuration'));
const CreationWeb = lazy(() => import('@/ui/pages/CreationWeb'));
const Error = lazy(() => import('@/ui/pages/Error'));

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Chargement...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="depannage" element={<Depannage />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="creation-web" element={<CreationWeb />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;