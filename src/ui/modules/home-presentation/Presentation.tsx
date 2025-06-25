import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Presentation.module.scss';
import { ServiceItem } from '@/core/types';

interface PresentationProps {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

const ServiceItemComponent: React.FC<ServiceItem> = ({
  to,
  icon,
  name,
  description,
  price,
}) => (
  <Link to={to} className={styles.serviceItem}>
    <div className={styles.serviceLeft}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.serviceInfo}>
        <h3 className={styles.serviceName}>{name}</h3>
        <p className={styles.serviceDesc}>{description}</p>
      </div>
    </div>
    <div className={styles.servicePrice}>{price}</div>
  </Link>
);

const Presentation: React.FC<PresentationProps> = ({
  title,
  subtitle,
  services,
}) => {
  return (
    <div className={styles.presentation}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.servicesList}>
        {services.map((service, index) => (
          <ServiceItemComponent key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Presentation;
