// components/Header/Header.tsx
import React, { useState } from 'react';
import styles from './Header.module.scss';
import ScrollLink from '../scroller/scrollLink';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <ScrollLink to="/" className={styles.logo}>
        BUZZTECH
      </ScrollLink>

      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <ScrollLink to="/depannage" onClick={() => setIsOpen(false)}>
          Dépannage
        </ScrollLink>
        <ScrollLink to="/configuration" onClick={() => setIsOpen(false)}>
          Configuration
        </ScrollLink>
        <ScrollLink to="/creation-web" onClick={() => setIsOpen(false)}>
          Création Web
        </ScrollLink>
      </nav>
    </header>
  );
};

export default Header;
