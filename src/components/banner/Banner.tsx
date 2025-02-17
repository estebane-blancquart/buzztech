import styles from './banner.module.scss';

interface PackProps {
  title: string;
  description: string;
  price: number;
}

function Pack({ title, description, price }: PackProps) {

  return (
    <fieldset className={styles.banner}>
      <legend><h3>{title}</h3></legend>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}><span>Tarif:</span> {price}€</p>
    </fieldset>
  );
}

export default Pack;
