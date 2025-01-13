import React from 'react'
import styles from './presentation.module.scss';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import Service from '../../components/service/service';
import Package from '../../components/package/package';

function Repair() {
  return (
    <div className={styles.presentation}>
      <Header />
      <Navigation />

      <Service
        id="depannage-distance"
        title="DÉPANNAGE À DISTANCE"
        description="Assistance pour la résolution rapide de problèmes informatiques sans quitter votre domicile."
        price=" 40€/heure."
      />
      <Service
        id="depannage-atelier"
        title="DÉPANNAGE À L'ATELIER"
        description="Prise en charge complète des problèmes logiciels et matériels avec diagnostic approfondi dans notre atelier."
        price=" 50€/heure."
      />
      <Service
        id="depannage-domicile"
        title="DÉPANNAGE À DOMICILE"
        description="Service complet de dépannage informatique directement chez vous, couvrant Saint-Etienne et ses environs."
        price=" 60€/heure."
      />

      <div className={styles.package}>
        <Package
          id="repair-package"
          title="Forfait"
          summary="DEMI JOURNEE - 4H"
          description="Demi-journée de service de dépannage informatique, idéal pour des interventions plus longues."
          price=" 200€."
        />
      </div>
      <img className={styles.sphere} src="images/sphere.gif" alt="" />
    </div>
  )
}

export default Repair;