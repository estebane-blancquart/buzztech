import styles from './hero.module.scss';
import Button from '../../components/button/Button';

function Hero() {

  return (
    <section className={styles.hero}>
      <h2>BuzzTech, des solutions rapides et personnalisées pour vos besoins informatiques.</h2>
      <Button />
      <img
        className={styles.sphere}
        src="images/sphere.gif"
        alt="Animation décorative d'une sphère"
      />
      <p>⬐ A propos des solutions.</p>
    </section>
  );
}

export default Hero;