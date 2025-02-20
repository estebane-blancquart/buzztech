import Service from '../../modules/service/Service';
import Options from '../../modules/options/Options';
import styles from './repair.module.scss';

function Repair() {
  return (
    <>
      <Service
        title={'Bénéficiez d’une assistance technique sur mesure'}
        description={'Notre objectif: diagnostiquer et résoudre vos problèmes rapidement pour que vous puissiez retrouver le plein usage de votre matériel en toute sérénité avec des solutions adaptées à vos besoins.'}
      >
        <div className={styles.repairContent}>
            <pre className={styles.hardware}>
              <span>Problème matériel </span>            <br /> <br />
                │                              <br />
                ├── Ordinateur ne s'allume plus<br />
                │                              <br />
                ├── Périphériques non détectés <br />
                │                              <br />
                │                              <br />
                │                              <br />
                ├─────── Écran bleu            <br />
                │                              <br />
                └─────── Surchauffe            <br />
            </pre>

            <pre className={styles.software}>
                            <span>Problèmes logiciels</span><br /> <br />
                                              │<br />
                Wi-Fi qui ne fonctionne pas ──┤<br />
                                              │<br />
                     Problèmes de démarrage ──┤<br />
                                              │<br />
                                              │<br />
                                              │<br />
                   Mot de passe oublié ───────┤<br />
                                              │<br />
                   Plantages fréquents ───────┘<br />
            </pre>
        </div>
      </Service>
      <Options
        title1={'A Distance'}
        description1={'Assistance pour la résolution rapide de problèmes informatiques sans quitter votre domicile. Idéal pour des problèmes de configuration logiciel.'}
        icon1={'icons/distance.png'}
        price1={40}

        title2={'A l’atelier'}
        description2={'Prise en charge complète des problèmes logiciels et matériels nécessitant un diagnostic approfondi au seins de notre atelier.'}
        icon2={'icons/atelier.png'}
        price2={50}

        title3={'A Domicile'}
        description3={'Service complet de dépannage informatique directement chez vous, couvrant Saint-Etienne et ses environs.'}
        icon3={'icons/domicile.png'}
        price3={60}

        packTitle={'Forfait'}
        packDescription={'Demi-journée de service de dépannage informatique, idéal pour des interventions plus longues.'}
        packPrice={200}
      />
    </>
  );
}

export default Repair;
