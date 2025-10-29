export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const seoData: Record<string, SEOData> = {
  '/': {
    title:
      'BuzzTech - Services Informatiques Saint-Étienne | Dépannage, Configuration, Création Web',
    description:
      'BuzzTech propose des solutions informatiques complètes à Saint-Étienne : dépannage rapide, configuration PC sur mesure et création de sites web professionnels. Devis gratuit.',
    keywords:
      'informatique Saint-Étienne, dépannage ordinateur, configuration PC, création site web, BuzzTech, Loire 42',
    ogTitle: 'BuzzTech - Votre expert informatique à Saint-Étienne',
    ogDescription:
      'Services informatiques professionnels : dépannage, configuration PC et sites web.',
    ogImage: '/images/og-home.jpg',
  },

  '/depannage': {
    title:
      'Dépannage Informatique Saint-Étienne - À distance, Atelier, Domicile | BuzzTech',
    description:
      'Dépannage informatique rapide à Saint-Étienne. Intervention à distance, en atelier ou à domicile. Virus, lenteurs, pannes matérielles. Devis gratuit.',
    keywords:
      'dépannage informatique Saint-Étienne, réparation ordinateur, virus, TeamViewer, assistance informatique Loire',
    ogTitle: 'Dépannage Informatique Rapide - BuzzTech Saint-Étienne',
    ogDescription:
      'Réparation PC rapide : à distance, atelier ou domicile. Devis gratuit.',
    ogImage: '/images/og-depannage.jpg',
  },

  '/configuration': {
    title:
      'Configuration PC sur Mesure Saint-Étienne - Gaming, Bureautique, Pro | BuzzTech',
    description:
      'Assemblage PC personnalisé à Saint-Étienne selon vos besoins : gaming, bureautique ou professionnel. Composants de qualité, assemblage expert.',
    keywords:
      'configuration PC Saint-Étienne, assemblage ordinateur, PC gaming, PC bureautique, montage PC Loire',
    ogTitle: 'Configuration PC Sur Mesure - BuzzTech Saint-Étienne',
    ogDescription:
      'PC assemblé selon vos besoins : gaming, bureautique, professionnel.',
    ogImage: '/images/og-configuration.jpg',
  },

  '/creation-web': {
    title:
      'Création Site Web Saint-Étienne - Sites Vitrines Professionnels | BuzzTech',
    description:
      'Création de sites web professionnels à Saint-Étienne. Sites vitrines responsive, optimisés SEO. Design moderne et sur mesure pour votre entreprise.',
    keywords:
      'création site web Saint-Étienne, site vitrine, développement web, responsive design, SEO Loire',
    ogTitle: 'Création Site Web Professionnel - BuzzTech Saint-Étienne',
    ogDescription: 'Sites web modernes et optimisés pour votre entreprise.',
    ogImage: '/images/og-web.jpg',
  },
};

// Schema.org data pour les données structurées
export const schemaOrgData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'BuzzTech',
  description: 'Services informatiques complets à Saint-Étienne',
  url: 'https://www.buzztech-informatique.fr',
  telephone: '+33660352267',
  email: 'contact@buzztech-informatique.fr',

  // ✅ Logo de l'entreprise (utilise le favicon)
  logo: 'https://www.buzztech-informatique.fr/favicon.ico',
  
  // ✅ Image principale
  image: 'https://www.buzztech-informatique.fr/images/og-home.jpg',
  
  // ✅ Informations commerciales
  priceRange: '€€',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  currenciesAccepted: 'EUR',

  // ✅ Date de création et fondateur
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Estebane Blancquart',
  },

  // ✅ Adresse complète
  address: {
    '@type': 'PostalAddress',
    streetAddress: '20b Impasse Montesquieu',
    addressLocality: 'Saint-Étienne',
    addressRegion: 'Auvergne-Rhône-Alpes',
    postalCode: '42100',
    addressCountry: 'FR',
  },

  // ✅ Coordonnées géographiques
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.4397,
    longitude: 4.3872,
  },

  // ✅ Horaires d'ouverture détaillés
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],

  // ✅ Zone de service
  serviceArea: {
    '@type': 'City',
    name: 'Saint-Étienne',
  },

  // ✅ Réseaux sociaux
  sameAs: [
    'https://www.facebook.com/profile.php?id=61565433387725',
    'https://www.instagram.com/buzztech_informatique/',
  ],

  // ✅ Services proposés
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services informatiques',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dépannage informatique',
          description:
            'Réparation ordinateurs à distance, en atelier ou à domicile. Virus, lenteurs, pannes matérielles.',
          serviceType: 'Dépannage informatique',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Configuration PC sur mesure',
          description:
            'Assemblage PC personnalisé : gaming, bureautique ou professionnel. Composants de qualité.',
          serviceType: 'Configuration PC',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Création de sites web',
          description:
            'Sites vitrines professionnels responsive et optimisés SEO. Design moderne et sur mesure.',
          serviceType: 'Développement web',
        },
      },
    ],
  },

  // ⚠️ NOTE: Avis clients à ajouter plus tard quand tu en auras
  // Décommente et remplis quand tu auras de vrais avis :
  /*
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '12',
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Jean D.',
      },
      reviewBody: 'Service rapide et efficace, mon PC est reparti comme neuf !',
      datePublished: '2024-10-15',
    },
  ],
  */
};