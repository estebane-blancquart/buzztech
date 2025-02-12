import Service from '../../modules/service/Service';
import Options from '../../modules/options/Options';
import styles from './cleaning.module.scss';

interface WindowProps {
  type: string;
  li1: string;
  li2: string;
  li3: string;
  li4: string;
}

function Window({ type, li1, li2, li3, li4 }: WindowProps) {
  return (
    <div className={styles.window}>
      <h3>{type}</h3>
      <ul>
        <li>{li1}</li>
        <li>{li2}</li>
        <li>{li3}</li>
        <li>{li4}</li>
      </ul>
    </div>
  )
};

function Cleaning() {
  return (
    <>
      <Service
        title={'Entretenez votre matériel'}
        description={'Que votre ordinateur soit lent, bruyant, ou sale, il est parfois indispensable d’effectuer un nettoyage des composants et des logiciels afin de conserver la bonne utilisation de votre ordinateur et de prévenir d’éventuelles pannes.'}
      >
        <div className={styles.cleaningContent}>
          <Window
            type={'Nettoyage matériel'}
            li1={'Éviter la surchauffe'}
            li2={'Préserver l esthétique et la propreté'}
            li3={'Réduire les risques de panne'}
            li4={'Améliorer les performances'} />
          <Window
            type={'Nettoyage logiciel'}
            li1={'Optimiser les performances'}
            li2={'Améliorer la sécurité'}
            li3={'Allonger la durée de vie du stysyème'}
            li4={'Gagner de l espace de stockage'} />
        </div>
      </Service>

      <Options
        title1={'Matériel'}
        description1={'Nettoyage physique, incluant dépoussiérage interne et nettoyage des composants.'}
        icon1={'icons/materiel.png'}
        price1={40}

        title2={'Logiciel'}
        description2={"Nettoyage logiciel de base, incluant la suppression de logiciels malveillants et l'optimisation du démarrage."}
        icon2={'icons/logiciel.png'}
        price2={50}

        title3={'Securisation'}
        description3={'Protection de votre système contre les menaces en ligne pour garantir son bon fonctionnement à long terme.'}
        icon3={'icons/securisation.png'}
        price3={60}

        packTitle={'Forfait'}
        packDescription={'Remettez votre ordinateur à neuf avec un nettoyage matériel, optimisation du système et sécurisation.'}
        packPrice={120}
      />
    </>
  );
}

export default Cleaning;
