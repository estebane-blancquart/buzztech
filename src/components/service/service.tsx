import React from 'react';
import styles from './service.module.scss';

interface ServiceProps {
    id: string;
    title: string;
    description: string;
    price: string;
}

export default function Service({ id, title, description, price }: ServiceProps) {
    return (
        <>
            <section id={id}>
                <h2>{title}</h2>
                <p>{description}</p>
                <p><span className={styles.prices}>Tarif:</span>{price}</p>
            </section>
        </>
    );
}
