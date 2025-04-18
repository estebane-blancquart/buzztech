import styles from './footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.a}>
        <div>tel</div>
        <div>mail</div>
        <div>secteur</div>
      </div>
      <div className={styles.b}>
        <div>reseaux</div>
        <div>pages</div>
      </div>
      <div className={styles.copyright}>
        <p>Site conçu et développé par BuzzTech. Tous droits réservés © 2025.</p>
      </div>
    </footer>
  );
}

export default Footer;
