import React from 'react';
import styles from './hero.module.scss';
import { InfoStat } from '@/core/types';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  stats: InfoStat[];
}

// Map des icônes en fonction de la valeur
const getIcon = (value: string): string => {
  if (value.includes('24/7')) return '🕐';
  if (value.includes('Loire') || value.includes('42')) return '📍';
  if (value.includes('48')) return '⚡';
  return '✨';
};

const InfoCard: React.FC<InfoStat> = ({ value, label }): JSX.Element => (
  <div className={styles['info-card']}>
    <span className={styles['info-icon']}>{getIcon(value)}</span>
    <span className={styles['info-value']}>{value}</span>
    <span className={styles['info-label']}>{label}</span>
  </div>
);

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, stats }) => {
  const handleCTA = (): void => {
    window.open(
      `https://wa.me/33660352267?text=Bonjour, je souhaite un devis gratuit pour mes besoins informatiques !`
    );
  };

  return (
    <div className={styles['hero']}>
      <div className={styles['video-section']}>
        <div className={styles['video-wrapper']}>
          <img
            src="/images/sphere.webp"
            alt="Animation sphère interactive BuzzTech"
            className={styles['background-video']}
            loading="lazy"
            width="240"
            height="240"
          />
          <div className={styles['video-glow']}></div>
        </div>
      </div>

      <div className={styles['hero-content']}>
        <h1 className={styles['hero-title']}>{title}</h1>
        <p className={styles['hero-subtitle']}>{subtitle}</p>
        <button className={styles['hero-cta']} onClick={handleCTA}>
          {ctaText}
        </button>
      </div>

      <div className={styles['info-section']}>
        <div className={styles['info-grid']}>
          {stats.map((info, index) => (
            <InfoCard key={index} value={info.value} label={info.label} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;