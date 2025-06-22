import React from 'react';
import Why, { WhyPage } from '@/modules/why/Why';
import How from '../modules/how/How';
import What from '@/modules/what/What';
import Prices from '@/modules/prices/Prices';

const CreationWeb: React.FC = () => {
  return (
    <>
      <section className="module">
        <What
          badge="creation-web"
          title="Création de sites web"
          subtitle="Sites vitrines sur mesure pour développer votre présence en ligne"
        />
      </section>

      <section className="module">
        <Why
          title="Création Web"
        >
          <WhyPage
            title="Site vitrine basique"
            icon="🌐"
            landingDescription="Design simple et efficace basé sur templates WordPress. Structure standard avec accueil, services, à propos et contact. Responsive design compatible mobile/tablette avec référencement local de base. Maximum 5 pages en 2-3 semaines."
            points={[
              "Design professionnel basé sur templates éprouvés",
              "Structure standard optimisée pour votre activité",
              "Compatible mobile, tablette et ordinateur",
              "Référencement local pour être trouvé facilement",
              "Jusqu'à 5 pages de contenu incluses",
              "Livraison rapide en 2-3 semaines"
            ]}
          />

          <WhyPage
            title="Site vitrine personnalisé"
            icon="🎨"
            landingDescription="Création d'une direction artistique unique avec design sur mesure, animations et interactivité. Jusqu'à 10 pages avec intégration réseaux sociaux avancée, formulaires personnalisés et référencement optimisé. Délai de 4-6 semaines."
            points={[
              "Direction artistique unique créée spécialement",
              "Design sur mesure avec animations fluides",
              "Jusqu'à 10 pages de contenu personnalisé",
              "Intégration avancée des réseaux sociaux",
              "Formulaires de contact sur mesure",
              "Référencement SEO optimisé pour Google"
            ]}
          />

          <WhyPage
            title="Maintenance & Updates"
            icon="🔧"
            landingDescription="Mise à jour et modifications légères avec ajout/modification de contenu, mises à jour visuelles et ajout de fonctionnalités simples. Optimisation de la vitesse incluse. Délai de 24-72h selon la complexité de la demande."
            points={[
              "Ajout et modification de contenu rapidement",
              "Mises à jour visuelles et graphiques",
              "Ajout de fonctionnalités simples",
              "Optimisation de la vitesse de chargement",
              "Maintenance préventive du site",
              "Support technique réactif"
            ]}
          />
        </Why>
      </section>

      <section className="module">
        <How
          steps={[
            {
              title: "Analyse",
              text: "Étude de vos besoins, de votre secteur d'activité et de vos objectifs en ligne. Définition du cahier des charges et du périmètre du projet."
            },
            {
              title: "Conception",
              text: "Création de la maquette graphique et de l'arborescence du site. Validation du design et de la structure avant développement."
            },
            {
              title: "Développement",
              text: "Intégration du design, création des fonctionnalités et optimisation pour tous les appareils. Tests de compatibilité et de performance."
            },
            {
              title: "Contenu",
              text: "Intégration de vos contenus, optimisation SEO et configuration des outils d'analyse. Finalisation et tests complets du site."
            },
            {
              title: "Livraison",
              text: "Mise en ligne du site, formation à l'administration et remise de tous les accès. Support post-livraison pour un démarrage optimal."
            }
          ]}
        />
      </section>

      <section className="module">
        <Prices
          cards={[
            {
              title: "ESSENTIEL",
              price: "800",
              unit: "€",
              features: [
                "Site web professionnel responsive",
                "Optimisation SEO de base",
                "Pages essentielles incluses",
                "Intégration contenus fournis",
                "Liens réseaux sociaux",
                "Formation utilisation (1h)"
              ]
            },
            {
              title: "INTÉGRAL",
              price: "1 500",
              unit: "€",
              features: [
                "Design unique créé sur-mesure",
                "Formulaire de contact avancé",
                "Optimisation SEO complète",
                "Jusqu'à 10 pages personnalisées",
                "Galerie photos/vidéos",
                "Formation complète (2h)"
              ],
            }
          ]}
        />
      </section>
    </>
  );
};

export default CreationWeb;