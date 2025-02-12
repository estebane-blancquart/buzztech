import Service from '../../modules/service/Service';
import Options from '../../modules/options/Options';
import styles from './configuration.module.scss';

function Configuration() {
  return (
    <>
      <Service
        title={'Créez votre ordinateur sur mesure'}
        description={"Pour les besoins du quotidien. -> Navigation web, réseaux sociaux - Traitement de texte, feuille de calcul - Gaming léger Pour réaliser des tâches plus lourdes. -> Montage vidéo ou photo - Gaming - Streaming - Edition et mixage audio \n Pour les tâches les plus exigeantes. -> 3D, CAO, rendu vidéo 4K - Gaming 4K ou VR - Virtualisation, simulation"}
      >
=          <div className={styles.configurationContent}>
            <pre>
              +------------------------------------------------------+<br />
              ★ LE CHOIX DES COMPOSANTS ★                            <br />
              +------------------------------------------------------+<br />
              | Carte mère      : Format, connecteurs essentiels     |<br />
              | RAM             : Capacité, vitesse                  |<br />
              | Processeur      : Fréquence, cœurs                   |<br />
              | Carte graphique : Mémoire vidéo, performance         |<br />
              | Alimentation    : Puissance, certification           |<br />
              | Refroidissement : Type, compatibilité                |<br />
              | Stockage        : Capacité, technologie              |<br />
              +------------------------------------------------------+<br />
            </pre>

            <pre>
              +------------------------------------------------------+<br />
              ★ LE CHOIX DES PÉRIPHÉRIQUES ★                         <br />
              +------------------------------------------------------+<br />
              | Écran          : Résolution, fréquence d'affichage   |<br />
              | Clavier        : Type de switchs, format             |<br />
              | Souris         : Ergonomie, sensibilité              |<br />
              | Système son    : Casque ou enceintes, micro          |<br />
              | Webcam         : Résolution, micro intégré           |<br />
              | Casque audio   : Type, isolation sonore              |<br />
              | Microphone     : Directionnalité, connectique        |<br />
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
