import React, { useState } from 'react';
import styles from './contact.module.scss';

function Contact() {
  return (
    <div className={styles.contact}>
      <div className={styles.mail}>
        <img src="icons/mail.png" alt="" />
        <p>buzztech@proton.me</p>
      </div>
      <div className={styles.phone}>
        <img src="icons/phone.png" alt="" />
        <p>07 77 03 55 68</p>
      </div>
      <div className={styles.facebook}>
        <img src="icons/facebook.png" alt="" />
        <p>BuzzTech</p>
      </div>
      <div className={styles.snapchat}>
        <img src="icons/snapchat.png" alt="" />
        <p>BuzzTech</p>
      </div>
    </div>
  );
}

export default Contact;