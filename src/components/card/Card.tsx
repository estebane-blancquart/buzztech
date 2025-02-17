import styles from './card.module.scss';

interface CardProps {
  title: string;
  description: string;
  icon: string;
  price: number;
}

function Card({ title, description, icon, price }: CardProps) {

  return (
    <fieldset className={styles.card}>
      <legend><h3>{title}</h3></legend>
      <img className={styles.icon} src={icon} alt="" />
      <p className={styles.description}>{description}</p>
      <p className={styles.price}><span>Tarif:</span> {price}€</p>
    </fieldset>
  );
}

export default Card;
