import React from 'react';
import styles from './why.module.scss';
import classNames from 'classnames';
import { useScroll } from '@/core/hooks/useScroll';
import { WhyItem } from '@/core/types';

interface WhyPageProps {
  title: string;
  points: string[];
  icon?: string;
  landingDescription?: string;
}

interface WhyProps {
  title: string;
  children: React.ReactElement<WhyPageProps>[];
}

export function WhyPage({ title, points, icon }: WhyPageProps) {
  return (
    <div className={styles.pageContent}>
      <div className={styles.pageHeader}>
        <h3>{title}</h3>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <ul className={styles.points}>
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <button className={styles.contactBtn}>Contactez-nous</button>
    </div>
  );
}

function WhyHome({
  children,
  onPageClick,
}: {
  children: React.ReactElement<WhyPageProps>[];
  onPageClick: (index: number) => void;
}) {
  return (
    <div className={styles.landingContent}>
      {children.map((child, index) => (
        <div key={index} className={styles.landingItem}>
          <h3>{child.props.title}</h3>
          {child.props.landingDescription && (
            <p>
              <span>{child.props.landingDescription}</span>
              <button
                onClick={() => onPageClick(index)}
                aria-label={`Voir les détails de ${child.props.title}`}
              >
                voir plus
              </button>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Why({ title, children }: WhyProps) {
  const totalPages = children.length;

  const { activeItem, containerRef, handleItemClick, isFading } = useScroll({
    totalItems: totalPages,
    initialIndex: -1,
  });

  const handlePageClick = (index: number) => {
    if (index >= 0 && index < children.length) {
      handleItemClick(index);
    }
  };

  const handleLandingClick = () => {
    handleItemClick(-1);
  };

  const getActiveContent = () => {
    if (activeItem === -1) {
      return <WhyHome children={children} onPageClick={handlePageClick} />;
    }

    if (activeItem >= 0 && activeItem < children.length) {
      return children[activeItem];
    }

    return (
      <div className={styles.errorContent}>
        <p>Contenu non disponible</p>
        <button onClick={handleLandingClick}>Retour à l'accueil</button>
      </div>
    );
  };

  return (
    <div
      className={styles.why}
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Navigation des offres de service"
    >
      <div className={styles.bar}></div>

      <div className={styles.content}>
        <div className={styles.nav}>
          <button
            className={classNames(
              styles.indexTitle,
              activeItem === -1 ? styles.active : ''
            )}
            onClick={handleLandingClick}
            aria-pressed={activeItem === -1}
            aria-label={`Retour à la vue d'ensemble: ${title}`}
          >
            {title}
          </button>

          <div className={styles.navigation} role="tablist">
            {children.map((child, index) => (
              <button
                key={`nav-${child.props.title}-${index}`}
                className={classNames(
                  styles.navButton,
                  activeItem === index ? styles.active : ''
                )}
                onClick={() => handlePageClick(index)}
                role="tab"
                aria-selected={activeItem === index}
                aria-controls={`panel-${index}`}
                aria-label={`Offre ${child.props.title}`}
              >
                {child.props.title}
              </button>
            ))}
          </div>
        </div>

        <div
          className={classNames(styles.mainContent, 'fade-content', {
            fading: isFading,
          })}
          role="tabpanel"
          aria-live="polite"
        >
          {getActiveContent()}
        </div>
      </div>
    </div>
  );
}

export default Why;
