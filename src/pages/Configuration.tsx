import React from 'react';
import Why, { WhyPage } from '@/modules/why/Why';
import How from '@/modules/how/How';
import What from '@/modules/what/What';
import Prices from '@/modules/prices/Prices';

const Configuration: React.FC = () => {
  return (
    <>
      <section className="module">
        <What
          badge="PC sur mesure"
          title="Configuration PC sur mesure"
          subtitle="Assemblage et optimisation de configurations personnalisées selon vos besoins"
        />
      </section>

      <section className="module">
        <Why title="Configuration">
          <WhyPage
            title="Usage quotidien"
            icon="💻"
            landingDescription="Configuration optimisée pour la navigation web, réseaux sociaux, bureautique et gaming léger. Assemblage soigné avec gestion optimisée du câblage et tests de stabilité complets. Configuration type : i3/Ryzen 3, 8GB RAM, SSD 256GB."
            points={[
              'Navigation web fluide et multitâche',
              'Suite bureautique complète (Office, LibreOffice)',
              'Gaming en 1080p pour jeux populaires',
              'Streaming vidéo HD sans ralentissement',
              'Configuration Intel i3 ou AMD Ryzen 3',
              'Optimisation rapport qualité/prix',
            ]}
          />

          <WhyPage
            title="Performance intermédiaire"
            icon="🎮"
            landingDescription="PC polyvalent pour montage vidéo/photo semi-pro, gaming 1080p haute qualité, streaming et édition audio. Configuration équilibrée : i5/Ryzen 5, 16GB RAM, SSD 512GB, GPU milieu de gamme pour des performances optimales."
            points={[
              'Montage vidéo Full HD fluide',
              'Gaming 1080p ultra settings',
              'Streaming simultané sans perte de FPS',
              'Retouche photo professionnelle',
              'Édition et mixage audio multipiste',
              'Configuration Intel i5 ou AMD Ryzen 5',
            ]}
          />

          <WhyPage
            title="Haute performance"
            icon="⚡"
            landingDescription="Station de travail pour modélisation 3D, CAO, rendu vidéo 4K, gaming 4K/VR et développement logiciel. Configuration haut de gamme : i7-i9/Ryzen 7-9, 32GB+ RAM, SSD NVMe 1TB+, GPU dernière génération."
            points={[
              'Rendu 3D et modélisation CAO professionnelle',
              'Gaming 4K 60fps et réalité virtuelle',
              'Montage vidéo 4K multicaméra',
              'Virtualisation et simulation complexe',
              'Développement logiciel et compilation rapide',
              'Configuration Intel i7-i9 ou AMD Ryzen 7-9',
            ]}
          />
        </Why>
      </section>

      <section className="module">
        <How
          steps={[
            {
              title: 'Analyse',
              text: "Étude approfondie de vos besoins d'utilisation, budget et contraintes techniques. Définition du cahier des charges et des priorités.",
            },
            {
              title: 'Sélection',
              text: "Sélection personnalisée de composants compatibles avec optimisation budget/performance. Liste détaillée avec liens d'achat et alternatives.",
            },
            {
              title: 'Assemblage',
              text: 'Montage soigné des composants avec gestion optimisée du câblage. Tests de stabilité et performance pour validation complète.',
            },
            {
              title: 'Installation',
              text: "Installation système d'exploitation, mise à jour drivers et firmwares. Configuration des logiciels essentiels et outils de sécurité.",
            },
            {
              title: 'Optimisation',
              text: "Configuration finale des paramètres, tests de performance et formation à l'utilisation. Support technique post-livraison.",
            },
          ]}
        />
      </section>

      <section className="module">
        <Prices
          cards={[
            {
              title: 'PC STANDARD',
              price: '70',
              unit: '€',
              features: [
                'Configuration de base',
                'Installation système',
                'Tests fonctionnement',
              ],
            },
            {
              title: 'PC COMPLEXE',
              price: '140',
              unit: '€',
              features: [
                'Configuration complète',
                'Optimisation avancée',
                'Support étendu',
              ],
            },
            {
              title: "SYSTÈME D'EXPLOITATION",
              price: '30',
              unit: '€',
              features: [
                'Installation Windows/Linux',
                'Configuration utilisateur',
              ],
            },
            {
              title: 'PILOTES',
              price: '30',
              unit: '€',
              features: ['Installation pilotes', 'Mise à jour automatique'],
            },
            {
              title: 'OUTILS',
              price: '30',
              unit: '€',
              features: ['Logiciels essentiels', 'Configuration optimale'],
            },
          ]}
        />
      </section>
    </>
  );
};

export default Configuration;
