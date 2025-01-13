import React from 'react'
import styles from './presentation.module.scss';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import Service from '../../components/service/service';
import Package from '../../components/package/package';

function Development() {
  return (
    <div className={styles.presentation}>
      <Header />
      <Navigation />

      <Service
        id="basic-development"
        title="SITE VITRINE SIMPLE"
        description="Conception et développement de sites web pour promouvoir vos services ou produits."
        price=" 500€."
      />
      <Service
        id="advanced-development"
        title="INTERFACE UTILISATEUR INTERACTIVE"
        description="Création d'interfaces riches et interactives avec des animations avancées."
        price=" 800€."
      />
      <Service
        id="update"
        title="MODIFICATION OU MISE À JOUR"
        description="Service de modifications légères ou de mise à jour pour les sites déjà créés par nos soins."
        price=" 50€/heure"
      />

      <div className={styles.package}>
        <Package
          id="development-package"
          title="Forfait"
          summary="SITE WEB + MODIFICATION/MISE A JOUR"
          description="Développement de votre site web associé à un service de mise à jour pour une période de 6 mois - 4h par mois."
          price=" Prix du site + 600€.."
        />
      </div>
      <img className={styles.sphere} src="images/sphere.gif" alt="" />
    </div>
  )
}

export default Development;