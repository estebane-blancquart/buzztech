import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

/**
 * Composant Image optimisé avec lazy loading par défaut
 * @param priority - Si true, charge l'image immédiatement (pour les images above-the-fold)
 */
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  priority = false,
  className,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      decoding="async"
      className={className}
      {...props}
    />
  );
};

export default Image;
