import React from 'react';
import styles from './hero.module.scss';
import { InfoStat } from '@/core/types';
import { companyData } from '@/core/data';

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
  <article className={styles['info-card']}>
    <span className={styles['info-icon']} aria-hidden="true">
      {getIcon(value)}
    </span>
    <div className={styles['info-text']}>
      <span className={styles['info-value']}>{value}</span>
      <span className={styles['info-label']}>{label}</span>
    </div>
  </article>
);

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText, stats }) => {
  const whatsappNumber = companyData.phone.replace(/\s/g, '');
  const whatsappMessage = encodeURIComponent(
    'Bonjour, je souhaite un devis gratuit pour mes besoins informatiques !'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section 
      className={styles['hero']}
      aria-labelledby="hero-title"
    >
      <div className={styles['video-section']}>
        <div className={styles['video-wrapper']}>
          {/* ✅ CORRECTION: lazy loading + decoding async pour performances */}
          <img
            src="/images/sphere.webp"
            alt="Animation sphère interactive BuzzTech"
            className={styles['background-video']}
            loading="lazy"
            decoding="async"
            width="240"
            height="240"
          />
        </div>
      </div>

      <div className={styles['hero-content']}>
        <h1 id="hero-title" className={styles['hero-title']}>
          {title}
        </h1>
        <p className={styles['hero-subtitle']}>{subtitle}</p>
        
        <a
          href={whatsappUrl}
          className={styles['hero-cta']}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ctaText} - Ouvrir WhatsApp pour nous contacter`}
        >
          {ctaText}
        </a>
      </div>

      <div className={styles['info-section']}>
        <div className={styles['info-grid']}>
          {stats.map((info) => (
            <InfoCard key={info.value} value={info.value} label={info.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;