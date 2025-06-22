import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Presentation.module.scss';

const Presentation: React.FC = () => {
  return (
    <section className={`module ${styles.services}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nos services</h2>
          <p className={styles.subtitle}>Solutions complètes pour tous vos besoins informatiques</p>
        </div>

        <div className={styles.servicesList}>
          <Link to="/depannage" className={styles.serviceItem}>
            <div className={styles.serviceLeft}>
              <span className={styles.icon}>🔧</span>
              <div className={styles.serviceInfo}>
                <h3 className={styles.serviceName}>Dépannage</h3>
                <p className={styles.serviceDesc}>Réparation rapide • À distance, atelier ou domicile</p>
              </div>
            </div>
            <div className={styles.servicePrice}>À partir de 30€</div>
          </Link>

          <Link to="/configuration" className={styles.serviceItem}>
            <div className={styles.serviceLeft}>
              <span className={styles.icon}>⚙️</span>
              <div className={styles.serviceInfo}>
                <h3 className={styles.serviceName}>Configuration</h3>
                <p className={styles.serviceDesc}>Assemblage PC sur mesure • Selon budget et besoins</p>
              </div>
            </div>
            <div className={styles.servicePrice}>À partir de 70€</div>
          </Link>

          <Link to="/creation-web" className={styles.serviceItem}>
            <div className={styles.serviceLeft}>
              <span className={styles.icon}>💻</span>
              <div className={styles.serviceInfo}>
                <h3 className={styles.serviceName}>Création Web</h3>
                <p className={styles.serviceDesc}>Sites vitrines professionnels • Responsive et optimisés</p>
              </div>
            </div>
            <div className={styles.servicePrice}>À partir de 800€</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Presentation;