import React from 'react';
import styles from './what.module.scss';

interface WhatProps {
  badge: string;
  title: string;
  subtitle: string;
  scrollText?: string;
}

const What: React.FC<WhatProps> = ({ 
  badge, 
  title, 
  subtitle,
  scrollText = "Découvrir le service"
}) => {
  const handleScrollClick = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.what}>
      <div className={styles.badge}>{badge}</div>

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.subtitle}>{subtitle}</p>

      <div className={styles.scrollIndicator} onClick={handleScrollClick}>
        <span>{scrollText}</span>
        <div className={styles.arrow}>↓</div>
      </div>
    </div>
  );
};

export default What;