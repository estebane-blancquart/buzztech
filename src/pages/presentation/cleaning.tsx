import React from 'react'
import styles from './presentation.module.scss';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import Service from '../../components/service/service';
import Package from '../../components/package/package';

function Cleaning() {
  return (
    <div className={styles.presentation}>
      <Header />
      <Navigation />

      <Service
        id="hardware-cleaning"
        title="NETTOYAGE MATERIEL"
        description="Nettoyage physique, incluant dépoussiérage interne, nettoyage des composants."
        price=" 40€"
      />
      <Service
        id="software-cleaning"
        title="NETTOYAGE LOGICIEL"
        description="Nettoyage logiciel de base, incluant la suppression de logiciels malveillants et l'optimisation du démarrage."
        price=" 50€"
      />
      <Service
        id="security"
        title="SECURISATION"
        description="Protégez votre système contre les menaces en ligne pour garantir son bon fonctionnement à long terme."
        price=" 60€"
      />

      <div className={styles.package}>
        <Package
          id="cleaning-package"
          title="Forfait"
          summary="NETTOYAGE COMPLET + SECURISATION"
          description="Remettez votre ordinateur à neuf avec un nettoyage matériel, optimisation du système et sécurisation."
          price=" 120€."
        />
      </div>
      <img className={styles.sphere} src="images/sphere.gif" alt="" />
    </div>
  )
}

export default Cleaning;