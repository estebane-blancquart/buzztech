import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Presentation.module.scss';

interface ServiceItemProps {
  to: string;
  icon: string;
  name: string;
  description: string;
  price: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ to, icon, name, description, price }) => (
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

const Presentation: React.FC = () => {
  const services = [
    {
      to: '/depannage',
      icon: '🔧',
      name: 'Dépannage',
      description: 'Réparation rapide • À distance, atelier ou domicile',
      price: 'À partir de 30€'
    },
    {
      to: '/configuration',
      icon: '⚙️',
      name: 'Configuration',
      description: 'Assemblage PC sur mesure • Selon budget et besoins',
      price: 'À partir de 70€'
    },
    {
      to: '/creation-web',
      icon: '💻',
      name: 'Création Web',
      description: 'Sites vitrines professionnels • Responsive et optimisés',
      price: 'À partir de 800€'
    }
  ];

  return (
    <div className={styles.presentation}>
      <div className={styles.header}>
        <h2 className={styles.title}>Nos services</h2>
        <p className={styles.subtitle}>Solutions complètes pour tous vos besoins informatiques</p>
      </div>

      <div className={styles.servicesList}>
        {services.map((service, index) => (
          <ServiceItem key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default Presentation;