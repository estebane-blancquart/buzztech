import { ReactNode } from 'react';
import styles from './card.module.scss';
import { Link } from 'react-router-dom';
import Scroll from '../link/Link';

interface CardProps {
  title: string;
  description: string;
  price?: number;
  icon?: string; 
  link?: string;
  variant?: string; 
}

function Card({ title, description, price, icon, link, variant }: CardProps) {
  const cardClass = variant ? `${styles.card} ${styles[variant]}` : styles.card;

  return (
    <fieldset className={cardClass} >
      <legend><h3>{title}</h3></legend>
      {icon && <img className={styles.icon} src={icon} alt="" />}
      <p className={styles.description}>{description}</p>
      {price !== undefined && <p className={styles.price}><span>Tarif:</span> {price}€</p>}
      {link !== undefined && <Scroll to={link} className={styles.link}>Voir plus</Scroll>}
    </fieldset>
  );
}

export default Card;
