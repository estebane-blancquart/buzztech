import { useRef } from 'react';
import styles from './what.module.scss';

interface WhatProps {
  badge: string;
  title: string;
  subtitle: string;
}

const What = ({ badge, title, subtitle }: WhatProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasUserInteractedRef = useRef<boolean>(false);

  const handleScrollClick = (): void => {
    // Désactiver le scroller global temporairement
    const scrollerControl = (window as any).scrollerControl;
    
    if (scrollerControl) {
      scrollerControl.disableGlobalScroll();
    }

    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth',
    });

    // Réactiver après l'animation
    setTimeout(() => {
      if (scrollerControl) {
        scrollerControl.enableGlobalScroll();
      }
    }, 800);
  };

  const goToNextModule = (): void => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'instant',
    });

    setTimeout(() => {
      const nextModuleElement = document
        .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        ?.closest('[tabindex="0"]') as HTMLElement;

      if (nextModuleElement) {
        nextModuleElement.focus();
      }
    }, 100);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (hasUserInteractedRef.current) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      hasUserInteractedRef.current = true;
      goToNextModule();
    }
  };

  return (
    <section
      className={styles.what}
      aria-labelledby="what-heading"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.badge}>{badge}</div>

      <h1 id="what-heading" className={styles.title}>
        {title}
      </h1>

      <p className={styles.subtitle}>{subtitle}</p>

      <div className={styles.scrollIndicator} onClick={handleScrollClick}>
        <span>Continuer</span>
        <div className={styles.arrow}>↓</div>
      </div>
    </section>
  );
};

export default What;