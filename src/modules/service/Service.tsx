import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './service.module.scss';
import Button from '../../components/button/Button';

interface ServiceProps {
  title: string;
  description: string;
  children: ReactNode;
}

const Service = ({ title, description, children }: ServiceProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section ref={ref} className={`${styles.service} ${isVisible ? styles.show : ''}`}>
      <h2>{title}</h2>
      <p>{description}</p>

      {children}

      <Button />
    </section>
  );
};

export default Service;
