import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/ui/components/header/Header';
import Footer from '@/ui/components/footer/Footer';
import Scroller from '@/ui/components/scroller/scroller';
import { useSEO } from '@/core/hooks/useSEO';
import CookieBanner, {
  useGTMConsent,
} from './ui/components/cookie-banner/CookieBanner';

const Layout: React.FC = () => {
  useSEO();
  useGTMConsent();

  return (
    <div className="layout">
      <Header />

      <main id="main-content">
        <Scroller>
          <Outlet />
        </Scroller>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
