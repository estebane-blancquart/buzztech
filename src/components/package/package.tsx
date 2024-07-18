import React from 'react';
import styles from './package.module.scss';

interface PackageProps {
    id: string;
    title: string;
    summary: string;
    description: string;
    price: string;
}

export default function Package({ id, title, summary, description, price }: PackageProps) {
    return (
        <>
            <section id={id}>
                <h2>{title}</h2>
                <p>{summary}</p>
                <p>{description}</p>
                <p><span className={styles.price}>Tarif:</span>{price}</p>
                <button>Demander un devis.</button>
            </section>
        </>
    );
}
