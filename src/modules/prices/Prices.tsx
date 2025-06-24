import React from 'react';
import styles from './prices.module.scss';

interface PriceCard {
  title: string;
  price: string;
  unit?: string;
  features: string[];
  size?: 'small' | 'medium' | 'large';
}

interface PricesProps {
  cards: PriceCard[];
}

interface CardProps {
  card: PriceCard;
}

const Card: React.FC<CardProps> = ({ card }) => (
  <div className={`${styles.card} ${card.size ? styles[card.size] : ''}`}>
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
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const Prices: React.FC<PricesProps> = ({ cards }) => {
  const getLayoutClass = () => {
    switch (cards.length) {
      case 3:
        return styles.layoutDepannageCustom;
      case 4:
        return styles.layoutGrid;
      case 5:
        return styles.layoutConfigurationCustom;
      default:
        return styles.layoutColumns;
    }
  };

  return (
    <div className={styles.prices}>
      <div className={`${styles.grid} ${getLayoutClass()}`}>
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Prices;
