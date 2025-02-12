import React, { ReactNode } from 'react';
import styles from './service.module.scss';
import Button from '../../components/button/Button';

interface ServiceProps {
  title: string;
  description: string;
  children: ReactNode;
}

function Service({ title, description, children }: ServiceProps) {

  return (
    <section className={styles.service}>
      <h2>{title}</h2>
      <p>{description}</p>

      {children}

      <Button />
    </section>
  );
}

export default Service;
