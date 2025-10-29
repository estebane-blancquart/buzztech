import React, { useState } from 'react';
import styles from './video.module.scss';
import type { VideoHighlight, VideoProps } from '@/core/types';

const HighlightComponent: React.FC<{ highlight: VideoHighlight }> = ({
  highlight,
}): JSX.Element => (
  <div className={styles['highlight']}>
    <span className={styles['icon']}>{highlight.icon}</span>
    <span>{highlight.platform}</span>
  </div>
);

const Video: React.FC<VideoProps> = ({
  title = 'Ne ratez rien !',
  description = 'Suivez-moi sur mes réseaux pour des conseils tech.',
  videoUrl = 'https://player.vimeo.com/video/1054567107?h=57aff06028&autoplay=1',
  highlights = [
    { icon: '💡', platform: 'Facebook' },
    { icon: '🏷️', platform: 'Instagram' },
  ],
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (): void => {
    setIsPlaying(true);
  };

  return (
    <div className={styles['video']}>
      <div className={styles['text']}>
        <h2 className={styles['title']}>{title}</h2>
        <p className={styles['description']}>{description}</p>
      </div>

      <div className={styles['content-grid']}>
        <div className={styles['video-wrapper']}>
          {!isPlaying ? (
            <div className={styles['placeholder']} onClick={handlePlay}>
              <div className={styles['play-button']}>
                <span>▶</span>
              </div>
            </div>
          ) : (
            <div className={styles['video-player']}>
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="Présentation vidéo"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        <div className={styles['highlights']}>
          {highlights.map((highlight, index) => (
            <HighlightComponent key={index} highlight={highlight} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
