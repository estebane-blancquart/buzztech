import What from "../../modules/what/What";
import Why from "../../modules/why/Why";
import How from "../../modules/how/How";
import Prices from "../../modules/prices/Prices";

function Repair() {
  return (
    <>
      <What />
      {/* <Why /> */}
      {/* <How
        step1={"Nous recueillons les informations sur les symptômes et le contexte d'apparition du problème."} 
        step2={"Nous procédons à une analyse plus approdondie à la suite de laquelle nous vous soumettons un devis."} 
        step3={"Après votre accord, nous procédons à la réparation avec les techniques et pièces appropriées."} 
        step4={"Nous vérifions que le problème est entièrement résolu par une série de tests spécifiques."} 
        step5={"Nous vous fournissons des recommandations pour éviter la récurrence du problème."} 
      /> */}
      <Prices />
    </>
  );
}

export default Repair;