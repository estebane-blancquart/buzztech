import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.scss';

const CONSENT_KEY = 'cookie-consent';

// Fonction pour charger GTM
const loadGTM = (): void => {
  const gtmId = import.meta.env.VITE_GTM_ID;
  
  if (!gtmId) return;

  // Charger GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  
  const consent = localStorage.getItem(CONSENT_KEY);
  
  if (consent === 'accepted' || consent === 'refused') {
    document.head.appendChild(script);
  }
};

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem(CONSENT_KEY);
    
    if (!consent) {
      // Afficher le banner après un court délai
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, []);

  const handleAccept = (): void => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setIsVisible(false);
    loadGTM();
  };

  const handleRefuse = (): void => {
    localStorage.setItem(CONSENT_KEY, 'refused');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.icon}>🍪</div>
          <div className={styles.text}>
            <h3>Cookies et confidentialité</h3>
            <p>
              Nous utilisons Google Analytics pour améliorer votre expérience.
              Ces données nous aident à mieux comprendre vos besoins.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/politique-confidentialite" className={styles.link}>
            En savoir plus
          </Link>
          <button 
            onClick={handleRefuse} 
            className={styles.btnSecondary}
            aria-label="Refuser les cookies"
          >
            Refuser
          </button>
          <button 
            onClick={handleAccept} 
            className={styles.btnPrimary}
            aria-label="Accepter les cookies"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

// Hook pour vérifier le consentement et charger GTM si déjà accepté
export const useGTMConsent = (): void => {
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    
    if (consent === 'accepted') {
      loadGTM();
    }
  }, []);
};

export default CookieBanner;