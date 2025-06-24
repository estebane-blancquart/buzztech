import React, { useState } from 'react';
import styles from './Video.module.scss';

interface HighlightProps {
  icon: string;
  platform: string;
}

const Highlight: React.FC<HighlightProps> = ({ icon, platform }) => (
  <div className={styles.highlight}>
    <span className={styles.icon}>{icon}</span>
    <span>{platform}</span>
  </div>
);

const Video: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const highlights = [
    { icon: '💡', platform: 'Facebook' },
    { icon: '🏷️', platform: 'Instagram' },
  ];

  return (
    <div className={styles.video}>
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
              src="https://player.vimeo.com/video/1054567107?h=57aff06028&autoplay=1"
              title="Présentation vidéo"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
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
          {highlights.map((highlight, index) => (
            <Highlight key={index} {...highlight} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
