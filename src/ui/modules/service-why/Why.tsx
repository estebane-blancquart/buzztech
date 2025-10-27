import React from 'react';
import styles from './why.module.scss';
import classNames from 'classnames';
import { useScroll } from '@/core/hooks/useScroll';
import { WhyPageProps } from '@/core/types';

interface WhyProps {
  title: string;
  children: React.ReactElement<WhyPageProps>[];
}

export function WhyPage({ title, points, icon }: WhyPageProps): JSX.Element {
  const handleContact = (): void => {
    const message = `Bonjour, je souhaite des informations sur votre service: ${title}`;
    window.open(
      `https://wa.me/33660352267?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <div className={styles['page-content']}>
      <div className={styles['page-header']}>
        <h3>{title}</h3>
        {icon && <span className={styles['icon']}>{icon}</span>}
      </div>
      <ul className={styles['points']}>
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
      <button className={styles['contact-btn']} onClick={handleContact}>
        Contactez-nous
      </button>
    </div>
  );
}

function WhyHome({
  children,
  onPageClick,
}: {
  children: React.ReactElement<WhyPageProps>[];
  onPageClick: (index: number) => void;
}): JSX.Element {
  return (
    <div className={styles['landing-simple']}>
      {children.map((child, index) => (
        <div key={index} className={styles['landing-simple-item']}>
          <div className={styles['item-header']}>
            {child.props.icon && <span className={styles['item-icon']}>{child.props.icon}</span>}
            <h3 className={styles['item-title']}>{child.props.title}</h3>
          </div>
          {child.props.landingDescription && (
            <p className={styles['item-description']}>
              {child.props.landingDescription}
            </p>
          )}
          <button
            className={styles['item-button']}
            onClick={() => onPageClick(index)}
            aria-label={`Voir les détails de ${child.props.title}`}
          >
            Voir plus →
          </button>
        </div>
      ))}
    </div>
  );
}

function Why({ title, children }: WhyProps): JSX.Element {
  const totalPages = children.length;

  const { activeItem, containerRef, handleItemClick, isFading } = useScroll({
    totalItems: totalPages,
    initialIndex: -1,
  });

  const handlePageClick = (index: number): void => {
    if (index >= 0 && index < children.length) {
      handleItemClick(index);
    }
  };

  const handleLandingClick = (): void => {
    handleItemClick(-1);
  };

  const getActiveContent = (): JSX.Element => {
    if (activeItem === -1) {
      return <WhyHome children={children} onPageClick={handlePageClick} />;
    }

    if (activeItem >= 0 && activeItem < children.length) {
      const activeChild = children[activeItem];
      if (activeChild) {
        return activeChild;
      }
    }

    return (
      <div className={styles['error-content'] ?? ''}>
        <p>Contenu non disponible</p>
        <button onClick={handleLandingClick}>Retour à l'accueil</button>
      </div>
    );
  };

  return (
    <div
      className={styles['why']}
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Navigation des offres de service"
    >
      <div className={styles['bar']}></div>

      <div className={styles['content']}>
        <div className={styles['nav']}>
          <button
            className={classNames(
              styles['index-title'],
              activeItem === -1 ? styles['active'] : ''
            )}
            onClick={handleLandingClick}
            aria-pressed={activeItem === -1}
            aria-label={`Retour à la vue d'ensemble: ${title}`}
          >
            {title}
          </button>

          <div className={styles['navigation']} role="tablist">
            {children.map((child, index) => (
              <button
                key={`nav-${child.props.title}-${index}`}
                className={classNames(
                  styles['nav-button'],
                  activeItem === index ? styles['active'] : ''
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
          className={classNames(styles['main-content'], 'fade-content', {
            fading: isFading,
          })}
          role="tabpanel"
          aria-live="polite"
          data-custom-scroll="true"
        >
          {getActiveContent()}
        </div>
      </div>
    </div>
  );
}

export default Why;