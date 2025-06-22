// components/Hero/Hero.tsx
import React from 'react';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  return (
    <section className={`module ${styles.hero}`}>
      <div className={styles.container}>
      
        <div className={styles.videoSection}>
          <div className={styles.videoWrapper}>
            <img src="/images/neutre.png" alt="" className={styles.backgroundVideo} />
            {/* <video
              src="/images/sphere.mp4"
              className={styles.backgroundVideo}
              autoPlay
              loop
              muted
              playsInline
            /> */}
            <div className={styles.videoGlow}></div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoValue}>24/7</span>
              <span className={styles.infoLabel}>Disponible</span>
            </div>
            
            <div className={styles.infoCard}>
              <span className={styles.infoValue}>42</span>
              <span className={styles.infoLabel}>Saint-Étienne</span>
            </div>
            
            <div className={styles.infoCard}>
              <span className={styles.infoValue}>0€</span>
              <span className={styles.infoLabel}>Devis</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;