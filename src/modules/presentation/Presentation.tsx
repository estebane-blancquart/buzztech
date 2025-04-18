import styles from './presentation.module.scss';

function Presentation() {
  return (
    <section className={styles.presentation}>
      <h2>Module presentation</h2>
      <div className={styles.module}></div>
    </section>
  );
}
export default Presentation;
