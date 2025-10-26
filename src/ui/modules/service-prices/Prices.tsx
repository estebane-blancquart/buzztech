import React, { useEffect, useRef, useState } from 'react';
import styles from './prices.module.scss';
import { PriceCard } from '@/core/types';

interface PricesProps {
  service: 'depannage' | 'configuration' | 'creation-web';
  cards: PriceCard[];
}

const Prices: React.FC<PricesProps> = ({ service, cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Détection mobile
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getLayoutClass = (): string => {
    switch (service) {
      case 'depannage':
        return styles['layout-depannage-custom'] ?? '';
      case 'creation-web':
        return styles['layout-grid'] ?? '';
      case 'configuration':
        return styles['layout-configuration-custom'] ?? '';
      default:
        return styles['layout-grid'] ?? '';
    }
  };

  // ✅ Toggle flip
  const handleCardClick = (index: number): void => {
    if (!isMobile) return; // Flip seulement sur mobile
    
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // ✅ Déterminer si premium
  const isPremiumCard = (index: number): boolean => {
    if (service === 'creation-web' && index === 1) return true;
    if (service === 'configuration' && index === 1) return true;
    return false;
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
      behavior: 'instant',
    });

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
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`
            ${styles['card']}
            ${card.size ? styles[card.size] : ''}
            ${isPremiumCard(index) ? styles['premium'] : ''}
          `}
          onClick={() => handleCardClick(index)}
          role={isMobile ? 'button' : undefined}
          tabIndex={isMobile ? 0 : undefined}
        >
          {/* ✅ Wrapper pour flip 3D (mobile uniquement) */}
          <div 
            className={`
              ${isMobile ? styles['card-inner'] : ''}
              ${isMobile && flippedCards.has(index) ? styles['flipped'] : ''}
            `}
          >
            {/* Face AVANT - Header */}
            <div className={styles['card-header']}>
              <h3 className={styles['title']}>{card.title}</h3>
              <div className={styles['price-section']}>
                <span className={styles['price']}>{card.price}</span>
                {card.unit && <span className={styles['unit']}>{card.unit}</span>}
              </div>
            </div>

            {/* Face ARRIÈRE - Features */}
            <div className={styles['features']}>
              {card.features.map((feature, featureIndex) => (
                <div key={featureIndex} className={styles['feature-item']}>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Prices;