import What from "../../modules/what/What";
import Why from "../../modules/why/Why";
import How from "../../modules/how/How";
import Prices from "../../modules/prices/Prices";

function Configuration() {
  return (
    <>
      <What />
      <Why />
      <How
        step1={"Nous discutons de vos besoins, usages et budget pour définir la configuration idéale."}
        step2={"Nous choisissons ensemble des pièces de qualité, compatibles entre elles et adaptées à votre utilisation."}
        step3={"Nous assemblons votre PC dans un environnement contrôlé, en respectant les meilleures pratiques."}
        step4={"Chaque machine subit une batterie de tests (stress test, benchmarks) pour vérifier sa stabilité et ses performances."}
        step5={"Notre équipe reste disponible pour répondre à vos questions et vous accompagner dans la prise en main."}
      />
      <Prices />
    </>
  );
}

export default Configuration;