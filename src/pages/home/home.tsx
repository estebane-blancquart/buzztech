import React from 'react';
import styles from './home.module.scss';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import Contact from '../../components/contact/contact';

function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <Navigation />
      <Contact />

      <div className={styles.survey}>
        <h2>Obtenez une estimation gratuite et rapide.</h2>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdjyQ4WdzbyPgZ2iGqKjwTObb3-Lt7Ns1pDEKv0DOfjQacK8Q/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          DEMANDEZ UN DEVIS.
        </a>
      </div>

      <img
        className={styles.sphere}
        src="images/sphere.gif"
        alt="Animation décorative d'une sphère"
      />
    </div>
  );
}

export default Home;
