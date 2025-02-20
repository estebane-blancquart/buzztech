import styles from './options.module.scss';
import Card from '../../components/card/Card';

interface OptionsProps {
  title1: string;
  description1: string;
  icon1: string;
  price1: number;

  title2: string;
  description2: string;
  icon2: string;
  price2: number;

  title3: string;
  description3: string;
  icon3: string;
  price3: number;

  packTitle: string;
  packDescription: string;
  packPrice: number;
}

function Options({ title1, description1, icon1, price1, title2, description2, icon2, price2, title3, description3, icon3, price3, packTitle, packDescription, packPrice }: OptionsProps) {

  return (
    <section className={styles.options}>
      <h2>Choisissez l'option qui vous convient</h2>
      <article className={styles.cards}>
        <Card title={title1} description={description1} icon={icon1} price={price1} showIcon={true} variant={'h-icon'} />
        <Card title={title2} description={description2} icon={icon2} price={price2} showIcon={true} variant={'h-icon'} />
        <Card title={title3} description={description3} icon={icon3} price={price3} showIcon={true} variant={'h-icon'} />
      </article>
      <article className={styles.pack}>
        <Card title={packTitle} description={packDescription} price={packPrice} showIcon={false} variant={'h'} />
      </article>
    </section>
  );
}

export default Options;
