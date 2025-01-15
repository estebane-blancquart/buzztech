import React from 'react';
import styles from './contact.module.scss';

function Contact() {
  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.contact}>
      <div className={styles.mail} onClick={() => handleLinkClick('mailto:contact@buzztech-informatique.fr')}>
        <img src="icons/mail.png" alt="Mail" />
        <p>contact@buzztech-informatique.fr</p>
      </div>
      <div
        className={styles.phone}
        onClick={() => handleLinkClick('https://wa.me/33660352267')}
        role="button"
        style={{ cursor: 'pointer' }}
      >
        <img src="icons/phone.png" alt="WhatsApp" />
        <p>06 60 35 22 67</p>
      </div>
      <div className={styles.facebook} onClick={() => handleLinkClick('https://www.facebook.com/people/BuzzTech-Informatique/61565433387725/')}>
        <img src="icons/facebook.png" alt="Facebook" />
        <p>BuzzTech - Informatique</p>
      </div>
      <div className={styles.snapchat} onClick={() => handleLinkClick('https://www.snapchat.com/add/buzztech_it?share_id=NcgvihOW0nw&locale=fr-FR')}>
        <img src="icons/snapchat.png" alt="Snapchat" />
        <p>buzztech_it</p>
      </div>
    </div>
  );
}

export default Contact;
