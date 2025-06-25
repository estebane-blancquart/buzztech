import React from 'react';
import styles from './Header.module.scss';
import ScrollLink from '../scroller/scrollLink';
import { useToggle } from '@/core/hooks//useToggle';

interface NavItem {
  to: string;
  label: string;
}

const Header: React.FC = () => {
  const [isOpen, toggleOpen] = useToggle(false);

  const navItems: NavItem[] = [
    { to: '/depannage', label: 'Dépannage' },
    { to: '/configuration', label: 'Configuration' },
    { to: '/creation-web', label: 'Création Web' },
  ];

  const handleNavClick = () => {
    if (isOpen) toggleOpen();
  };

  return (
    <header className={styles.header}>
      <ScrollLink to="/" className={styles.logo}>
        BUZZTECH
      </ScrollLink>

      <button className={styles.toggle} onClick={toggleOpen}>
        ☰
      </button>

      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        {navItems.map((item) => (
          <ScrollLink 
            key={item.to}
            to={item.to} 
            onClick={handleNavClick}
          >
            {item.label}
          </ScrollLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;