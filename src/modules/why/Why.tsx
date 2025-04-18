import styles from './why.module.scss';

interface PageProps {

}

function Page({  }: PageProps) {
  return (
    <div className={styles.page}>
      <h3></h3>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <button></button>
    </div>
  )
};

function Why() {
  return (
    <section className={styles.why}>
      <h2>Module why</h2>
      <div className={styles.module}>
        <div className={styles.top}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.index}></div>
          <div className={styles.pages}>
            <div className={styles.page1}>
              
            </div>
            <Page />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Why;
