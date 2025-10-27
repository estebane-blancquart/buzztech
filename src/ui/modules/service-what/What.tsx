import { useRef } from 'react';
import styles from './what.module.scss';
import { WhatItem, WhatProps } from '@/core/types';

const WhatItemComponent = ({
  icon,
  title,
  description,
}: WhatItem): JSX.Element => (
  <div className={styles.item}>
    <div className={styles.iconWrapper}>
      <span className={styles.icon}>{icon}</span>
    </div>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
  </div>
);

const What = ({
  items = [], // ✅ FIX: Valeur par défaut
  heading = 'En quoi ça consiste ?',
  subheading = 'Je vous explique',
  buttonText = 'Continuer',
}: WhatProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasUserInteractedRef = useRef<boolean>(false);

  const handleScrollClick = (): void => {
    // ✅ FIX: Désactiver le scroller global temporairement
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
    }, 800); // Durée de l'animation smooth scroll
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
      <div className={styles.header}>
        <h2 id="what-heading" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.subheading}>{subheading}</p>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <WhatItemComponent key={item.title} {...item} />
        ))}
      </div>

      <button
        type="button"
        onClick={handleScrollClick}
        className={styles.scrollButton}
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    </section>
  );
};

export default What;
