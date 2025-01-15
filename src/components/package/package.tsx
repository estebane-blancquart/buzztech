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
            <section className={styles.pack} id={id}>
                <h2>{title}</h2>
                <p>{summary}</p>
                <p>{description}</p>
                <p><span className={styles.prices}>Tarif:</span>{price}</p>
                <button><a href="https://tally.so/r/w4L7ek" target="_blank">Demander un devis.</a></button>
            </section>
        </>
    );
}
