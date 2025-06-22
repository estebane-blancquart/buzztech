// components/Prices/Prices.tsx
import React from 'react';
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
  const getLayoutClass = () => {
    switch (service) {
      case 'depannage':
        return styles.layoutDepannageCustom; // 1 grande + 2 petites
      case 'creation-web':
        return styles.layoutGrid; // Grille 2x2
      case 'configuration':
        return styles.layoutConfigurationCustom; // 2+3 cartes comme ta maquette
      default:
        return styles.layoutColumns;
    }
  };

  return (
    <section className={`module ${styles.prices}`}>
      <div className={styles.container}>
        <div className={`${styles.grid} ${getLayoutClass()}`}>
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
      </div>
    </section>
  );
};

export default Prices;