import React from 'react'
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
    </div>
  )
}

export default Home;