import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/ui/components/header/Header';
import Footer from '@/ui/components/footer/Footer';
import Scroller from '@/ui/components/scroller/scroller';

const Layout: React.FC = () => {
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
