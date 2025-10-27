import React from 'react';
import { Link } from 'react-router-dom';
import styles from './presentation.module.scss';
import { ServiceItem } from '@/core/types';

interface PresentationProps {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

const ServicesItemComponent: React.FC<ServiceItem> = ({
  to,
  icon,
  name,
  description,
  price,
}) => (
  <Link to={to} className={styles['services-item']}>
    <div className={styles['service-left']}>
      <span className={styles['icon']}>{icon}</span>
      <div className={styles['service-info']}>
        <h3 className={styles['service-name']}>{name}</h3>
        <p className={styles['service-desc']}>{description}</p>
      </div>
    </div>
    <div className={styles['service-price']}>{price}</div>
  </Link>
);

const Presentation: React.FC<PresentationProps> = ({
  title,
  subtitle,
  services,
}) => {
  return (
    <div className={styles['presentation']}>
      <div className={styles['header']}>
        <h2 className={styles['title']}>{title}</h2>
        <p className={styles['subtitle']}>{subtitle}</p>
      </div>

      <div className={styles['services-list']}>
        {services.map((service, index) => (
          <ServicesItemComponent key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Presentation;
