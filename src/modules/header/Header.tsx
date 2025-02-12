import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

function Header() {
  const [isMobileNav, setIsMobileNav] = useState(false);
  const showMobileNav = () => setIsMobileNav(true);
  const hideMobileNav = () => setIsMobileNav(false);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/" aria-label="Accueil" className={styles.logo}>BUZZTECH</Link>
      </h1>

      <button className={styles.showMobilNav} onClick={showMobileNav} aria-label="Ouvrir le menu">☰</button>

      <nav className={isMobileNav ? styles.mobileNav : styles.desktopNav} >
        <ul>
          <li><Link to="/depannage" className={styles.pageLink} onClick={hideMobileNav}>DÉPANNAGE</Link></li>
          <li><Link to="/conception" className={styles.pageLink} onClick={hideMobileNav}>CONCEPTION</Link></li>
          <li><Link to="/developpement" className={styles.pageLink} onClick={hideMobileNav}>DÉVELOPPEMENT</Link></li>
          <li><Link to="/nettoyage" className={styles.pageLink} onClick={hideMobileNav}>NETTOYAGE</Link></li>
        </ul>
      </nav>

      {isMobileNav && <div className={styles.hideMobileNav} onClick={hideMobileNav}></div>}
    </header>
  );
}

export default Header;
