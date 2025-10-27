// src/Router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './Layout';

// ===== LAZY LOADING =====
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

// ===== FALLBACK COMPONENT =====
const LoadingFallback = (): JSX.Element => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      color: '#a367ff',
    }}
    aria-live="polite"
    aria-busy="true"
  >
    Chargement...
  </div>
);

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
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