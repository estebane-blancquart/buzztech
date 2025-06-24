import React from 'react';
import styles from './how.module.scss';
import classNames from 'classnames';
import { useScroll } from '@/components/scroller/useScroll';

interface HowStep {
  title: string;
  text: string;
}

interface HowProps {
  steps: HowStep[];
}

function How({ steps }: HowProps) {
  const totalSteps = steps.length;

  const {
    activeItem,
    containerRef,
    progressPercentage,
    handleItemClick,
    isFading,
  } = useScroll({
    totalItems: totalSteps,
    initialIndex: 0,
  });

  const handleStepClick = (index: number) => {
    if (index >= 0 && index < steps.length) {
      handleItemClick(index);
    }
  };

  // Fonction pour obtenir le contenu actif de manière sécurisée
  const getStepContent = () => {
    const currentStep = steps[activeItem];
    const previousStep = activeItem > 0 ? steps[activeItem - 1] : null;
    const nextStep = activeItem < totalSteps - 1 ? steps[activeItem + 1] : null;

    return (
      <div
        className={classNames('fade-content', {
          fading: isFading,
        })}
        key={activeItem} // Force re-render pour éviter clignotement
      >
        {/* Étape précédente grisée */}
        {previousStep && (
          <div className={classNames(styles.step, styles.previous)}>
            <div className={styles.number}>{activeItem}</div>
            <p>{previousStep.text}</p>
          </div>
        )}

        {/* Étape active */}
        {currentStep && (
          <div className={classNames(styles.step, styles.active)}>
            <div className={styles.number}>{activeItem + 1}</div>
            <p>{currentStep.text}</p>
          </div>
        )}

        {/* Étape suivante grisée */}
        {nextStep && (
          <div className={classNames(styles.step, styles.next)}>
            <div className={styles.number}>{activeItem + 2}</div>
            <p>{nextStep.text}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.how} ref={containerRef}>
      <div className={styles.bar}>
        <p className={styles.percentage}>{Math.round(progressPercentage)}%</p>
        <div
          className={styles.active}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className={styles.titles}>
        {steps.map((step, index) => (
          <div
            className={classNames(styles.step, {
              [styles.active]: activeItem === index,
            })}
            key={`step-${step.title}-${index}`}
            onClick={() => handleStepClick(index)}
          >
            <p className={styles.number}>{index + 1}</p>
            <p className={styles.title}>{step.title}</p>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.corner} data-corner="top-left"></div>
        <div className={styles.corner} data-corner="top-right"></div>
        <div className={styles.corner} data-corner="bottom-left"></div>
        <div className={styles.corner} data-corner="bottom-right"></div>
        {getStepContent()}
      </div>
    </div>
  );
}

export default How;
