import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoData, schemaOrgData, SEOData } from '@/core/data/seo';

export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const currentSEO: SEOData = seoData[location.pathname] || seoData['/']!;

    // Title
    document.title = currentSEO.title;

    // Meta description
    updateMetaTag('description', currentSEO.description);

    // Meta keywords
    updateMetaTag('keywords', currentSEO.keywords);

    // Open Graph
    updateMetaProperty('og:title', currentSEO.ogTitle || currentSEO.title);
    updateMetaProperty(
      'og:description',
      currentSEO.ogDescription || currentSEO.description
    );
    updateMetaProperty(
      'og:url',
      `https://www.buzztech-informatique.fr${location.pathname}`
    );
    updateMetaProperty('og:type', 'website');
    updateMetaProperty('og:locale', 'fr_FR');

    if (currentSEO.ogImage) {
      updateMetaProperty(
        'og:image',
        `https://www.buzztech-informatique.fr${currentSEO.ogImage}`
      );
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', currentSEO.ogTitle || currentSEO.title);
    updateMetaTag(
      'twitter:description',
      currentSEO.ogDescription || currentSEO.description
    );

    // Schema.org JSON-LD
    updateJsonLd();

    // Canonical URL
    updateCanonical(`https://www.buzztech-informatique.fr${location.pathname}`);
  }, [location.pathname]);
};

// Fonctions utilitaires
const updateMetaTag = (name: string, content: string) => {
  let element = document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const updateMetaProperty = (property: string, content: string) => {
  let element = document.querySelector(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const updateJsonLd = () => {
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemaOrgData);
  document.head.appendChild(script);
};

const updateCanonical = (url: string) => {
  let element = document.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', url);
};
