import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './Layout';

const Home = lazy(() => import('@/ui/pages/Home'));
const Depannage = lazy(() => import('@/ui/pages/Depannage'));
const Configuration = lazy(() => import('@/ui/pages/Configuration'));
const CreationWeb = lazy(() => import('@/ui/pages/CreationWeb'));
const MentionsLegales = lazy(() => import('@/ui/pages/MentionsLegales'));
const PolitiqueConfidentialite = lazy(
  () => import('@/ui/pages/PolitiqueConfidentialite')
);
const ConditionsGenerales = lazy(
  () => import('@/ui/pages/ConditionsGenerales')
);
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
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route
              path="politique-confidentialite"
              element={<PolitiqueConfidentialite />}
            />
            <Route
              path="conditions-generales"
              element={<ConditionsGenerales />}
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
