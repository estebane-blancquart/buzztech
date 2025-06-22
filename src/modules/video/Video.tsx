import React, { useState } from 'react';
import styles from './Video.module.scss';

const Video: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className={`module ${styles.video}`}>
      <div className={styles.content}>
        <div className={styles.videoWrapper}>
          {!isPlaying ? (
            <div className={styles.placeholder} onClick={handlePlay}>
              <div className={styles.playButton}>
                <span>▶</span>
              </div>
            </div>
          ) : (
            <div className={styles.videoPlayer}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                title="Présentation vidéo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
        
        <div className={styles.text}>
          <h2 className={styles.title}>Ne ratez rien !</h2>
          <p className={styles.description}>
            Suivez-moi sur mes réseaux pour des conseils tech.
          </p>
          
          <div className={styles.highlights}>
            <div className={styles.highlight}>
              <span className={styles.icon}>💡</span>
              <span>Facebook</span>
            </div>
            <div className={styles.highlight}>
              <span className={styles.icon}>🏷️</span>
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;