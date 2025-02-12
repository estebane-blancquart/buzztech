import styles from './footer.module.scss';

function Footer() {
  function handleLinkClick(link: string) {}

  return (
    <footer className={styles.footer}>
      <address className={styles.contact}>
        <div onClick={() => handleLinkClick('https://www.facebook.com/people/BuzzTech-Informatique/61565433387725/')} aria-label="Facebook">
          <img src="icons/facebook.png" alt="Facebook" />
          <p>BuzzTech - Informatique</p>
        </div>
        <div onClick={() => handleLinkClick('https://www.snapchat.com/add/buzztech_it?share_id=NcgvihOW0nw&locale=fr-FR')} aria-label="Snapchat">
          <img src="icons/snapchat.png" alt="Snapchat" />
          <p>buzztech_it</p>
        </div>
        <div onClick={() => handleLinkClick('https://wa.me/33660352267')} role="button" style={{ cursor: 'pointer' }} aria-label="WhatsApp">
          <img src="icons/phone.png" alt="WhatsApp" />
          <p>06 60 35 22 67</p>
        </div>
        <div onClick={() => handleLinkClick('mailto:contact@buzztech-informatique.fr')} aria-label="Mail">
          <img src="icons/mail.png" alt="Mail" />
          <p>contact@buzztech-informatique.fr</p>
        </div>
      </address>
      <div className={styles.copyright}>
        <p>Site conçu et développé par BuzzTech. <u>Tous droits réservés © 2025.</u></p>
      </div>
    </footer>
  );
}

export default Footer;
