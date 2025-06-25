import React from 'react';
import styles from './Header.module.scss';
import ScrollLink from '../scroller/scrollLink';
import { useToggle } from '@/core/hooks/useToggle';

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

  // Gestion navigation clavier
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleOpen();
    }
    if (event.key === 'Escape' && isOpen) {
      toggleOpen();
    }
  };

  return (
    <header className={styles.header}>
      <ScrollLink to="/" className={styles.logo}>
        BUZZTECH
      </ScrollLink>

      <button
        className={styles.toggle}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        ☰
      </button>

      <nav
        id="main-navigation"
        className={`${styles.nav} ${isOpen ? styles.open : ''}`}
        role="navigation"
        aria-label="Navigation principale"
      >
        {navItems.map(item => (
          <ScrollLink key={item.to} to={item.to} onClick={handleNavClick}>
            {item.label}
          </ScrollLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
