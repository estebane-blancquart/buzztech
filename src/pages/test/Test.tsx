import How from "@/modules/How/How";

const Test = () => {
  const howSteps = [
    {
      title: "Premier contact",
      text: "Nous commençons par comprendre en profondeur votre activité, vos objectifs, votre cible et votre positionnement.",
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
    <section className="max-w-300 mx-auto py-20 bg-green">
      <p className="bg-red-500 h-200">Test</p>
      <How steps={howSteps} />
      <p>Test 2</p>

    </section>
  );
};

export default Test;
