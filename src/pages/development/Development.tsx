import Service from '../../modules/service/Service';
import Options from '../../modules/options/Options';
import styles from './development.module.scss';

interface FolderProps {
  title: string;
  description: React.ReactNode;
}

function Folder({ title, description }: FolderProps) {
  return (
    <div className={styles.folder}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
function Development() {
  return (
    <>
      <Service
        title={'Boostez votre image en ligne'}
        description={'Un site vitrine permet de présenter votre activité, vos services et vos valeurs de façon claire et professionnelle. Il attire l’attention, inspire confiance et renforce votre crédibilité, tout en posant les bases d’une relation durable avec vos clients.'}
      >
        <div className={styles.developmentContent}>
          <Folder
            title={'Design'}
            description={<>Une expérience <strong>ergonomique</strong>, <strong>esthétique</strong>, et <strong>adaptable</strong> sur tous les appareils</>}
          />
          <Folder
            title={'Contenu'}
            description={<>Un contenu pertinent <strong>optimisé</strong> pour les moteurs de recherche pour améliorer son <strong>référencement</strong></>}
          />
          <Folder
            title={'Performance'}
            description={<>Un temps de chargement <strong>rapide</strong> et un hébergement <strong> fiable</strong></>}
          />
          <Folder
            title={'Maintenance'}
            description={<>Mise à jour des <strong>informations</strong> et des <strong>médias</strong></>}
          />
        </div>
      </Service>
      <Options
        title1={'Basique'}
        description1={'Création d’un design simple et développement d’une structure de contenu standard.'}
        icon1={'icons/basique.png'}
        price1={400}

        title2={'Personnalisée'}
        description2={'Création d’un design adapté à l’identité visuelle de votre entreprise et mise en place de fonctionnalités interactives.'}
        icon2={'icons/personnalisee.png'}
        price2={800}

        title3={'Mise à jour'}
        description3={'Service de modifications légères ou de mise à jour pour les sites déjà créés par nos soins.'}
        icon3={'icons/mise_a_jour.png'}
        price3={50}

        packTitle={'Forfait'}
        packDescription={'Développement de votre site web associé à un service de mise à jour pour une période de 6 mois - 4h par mois.'}
        packPrice={600}
      />
    </>
  );
}

export default Development;
