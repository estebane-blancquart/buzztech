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
      'BuzzTech - Solutions Informatiques Saint-Étienne | Dépannage, Configuration, Création Web',
    description:
      'BuzzTech propose des solutions informatiques complètes à Saint-Étienne : dépannage rapide, configuration PC sur mesure et création de sites web professionnels. Devis gratuit.',
    keywords:
      'informatique Saint-Étienne, dépannage ordinateur, configuration PC, création site web, BuzzTech, Loire 42',
    ogTitle: 'BuzzTech - Votre expert informatique à Saint-Étienne',
    ogDescription:
      'Solutions informatiques professionnelles : dépannage, configuration PC et sites web.',
    ogImage: '/og-home.jpg',
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
    ogImage: '/og-depannage.jpg',
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
    ogImage: '/og-configuration.jpg',
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
    ogImage: '/og-web.jpg',
  },
};

// Schema.org data pour les données structurées
export const schemaOrgData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'BuzzTech',
  description: 'Solutions informatiques complètes à Saint-Étienne',
  url: 'https://www.buzztech-informatique.fr',
  telephone: '+33660352267',
  email: 'contact@buzztech-informatique.fr',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Saint-Étienne',
    addressRegion: 'Auvergne-Rhône-Alpes',
    postalCode: '42000',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.4397,
    longitude: 4.3872,
  },
  openingHours: 'Mo-Fr 08:00-18:00',
  serviceArea: {
    '@type': 'City',
    name: 'Saint-Étienne',
  },
  services: [
    {
      '@type': 'Service',
      name: 'Dépannage informatique',
      description: 'Réparation ordinateurs à distance, atelier ou domicile',
    },
    {
      '@type': 'Service',
      name: 'Configuration PC',
      description: 'Assemblage PC sur mesure selon vos besoins',
    },
    {
      '@type': 'Service',
      name: 'Création sites web',
      description: 'Sites vitrines professionnels responsive',
    },
  ],
};
