import styles from './prices.module.scss';

function Prices() {
  return (
    <section className={styles.prices}>
      <h2>Module prices</h2>
      <div className={styles.module}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <div className={styles.card}>
            <h3>INTEGRAL</h3>
            <p>1 500€</p>
            <ul>
              <li>Design créé sur mesure</li>
              <li>Design créé sur mesure</li>
              <li>Design créé sur mesure</li>
              <li>Design créé sur mesure</li>
              <li>Design créé sur mesure</li>
              <li>Design créé sur mesure</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Prices;
