import styles from './hero.module.scss';
import Button from '../../components/button/Button';

function Hero() {

  return (
    <section className={styles.hero}>
      <h2>BuzzTech, des solutions <b>rapides</b> et <b>personnalisées</b> pour vos besoins informatiques.</h2>
      <Button />
      <img
        className={styles.sphere}
        src="images/sphere.gif"
        alt="Animation décorative d'une sphère"
      />
      <p>⬐ <b>A propos</b> des solutions.</p>
    </section>
  );
}

export default Hero;