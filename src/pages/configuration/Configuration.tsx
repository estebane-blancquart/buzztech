import What from "../../modules/what/What";
import Why, { WhyPage } from "../../modules/why/Why";
import How from "@/modules/How/How";
import Prices from "../../modules/prices/Prices";

function Configuration() {
  const howSteps = [
    {
      title: "Premier contact",
      text: "Nous discutons de vos besoins, usages et budget pour définir la configuration idéale.",
    },
    {
      title: "Diagnostic approfondi",
      text: "Nous élaborons l'architecture de votre site et créons des maquettes graphiques.",
    },
    {
      title: "Intervention ciblée",
      text: "Nous transformons les maquettes approuvées en site fonctionnel, en intégrant toutes les fonctionnalités prévues et en optimisant les performances techniques.",
    },
    {
      title: "Tests de validation",
      text: "Nous intégrons vos textes, images et vidéos, ou créons du contenu optimisé selon vos besoins, pour donner vie à votre site.",
    },
    {
      title: "Prévention et conseils",
      text: "Nous testons rigoureusement votre site sur différents appareils et navigateurs pour garantir une expérience utilisateur parfaite et des performances optimales.",
    },
  ];

  return (
    <>
      <What />

      <Why title="Configuration">
        <WhyPage
          title="BUREAUTIQUE"
          points={[
            "Processeurs rapides pour les tâches administratives",
            "Mémoire RAM suffisante pour les applications bureautiques",
            "Stockage de données sécurisé et fiable",
            "Systèmes d'exploitation stables et sécurisés",
            "Connexion Wi-Fi rapide et fiable",
            "Logiciels de productivité intégrés",
          ]}
          icon=""
        />
        <WhyPage
          title="CREATION"
          points={[
            "Cartes graphiques haute performance pour le rendu 3D",
            "Processeurs multis-cœurs pour les tâches de montage vidéo",
            "Mémoire RAM étendue pour les applications de création",
            "Stockage de données haute capacité pour les fichiers multimédias",
            "Écrans haute résolution pour la précision et la précision",
            "Logiciels de création professionnels intégrés",
          ]}
          icon=""
        />
        <WhyPage
          title="JEU"
          points={[
            "Cartes graphiques haute performance pour les jeux 4K",
            "Processeurs rapides pour les jeux en ligne",
            "Mémoire RAM rapide pour les jeux à haute charge",
            "Stockage de données SSD pour les chargements rapides",
            "Systèmes de refroidissement silencieux et efficaces",
            "Écrans haute fréquence pour une expérience de jeu fluide",
          ]}
          icon=""
        />
      </Why>

      <How steps={howSteps} />

      <Prices />
    </>
  );
}

export default Configuration;
