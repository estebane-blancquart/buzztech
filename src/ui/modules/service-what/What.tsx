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

  const handleScrollClick = (): void => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth',
    });
  };

  const goToNextModule = (): void => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'instant', // Instant pour le clavier
    });

    // Focus automatique sur le module suivant
    setTimeout(() => {
      const nextModuleElement = document
        .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        ?.closest('[tabindex="0"]') as HTMLElement;

      if (nextModuleElement) {
        nextModuleElement.focus();
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

    return (): void => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
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

    return (): void => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles['what']}
      tabIndex={0}
      role="region"
      aria-label="Présentation du service"
    >
      <div className={styles['badge']}>{badge}</div>

      <h1 className={styles['title']}>{title}</h1>

      <p className={styles['subtitle']}>{subtitle}</p>

      <div className={styles['scroll-indicator']} onClick={handleScrollClick}>
        <span>{scrollText}</span>
        <div className={styles['arrow']}>↓</div>
      </div>
    </div>
  );
};

export default What;
