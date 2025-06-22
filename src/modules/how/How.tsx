// modules/how/How.tsx
import { useId } from "react";
import styles from "./how.module.scss";
import classNames from "classnames";
import { useScroll } from "../../components/scroller/useScroll";

interface HowStep {
  title: string;
  text: string;
}

interface HowProps {
  steps: HowStep[];
}

function How({ steps }: HowProps) {
  const id = `how-${useId()}`;
  const totalSteps = steps.length;
  
  // 🎯 Utilisation du hook useScroll
  const { activeItem, containerRef, progressPercentage, handleItemClick } = useScroll({
    totalItems: totalSteps,
    initialIndex: 0
  });

  // Navigation par clic sur les titres
  const handleStepClick = (index: number) => {
    handleItemClick(index);
  };

  return (
    <section id={id} className={styles.how} ref={containerRef}>
      <div className={styles.module}>
        <div className={styles.bar}>
          <p className={styles.percentage}>{Math.round(progressPercentage)}%</p>
          <div 
            className={styles.active} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className={styles.titles}>
          {steps.map(({ title }: HowStep, index: number) => (
            <div
              className={classNames(styles.a, {
                [styles.active]: activeItem === index,
              })}
              key={title}
              onClick={() => handleStepClick(index)}
            >
              <p className={styles.number}>{index + 1}</p>
              <p className={styles.title}>{title}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.page}>
          <div className={styles.angleTL}></div>
          <div className={styles.angleTR}></div>
          <div className={styles.content}>
            {/* Étape précédente grisée */}
            {activeItem > 0 && (
              <div className={classNames(styles.step, styles.previous)} key={`prev-${activeItem - 1}`}>
                <div className={styles.number}>{activeItem}</div>
                <p>{steps[activeItem - 1]?.text}</p>
              </div>
            )}
            
            {/* Étape active */}
            <div className={classNames(styles.step, styles.active)} key={`active-${activeItem}`}>
              <div className={styles.number}>{activeItem + 1}</div>
              <p>{steps[activeItem]?.text}</p>
            </div>
            
            {/* Étape suivante grisée */}
            {activeItem < totalSteps - 1 && (
              <div className={classNames(styles.step, styles.next)} key={`next-${activeItem + 1}`}>
                <div className={styles.number}>{activeItem + 2}</div>
                <p>{steps[activeItem + 1]?.text}</p>
              </div>
            )}
          </div>
          <div className={styles.angleBL}></div>
          <div className={styles.angleBR}></div>
        </div>
      </div>
    </section>
  );
}

export default How;