import styles from './card.module.scss';

interface CardProps {
  title: string;
  description: string;
  price?: number;
  icon?: string; 
  variant?: string; 
}

function Card({ title, description, price, icon, variant }: CardProps) {
  const cardClass = variant ? `${styles.card} ${styles[variant]}` : styles.card;

  return (
    <fieldset className={cardClass} >
      <legend><h3>{title}</h3></legend>
      {icon && <img className={styles.icon} src={icon} alt="" />}
      <p className={styles.description}>{description}</p>
      {price !== undefined && <p className={styles.price}><span>Tarif:</span> {price}€</p>}
    </fieldset>
  );
}

export default Card;
