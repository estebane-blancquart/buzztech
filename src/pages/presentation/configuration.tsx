import React from 'react'
import styles from './presentation.module.scss';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import Service from '../../components/service/service';
import Package from '../../components/package/package';

function Configuration() {
  return (
    <div className={styles.presentation}>
      <Header />
      <Navigation />

      <Service
        id="creation"
        title="CRÉATION DE CONFIGURATION SUR MESURE"
        description="Conception de configurations informatiques personnalisées, adaptées à divers usages."
        price=" 60€ pour la consultation et la conception."
      />
      <Service
        id="assembly"
        title="MONTAGE DE COMPOSANTS"
        description="Assemblage de PC avec les composants du client."
        price=" À partir de 50€."
      />
      <Service
        id="installation"
        title="INSTALLATION DE WINDOWS"
        description="Installation de la version de Windows de votre choix."
        price=" 30€."
      />

      <div className={styles.package}>
        <Package
          id="configuration-package"
          title="Forfait"
          summary="CREATION, MONTAGE, INSTALLATION"
          description="Combinaison des mes services pour une solution informatique entièrement personnalisée et optimisée."
          price=" 120€"
        />
      </div>
      <img className={styles.sphere} src="images/sphere.gif" alt="" />
    </div>
  )
}

export default Configuration;