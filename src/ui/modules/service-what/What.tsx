import React, { useEffect, useRef } from 'react';
import styles from './what.module.scss';

interface WhatProps {
  badge: string;
  title: string;
  subtitle: string;
  scrollText?: string;
}

const What: React.FC<WhatProps> = ({
  badge,
  title,
  subtitle,
  scrollText = 'Découvrir le service',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth',
    });
  };

  const goToNextModule = () => {
    console.log('🎯 What: Tentative de navigation vers module suivant');

    window.scrollTo({
      top: window.innerHeight,
      behavior: 'instant', // Instant pour le clavier
    });

    // Focus automatique sur le module suivant
    setTimeout(() => {
      console.log('🔍 What: Recherche du module suivant...');

      const nextModuleElement = document
        .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        ?.closest('[tabindex="0"]') as HTMLElement;

      console.log('📍 What: Élément trouvé:', nextModuleElement);

      if (nextModuleElement) {
        console.log('✅ What: Focus sur:', nextModuleElement);
        nextModuleElement.focus();
      } else {
        console.log('❌ What: Aucun élément focusable trouvé');
      }
    }, 100);
  };

  useEffect(() => {
    // Focus automatique sur What au chargement de la page
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.focus();
      }
    }, 500); // Petit délai pour laisser la page se charger

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('⌨️ What: Touche pressée:', e.key);

      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextModule();
      }
    };

    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.what}
      tabIndex={0}
      role="region"
      aria-label="Présentation du service"
    >
      <div className={styles.badge}>{badge}</div>

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.subtitle}>{subtitle}</p>

      <div className={styles.scrollIndicator} onClick={handleScrollClick}>
        <span>{scrollText}</span>
        <div className={styles.arrow}>↓</div>
      </div>
    </div>
  );
};

export default What;
