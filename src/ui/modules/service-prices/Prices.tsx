import React, { useEffect, useRef } from 'react';
import styles from './Prices.module.scss';
import { PriceCard } from '@/core/types';

interface PricesProps {
  service: 'depannage' | 'configuration' | 'creation-web';
  cards: PriceCard[];
}

const Prices: React.FC<PricesProps> = ({ service, cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getLayoutClass = (): string => {
    switch (service) {
      case 'depannage':
        return styles['layout-depannage-custom'] ?? ''; // 1 grande + 2 petites
      case 'creation-web':
        return styles['layout-grid'] ?? ''; // 2 cartes côte à côte
      case 'configuration':
        return styles['layout-configuration-custom'] ?? ''; // 2+3 cartes
      default:
        return styles['layout-grid'] ?? '';
    }
  };

  const goToPreviousModule = (): void => {
    const currentScrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const currentModule = Math.round(currentScrollY / viewportHeight);
    const prevModulePosition = Math.max(
      0,
      (currentModule - 1) * viewportHeight
    );

    window.scrollTo({
      top: prevModulePosition,
      behavior: 'instant', // Instant pour le clavier
    });

    // Focus automatique sur le module précédent
    setTimeout(() => {
      const prevModuleElement = document
        .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        ?.closest('[tabindex="0"]') as HTMLElement;

      if (prevModuleElement) {
        prevModuleElement.focus();
      }
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPreviousModule();
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
      className={`${styles['prices']} ${getLayoutClass()}`}
      tabIndex={0}
      role="region"
      aria-label="Grilles tarifaires"
    >
      {/* ✅ FIX 2: Utiliser card.title comme key unique au lieu de index */}
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            ${styles['card']} 
            ${card.size ? styles[card.size] : ''}
          `}
        >
          <div className={styles['card-header']}>
            <h3 className={styles['title']}>{card.title}</h3>
            <div className={styles['price-section']}>
              <span className={styles['price']}>{card.price}</span>
              {card.unit && <span className={styles['unit']}>{card.unit}</span>}
            </div>
          </div>

          <div className={styles['features']}>
            {card.features.map((feature, featureIndex) => (
              /* ✅ FIX 1: Utiliser 'feature-item' au lieu de 'feature' pour matcher le SCSS */
              <div key={featureIndex} className={styles['feature-item']}>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Prices;