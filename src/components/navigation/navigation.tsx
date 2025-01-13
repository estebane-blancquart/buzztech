import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.scss';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={styles.openNavigation} onClick={toggleMenu}>
        <img src="icons/open-burger.svg" alt="Ouvrir le menu" />
      </div>

      <div className={`${styles.navigation} ${isMenuOpen ? styles.open : ''}`}>
        <Link to="/depannage" className={styles.pageLink} onClick={closeMenu}>DÉPANNAGE</Link>
        <Link to="/conception" className={styles.pageLink} onClick={closeMenu}>CONCEPTION</Link>
        <Link to="/developpement" className={styles.pageLink} onClick={closeMenu}>DÉVELOPPEMENT</Link>
        <Link to="/nettoyage" className={styles.pageLink} onClick={closeMenu}>NETTOYAGE</Link>
      </div>

      {isMenuOpen && <div className={styles.closeNavigation} onClick={closeMenu}></div>}
    </>
  );
}

export default Navigation;