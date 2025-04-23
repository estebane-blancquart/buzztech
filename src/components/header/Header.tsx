import React, { useState } from 'react';
import styles from './header.module.scss';
import Link from '../link/Link';



function Header() {
  const [isMobileNav, setIsMobileNav] = useState(false);

  const showMobileNav = () => setIsMobileNav(true);

  const handleLinkClick = () => {
    setIsMobileNav(false);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>

      <Link to="/" className={styles.logo}>BUZZTECH</Link>
      </h1>

      <div className={styles.showMobilNav} onClick={showMobileNav} aria-label="Ouvrir le menu">
        ☰
      </div>

      <nav className={isMobileNav ? styles.mobileNav : styles.desktopNav}>
        <ul>
          <li><Link to="depannage" className={styles.pageLink} onClick={handleLinkClick}>DEPANNAGE</Link></li>
          <li><Link to="conception" className={styles.pageLink} onClick={handleLinkClick}>CONCEPTION</Link></li>
          <li><Link to="developpement" className={styles.pageLink} onClick={handleLinkClick}>DÉVELOPPEMENT</Link></li>
        </ul>
      </nav>

      {isMobileNav && <div className={styles.hideMobileNav} onClick={handleLinkClick}></div>}
    </header>
  );
}

export default Header;
