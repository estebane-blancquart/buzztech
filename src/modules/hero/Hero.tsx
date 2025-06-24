import React from 'react';
import styles from './Hero.module.scss';

interface InfoCardProps {
  value: string;
  label: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ value, label }) => (
  <div className={styles.infoCard}>
    <span className={styles.infoValue}>{value}</span>
    <span className={styles.infoLabel}>{label}</span>
  </div>
);

const Hero: React.FC = () => {
  const infoData = [
    { value: '24/7', label: 'Disponible' },
    { value: '42', label: 'Saint-Étienne' },
    { value: '0€', label: 'Devis' },
  ];

  return (
    <div className={styles.hero}>
      <div className={styles.videoSection}>
        <div className={styles.videoWrapper}>
          <img
            src="/images/sphere.webp"
            alt="Sphere animation"
            className={styles.backgroundVideo}
          />
          <div className={styles.videoGlow}></div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          {infoData.map((info, index) => (
            <InfoCard key={index} value={info.value} label={info.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
