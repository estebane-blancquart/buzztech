import Service from '../../modules/service/Service';
import Options from '../../modules/options/Options';
import styles from './configuration.module.scss';

function Configuration() {
  return (
    <>
      <Service
        title="Créez votre ordinateur sur mesure"
        description={
          "Pour les besoins du quotidien. -> Navigation web, réseaux sociaux - Traitement de texte, feuille de calcul - Gaming léger.\n" +
          "Pour réaliser des tâches plus lourdes. -> Montage vidéo ou photo - Gaming - Streaming - Edition et mixage audio.\n" +
          "Pour les tâches les plus exigeantes. -> 3D, CAO, rendu vidéo 4K - Gaming 4K ou VR - Virtualisation, simulation."
        }
      >
        <div className={styles.configurationContent}>
          <pre>
            +------------------------------------------------------+<br />
            <span className={styles.title}>              ★ LE CHOIX DES COMPOSANTS ★              </span><br />
            +------------------------------------------------------+<br />
            | <span>Carte mère      :</span> Format, connecteurs essentiels     |<br />
            | <span>RAM             :</span> Capacité, vitesse                  |<br />
            | <span>Processeur      :</span> Fréquence, cœurs                   |<br />
            | <span>Carte graphique :</span> Mémoire vidéo, performance         |<br />
            | <span>Alimentation    :</span> Puissance, certification           |<br />
            | <span>Refroidissement :</span> Type, compatibilité                |<br />
            | <span>Stockage        :</span> Capacité, technologie              |<br />
            +------------------------------------------------------+<br />
          </pre>

          <pre>
            +------------------------------------------------------+<br />
            <span className={styles.title}>             ★ LE CHOIX DES PÉRIPHÉRIQUES ★              </span><br />
            +------------------------------------------------------+<br />
            | <span>Écran          :</span> Résolution, fréquence d'affichage   |<br />
            | <span>Clavier        :</span> Type de switchs, format             |<br />
            | <span>Souris         :</span> Ergonomie, sensibilité              |<br />
            | <span>Système son    :</span> Casque ou enceintes, micro          |<br />
            | <span>Webcam         :</span> Résolution, micro intégré           |<br />
            | <span>Casque audio   :</span> Type, isolation sonore              |<br />
            | <span>Microphone     :</span> Directionnalité, connectique        |<br />
            +------------------------------------------------------+<br />
          </pre>

        </div>
      </Service >
      <Options
        title1={'Montage'}
        description1={'Assemblage de votre PC avec vos composants.'}
        icon1={'icons/montage.png'}
        price1={50}

        title2={'Création'}
        description2={'Conception de configurations informatiques personnalisées, adaptées à divers usages.'}
        icon2={'icons/creation.png'}
        price2={40}

        title3={'Installation'}
        description3={'Installation du système d’exploitation de votre choix (Windows ou Linux).'}
        icon3={'icons/installation.png'}
        price3={30}

        packTitle={'Forfait'}
        packDescription={'Combinaison des nos services pour une solution informatique entièrement personnalisée et optimisée.'}
        packPrice={100}
      />
    </>
  );
}

export default Configuration;
