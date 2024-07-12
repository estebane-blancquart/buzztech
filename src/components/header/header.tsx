import React from 'react'
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

function Header() {
  return (
    <header>
      <h1 className={styles.brand}>
        <Link to="/">
          <span className={styles.brandName}>BUZZTECH</span>
          <br />
          <span className={styles.brandService}>SERVICES INFORMATIQUES</span>
        </Link>
      </h1>
    </header>
  )
}

export default Header;