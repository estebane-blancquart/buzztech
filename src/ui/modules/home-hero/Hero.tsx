import React from 'react';
import styles from './hero.module.scss';
import { InfoStat } from '@/core/types';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  stats: InfoStat[];
}

const InfoCard: React.FC<InfoStat> = ({ value, label }) => (
  <div className={styles.infoCard}>
    <span className={styles.infoValue}>{value}</span>
    <span className={styles.infoLabel}>{label}</span>
  </div>
);

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, stats }) => {
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

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        <button className={styles.heroCta}>{ctaText}</button>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          {stats.map((info, index) => (
            <InfoCard key={index} value={info.value} label={info.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
