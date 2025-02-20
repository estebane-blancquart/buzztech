import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

const scrollToTop = () => document.documentElement.scrollTo({ top: 0});


function Header() {
  const [isMobileNav, setIsMobileNav] = useState(false);

  const showMobileNav = () => setIsMobileNav(true);

  const handleLinkClick = () => {
    setIsMobileNav(false);
    scrollToTop();
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/" onClick={scrollToTop} aria-label="Accueil" className={styles.logo}>
          BUZZTECH
        </Link>
      </h1>

      <div className={styles.showMobilNav} onClick={showMobileNav} aria-label="Ouvrir le menu">
        ☰
      </div>

      <nav className={isMobileNav ? styles.mobileNav : styles.desktopNav}>
        <ul>
          <li><Link to="/depannage" className={styles.pageLink} onClick={handleLinkClick}>DÉPANNAGE</Link></li>
          <li><Link to="/conception" className={styles.pageLink} onClick={handleLinkClick}>CONCEPTION</Link></li>
          <li><Link to="/developpement" className={styles.pageLink} onClick={handleLinkClick}>DÉVELOPPEMENT</Link></li>
          <li><Link to="/nettoyage" className={styles.pageLink} onClick={handleLinkClick}>NETTOYAGE</Link></li>
        </ul>
      </nav>

      {isMobileNav && <div className={styles.hideMobileNav} onClick={handleLinkClick}></div>}
    </header>
  );
}

export default Header;
