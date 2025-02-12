import styles from './banner.module.scss';

interface PackProps {
  title: string;
  description: string;
  price: number;
}

function Pack({ title, description, price}: PackProps) {

  return ( 
    <fieldset className={styles.pack}>
      <legend><h3>{title}</h3></legend>
          <p>{description}</p>
          <p>{price}€</p>
    </fieldset>
  );
}

export default Pack;
