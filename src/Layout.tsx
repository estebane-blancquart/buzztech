import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/ui/components/header/Header';
import Footer from '@/ui/components/footer/Footer';
import Scroller from '@/ui/components/scroller/scroller';
import { useSEO } from '@/core/hooks/useSEO'; // ← Ajoutez cet import

const Layout: React.FC = () => {
  useSEO(); // ← Ajoutez cette ligne

  return (
    <div className="layout">
      <Header />

      <main>
        <Scroller>
          <Outlet />
        </Scroller>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
