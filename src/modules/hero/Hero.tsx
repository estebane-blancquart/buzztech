import styles from './hero.module.scss';

function Hero() {
  return (
    <section className={styles.hero}>
      <h2>Module hero</h2>
      <div className={styles.module}></div>
    </section>
  );
}
export default Hero;
