import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import styles from './footer.module.scss';
import { companyData } from '@/core/data';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <div className={styles.tel}>
          <a href={`tel:${companyData.phone.replace(/\s/g, '')}`}>
            {companyData.phone}
          </a>
        </div>

        <div className={styles.location}>{companyData.address}</div>

        <div className={styles.social}>
          <a href={`mailto:${companyData.email}`} className={styles.socialIcon}>
            <HiMail />
          </a>
          <a href={companyData.social.facebook} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href={companyData.social.instagram} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className={styles.copyright}>
        Site développé par {companyData.name} - Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;