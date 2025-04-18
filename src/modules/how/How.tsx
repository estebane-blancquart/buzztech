import styles from './how.module.scss';

interface HowProps {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
}

function How({step1, step2, step3, step4, step5}:HowProps) {
  return (
    <section className={styles.how}>
      <h2>Module how</h2>
      <div className={styles.module}>
        <div className={styles.bar}>
          <p className={styles.percentage}>20%</p>
          <div className={styles.active}></div>
        </div>
        <div className={styles.titles}>
          <div className={styles.a}>
            <p className={styles.number}>1</p>
            <p className={styles.title}>CONSULTATION PERSONNALISEE</p>
          </div>
          <div className={styles.b}></div>
          <div className={styles.c}></div>
          <div className={styles.d}></div>
          <div className={styles.e}></div>

        </div>
        <div className={styles.page}>
          <div className={styles.angleTL}></div>
          <div className={styles.angleTR}></div>
          <div className={styles.content}>
            <div className={styles.step}>
              <div className={styles.number}>1</div>
              <p>{step1}</p>
            </div>
            <div className={styles.step}>
              <div className={styles.number}>2</div>
              <p>{step2}</p>
            </div>
            <div className={styles.step}>
              <div className={styles.number}>3</div>
              <p>{step3}</p>
            </div>
            <div className={styles.step}>
              <div className={styles.number}>4</div>
              <p>{step4}</p>
            </div>
            <div className={styles.step}>
              <div className={styles.number}>5</div>
              <p>{step5}</p>
            </div>
          </div>
          <div className={styles.angleBL}></div>
          <div className={styles.angleBR}></div>
        </div>
      </div>
    </section>
  );
}
export default How;
