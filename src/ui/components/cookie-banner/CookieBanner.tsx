import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.scss';

const CONSENT_KEY = 'buzztech_cookie_consent';

// Typage pour GTM
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// Fonction pour charger GTM
const loadGTM = (): void => {
  // ID GTM en dur (plus fiable que variable d'env pour l'instant)
  const gtmId = 'GTM-PR9QVL2R';

  // Vérifier si GTM n'est pas déjà chargé
  if (window.dataLayer) return;

  // Initialiser dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  // Charger le script GTM
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  // Ajouter le noscript iframe
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
    console.log('🔵 handleAccept appelé');
    localStorage.setItem(CONSENT_KEY, 'accepted');
    console.log('🟢 localStorage set:', localStorage.getItem(CONSENT_KEY));
    setShowBanner(false);
    console.log('🟡 Appel loadGTM...');
    loadGTM();
    console.log('✅ loadGTM terminé');
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