import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.scss';

const CONSENT_KEY = 'buzztech_cookie_consent';

type ConsentStatus = 'accepted' | 'refused' | null;

// Interface GTM partagée
interface GTMWindow extends Window {
  dataLayer?: any[];
}

// Fonction loadGTM réutilisable
const loadGTM = (): void => {
  const w = window as unknown as GTMWindow;
  
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
  
  const f = document.getElementsByTagName('script')[0];
  if (!f || !f.parentNode) return;
  
  const j = document.createElement('script') as HTMLScriptElement;
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PR9QVL2R';
  f.parentNode.insertBefore(j, f);

  // Ajouter le noscript iframe
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-PR9QVL2R';
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  if (document.body.firstChild) {
    document.body.insertBefore(noscript, document.body.firstChild);
  }
};

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem(CONSENT_KEY);
    
    if (!consent) {
      // Petit délai pour ne pas gêner l'UX initiale
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, []);

  const handleAccept = (): void => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShowBanner(false);
    
    // Charger GTM maintenant que l'utilisateur a accepté
    loadGTM();
  };

  const handleRefuse = (): void => {
    localStorage.setItem(CONSENT_KEY, 'refused');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.icon}>🍪</div>
          <div className={styles.text}>
            <h3>Cookies et vie privée</h3>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic du site. 
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