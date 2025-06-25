// components/Prices/Prices.tsx
import React, { useEffect, useRef } from 'react';
import styles from './Prices.module.scss';

interface PriceCard {
  title: string;
  price: string;
  unit?: string;
  features: string[];
  size?: 'small' | 'medium' | 'large';
}

interface PricesProps {
  service: 'depannage' | 'configuration' | 'creation-web';
  cards: PriceCard[];
}

const Prices: React.FC<PricesProps> = ({ service, cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getLayoutClass = () => {
    switch (service) {
      case 'depannage':
        return styles.layoutDepannageCustom; // 1 grande + 2 petites
      case 'creation-web':
        return styles.layoutGrid; // 2 cartes côte à côte
      case 'configuration':
        return styles.layoutConfigurationCustom; // 2+3 cartes
      default:
        return styles.layoutGrid;
    }
  };

  const goToPreviousModule = () => {
    console.log('🎯 Prices: Tentative de navigation vers module précédent');

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
      console.log('🔍 Prices: Recherche du module précédent...');

      const prevModuleElement = document
        .elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
        ?.closest('[tabindex="0"]') as HTMLElement;

      console.log('📍 Prices: Élément trouvé:', prevModuleElement);

      if (prevModuleElement) {
        console.log('✅ Prices: Focus sur:', prevModuleElement);
        prevModuleElement.focus();
      } else {
        console.log('❌ Prices: Aucun élément focusable trouvé');
      }
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('⌨️ Prices: Touche pressée:', e.key);

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

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.prices} ${getLayoutClass()}`}
      tabIndex={0}
      role="region"
      aria-label="Grilles tarifaires"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={`
            ${styles.card} 
            ${card.size ? styles[card.size] : ''}
          `}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.title}>{card.title}</h3>
            <div className={styles.priceSection}>
              <span className={styles.price}>{card.price}</span>
              {card.unit && <span className={styles.unit}>{card.unit}</span>}
            </div>
          </div>

          <div className={styles.features}>
            {card.features.map((feature, featureIndex) => (
              <div key={featureIndex} className={styles.feature}>
                <span className={styles.bullet}>•</span>
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
