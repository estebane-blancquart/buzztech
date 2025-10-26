import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.scss';

const CONSENT_KEY = 'buzztech_cookie_consent';
const CONSENT_EXPIRY_MONTHS = 13; // RGPD max

// Typage pour GTM
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// Interface pour le consentement avec expiration
interface ConsentData {
  value: 'accepted' | 'refused';
  expiry: number;
}

// Fonction pour stocker le consentement avec expiration
const setConsentWithExpiry = (value: 'accepted' | 'refused'): void => {
  const now = new Date();
  const expiryDate = new Date(now.setMonth(now.getMonth() + CONSENT_EXPIRY_MONTHS));
  
  const consentData: ConsentData = {
    value,
    expiry: expiryDate.getTime(),
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
};

// Fonction pour récupérer le consentement (avec vérification expiration)
const getConsent = (): string | null => {
  const stored = localStorage.getItem(CONSENT_KEY);
  
  if (!stored) return null;
  
  try {
    const consentData: ConsentData = JSON.parse(stored);
    
    // Vérifier si expiré
    if (new Date().getTime() > consentData.expiry) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    
    return consentData.value;
  } catch {
    // Format invalide, supprimer
    localStorage.removeItem(CONSENT_KEY);
    return null;
  }
};

// Fonction pour charger GTM
const loadGTM = (): void => {
  const gtmId = import.meta.env.VITE_GTM_ID || 'GTM-PR9QVL2R';

  if (window.dataLayer) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
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
    const consent = getConsent();

    if (!consent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, []);

  const handleAccept = (): void => {
    setConsentWithExpiry('accepted');
    setShowBanner(false);
    loadGTM();
  };

  const handleRefuse = (): void => {
    setConsentWithExpiry('refused');
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
    const consent = getConsent();

    if (consent === 'accepted') {
      loadGTM();
    }
  }, []);
};

export default CookieBanner;