import styles from './footer.module.scss';

function Footer() {

  return (
    <footer className={styles.footer}>
      <address className={styles.contact}>
        <a href='https://www.facebook.com/people/BuzzTech-Informatique/61565433387725/' aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <img src="icons/facebook.png" alt="Facebook" />
          <p>BuzzTech - Informatique</p>
        </a>
        <a href='https://www.snapchat.com/add/buzztech_it?share_id=NcgvihOW0nw&locale=fr-FR' aria-label="Snapchat" target="_blank" rel="noopener noreferrer">
          <img src="icons/snapchat.png" alt="Snapchat" />
          <p>buzztech_it</p>
        </a>
        <a href='https://wa.me/33660352267' aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
          <img src="icons/phone.png" alt="WhatsApp" />
          <p>06 60 35 22 67</p>
        </a>
        <a href='mailto:contact@buzztech-informatique.fr' aria-label="Mail" target="_blank" rel="noopener noreferrer">
          <img src="icons/mail.png" alt="Mail" />
          <p>contact@buzztech-informatique.fr</p>
        </a>
      </address>
      <div className={styles.copyright}>
        <p>Site conçu et développé par BuzzTech. Tous droits réservés © 2025.</p>
      </div>
    </footer>
  );
}

export default Footer;
