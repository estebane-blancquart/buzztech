import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { Link } from 'react-router-dom';
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
          <a 
            href={`mailto:${companyData.email}`} 
            className={styles.socialIcon}
            aria-label="Nous contacter par email"
          >
            <HiMail aria-hidden="true" />
          </a>
          <a
            href={companyData.social.facebook}
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez-nous sur Facebook"
          >
            <FaFacebookF aria-hidden="true" />
          </a>
          <a
            href={companyData.social.instagram}
            className={styles.socialIcon}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suivez-nous sur Instagram"
          >
            <FaInstagram aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={styles.copyright}>
        <span>Site développé par {companyData.name} - Tous droits réservés</span>
        <span className={styles.separator}>|</span>
        <Link to="/mentions-legales" className={styles.legalLink}>
          Mentions légales
        </Link>
        <span className={styles.separator}>|</span>
        <Link to="/politique-confidentialite" className={styles.legalLink}>
          Confidentialité
        </Link>
        <span className={styles.separator}>|</span>
        <Link to="/conditions-generales" className={styles.legalLink}>
          CGV
        </Link>
      </div>
    </footer>
  );
};

export default Footer;