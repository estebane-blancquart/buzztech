import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <div className={styles.tel}>
          <a href="tel:0123456789" >06 XX XX XX XX</a>
        </div>

        <div className={styles.location}>SAINT-ÉTIENNE</div>

        <div className={styles.social}>
          <a href="mailto:contact@buzztech.com" className={styles.socialIcon}>
            <HiMail />
          </a>
          <a href="#" className={styles.socialIcon}>
            <FaFacebookF />
          </a>
          <a href="#" className={styles.socialIcon}>
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className={styles.copyright}>
        Site développé par BuzzTech - Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;