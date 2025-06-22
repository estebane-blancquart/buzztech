import React from 'react';
import Why, { WhyPage } from '../modules/why/Why';
import How from '../modules/how/How';
import What from '@/modules/what/What';
import Prices from '@/modules/prices/Prices';

const Depannage: React.FC = () => {
  return (
    <>
      <section className="module">
        <What
          badge="depannage"
          title="Dépannage informatique"
          subtitle="Intervention rapide et diagnostic immédiat - À distance, à l'atelier ou à domicile"
        />
      </section>

      <section className="module">
        <Why
          title="Dépannage"
        >
          <WhyPage
            title="À distance"
            icon="💻"
            landingDescription="Prise en main à distance via TeamViewer/AnyDesk. Idéal pour problèmes logiciels, virus, lenteurs. Assistance téléphonique incluse avec une durée maximale de 1h30. Solution rapide et économique pour la plupart des problèmes courants."
            points={[
              "Résolution de problèmes de démarrage",
              "Élimination de virus/malwares", 
              "Optimisation des performances",
              "Réparation connexion internet",
              "Mise à jour système et logiciels",
              "Installation de logiciels spécifiques"
            ]}
          />

          <WhyPage
            title="À l'atelier"
            icon="🔧"
            landingDescription="Diagnostic approfondi matériel et logiciel avec réparations complexes possibles. Délai d'intervention de 24-72h selon la complexité. Devis gratuit avant toute intervention pour une transparence totale sur les coûts."
            points={[
              "Diagnostic approfondi matériel et logiciel",
              "Réparations complexes (carte mère, alimentation...)",
              "Récupération de données perdues",
              "Remplacement de composants défaillants",
              "Nettoyage complet interne",
              "Tests de stabilité approfondis"
            ]}
          />

          <WhyPage
            title="À domicile"
            icon="🏠"
            landingDescription="Déplacement dans un rayon de 20km autour de Saint-Étienne. Frais kilométriques de 1€/km au-delà. Diagnostic et intervention sur place avec une durée moyenne de 1h30-2h. Idéal pour les configurations réseau et formations."
            points={[
              "Dépannage imprimantes et périphériques",
              "Résolution de problèmes réseaux domestiques",
              "Configuration de nouveaux équipements",
              "Formation à l'utilisation",
              "Installation et configuration logiciels",
              "Optimisation de votre environnement de travail"
            ]}
          />
        </Why>
      </section>

      <section className="module">
        <How
          steps={[
            {
              title: "Analyse",
              text: "Diagnostic complet de votre problème informatique, identification des causes et évaluation des solutions possibles selon le type d'intervention."
            },
            {
              title: "Devis",
              text: "Établissement d'un devis gratuit et détaillé avec explication claire des interventions nécessaires et des coûts. Transparence totale sur la tarification."
            },
            {
              title: "Intervention",
              text: "Réparation professionnelle à distance, en atelier ou à domicile selon la nature du problème, avec utilisation de composants de qualité."
            },
            {
              title: "Test",
              text: "Vérification complète du bon fonctionnement, tests de stabilité et validation que le problème est entièrement résolu avant restitution."
            },
            {
              title: "Suivi",
              text: "Assistance post-intervention pendant 30 jours, garantie sur les réparations et conseils de maintenance préventive pour éviter la récidive."
            }
          ]}
        />
      </section>

      <section className="module">
        <Prices
          cards={[
            {
              title: "REMPLACEMENT FACILE",
              price: "30",
              unit: "€",
              features: [
                "Remplacement RAM",
                "Changement stockage (SSD/HDD)",
                "Installation simple",
                "Test de fonctionnement",
                "Garantie pièce"
              ]
            },
            {
              title: "NETTOYAGE COMPLET",
              price: "50",
              unit: "€",
              features: [
                "Dépoussiérage complet",
                "Nettoyage ventilateurs",
                "Vérification thermique",
                "Optimisation refroidissement",
                "Test de stabilité"
              ]
            },
            {
              title: "NETTOYAGE LOGICIEL",
              price: "50",
              unit: "€",
              features: [
                "Restauration système",
                "Suppression de virus",
                "Optimisation démarrage",
                "Mise à jour sécurité",
                "Formation prévention"
              ]
            }
          ]}
        />
      </section>
    </>
  );
};

export default Depannage;