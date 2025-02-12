import styles from './presentation.module.scss';

interface CardToProps {
  title: string;
  description: string;
}

function CardTo({ title, description }: CardToProps) {
  return (
    <fieldset className={styles.cardTo}>
      <legend><span>{title}</span></legend>
      <p>{description}</p>
      <button>voir plus</button>
    </fieldset>
  )
}

function Presentation() {

  return (
    <section className={styles.presentation}>
      <h2>Des services sur mesure</h2>
      <div className={styles.availability}>
        <p>Secteur Saint-Etienne</p>
        <p>Disponible 7j/7</p>
      </div>
      <div className={styles.cardsTo}>
        <CardTo title={'Dépannage'} description={'Obtenez une assistance rapide et efficace en atelier, à distance, ou à domicile.'} />
        <CardTo title={'Conception'} description={'Améliorez votre environnement avec une configuration informatique personnalisée.'} />
        <CardTo title={'Développement'} description={'Boostez votre activité grâce à un site web moderne et performant.'} />
        <CardTo title={'Nettoyage'} description={'Prolongez la durée de vie de vos appareils et prevennez les pannes.'} />
      </div>
    </section>

  );
}

export default Presentation;
