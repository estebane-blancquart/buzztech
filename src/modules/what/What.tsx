// modules/what/What.tsx
import React from 'react';
import styles from './What.module.scss';

interface WhatProps {
  service: 'depannage' | 'configuration' | 'creation-web';
  title: string;
  subtitle: string;
}

const What: React.FC<WhatProps> = ({
  service,
  title,
  subtitle
}) => {
  
  const serviceConfig = {
    depannage: { 
      accent: '#667eea',
      badge: 'Service technique'
    },
    configuration: { 
      accent: '#f093fb',
      badge: 'PC sur mesure'
    },
    'creation-web': { 
      accent: '#4facfe',
      badge: 'Développement web'
    }
  };

  const config = serviceConfig[service];

  return (
    <section className={`module ${styles.what}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          
          <div className={styles.badge}>
            {config.badge}
          </div>
          
          <h1 className={styles.title}>
            {title}
          </h1>
          
          <p className={styles.subtitle}>
            {subtitle}
          </p>
          
          <div className={styles.scrollIndicator}>
            <span>Découvrir le service</span>
            <div className={styles.arrow}>↓</div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default What;