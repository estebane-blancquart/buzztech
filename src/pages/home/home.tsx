import React from 'react'
import styles from './home.module.scss';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';

function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <Navigation />
    </div>
  )
}

export default Home;