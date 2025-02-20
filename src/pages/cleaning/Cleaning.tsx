import Service from '../../modules/service/Service';
import Options from '../../modules/options/Options';
import styles from './cleaning.module.scss';

interface WindowProps {
  type: string;
  li1: React.ReactNode;
  li2: React.ReactNode;
  li3: React.ReactNode;
  li4: React.ReactNode;
}

function Window({ type, li1, li2, li3, li4 }: WindowProps) {
  return (
    <div className={styles.window}>
      <div></div>
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
            li1={<>★ Éviter la&nbsp;<strong>surchauffe</strong></>}
            li2={<>★ Préserver l'esthétique et la&nbsp;<strong>propreté</strong></>}
            li3={<>★ Réduire les risques de&nbsp;<strong>panne</strong></>}
            li4={<>★ Améliorer les&nbsp;<strong>performances</strong></>} />
          <Window
            type={'Nettoyage logiciel'}
            li1={<>★ Optimiser les&nbsp;<strong>performances</strong></>}
            li2={<>★ Améliorer la&nbsp;<strong>sécurité</strong></>}
            li3={<>★ Allonger la&nbsp;<strong>durée de vie</strong> du stysyème</>}
            li4={<>★ Gagner de l'espace de&nbsp;<strong>stockage</strong></>} />
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
