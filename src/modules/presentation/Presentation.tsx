import Card from '../../components/card/Card';
import styles from './presentation.module.scss';

function Presentation() {

  return (
    <section className={styles.presentation}>
      <h2>Des services sur mesure</h2>
      <div className={styles.availability}>
        <p>Secteur <br /> Saint-Etienne</p>
        <p>Disponible <br /> 7j/7</p>
      </div>
      <div className={styles.cardsTo}>
        <Card title={'Dépannage'} description={'Obtenez une assistance rapide et efficace en atelier, à distance, ou à domicile.'}  variant="light" />
        <Card title={'Conception'} description={'Améliorez votre environnement avec une configuration informatique personnalisée.'}variant="light" />
        <Card title={'Développement'} description={'Boostez votre activité grâce à un site web moderne et performant.'} variant="light" />
        <Card title={'Nettoyage'} description={'Prolongez la durée de vie de vos appareils et prevennez les pannes.'} variant="light" />
      </div>
    </section>

  );
}

export default Presentation;
