export const homeData = {
  hero: {
    title: 'BuzzTech - Services Informatiques',
    subtitle: 'Votre partenaire IT de confiance à Saint-Étienne',
    ctaText: 'Demander un devis gratuit',
    stats: [
      { value: '24/7', label: 'Disponible' },
      { value: 'Loire (42)', label: 'Saint-Étienne' },
      { value: '48H', label: 'Intervention' },
    ],
  },

  presentation: {
    title: 'Nos services',
    subtitle: 'Services complets pour tous vos besoins informatiques',
    services: [
      {
        to: '/depannage',
        icon: '🔧',
        name: 'Dépannage',
        description: 'Réparation rapide • À distance, atelier ou domicile',
        price: 'À partir de 30€',
      },
      {
        to: '/configuration',
        icon: '⚙️',
        name: 'Configuration',
        description: 'Assemblage PC sur mesure • Selon budget et besoins',
        price: 'À partir de 100€',
      },
      {
        to: '/creation-web',
        icon: '💻',
        name: 'Création Web',
        description: 'Sites vitrines professionnels • Responsive et optimisés',
        price: 'À partir de 1500€',
      },
    ],
  },
};
