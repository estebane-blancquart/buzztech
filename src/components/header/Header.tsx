import React, { useState } from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';



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
          <li><Link to="configuration" className={styles.pageLink} onClick={handleLinkClick}>CONFIGURATION</Link></li>
          <li><Link to="creation" className={styles.pageLink} onClick={handleLinkClick}>CREATION WEB</Link></li>
        </ul>
      </nav>

      {isMobileNav && <div className={styles.hideMobileNav} onClick={handleLinkClick}></div>}
    </header>
  );
}

export default Header;
