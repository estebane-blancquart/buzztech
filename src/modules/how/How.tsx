import { ReactElement, useEffect, useId, useState } from "react";
import styles from "./how.module.scss";
import classNames from "classnames";

interface HowStep {
  title: string;
  text: string;
}

interface HowProps {
  steps: HowStep[];
}

function How({ steps }: HowProps) {
  const id = `how-${useId()}`;

  const [activeItem, setActiveItem] = useState<number>(0);
  const [offsetTop, setOffsetTop] = useState<number | null>(null);

  const delta = 200;

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;

    // if (offsetTop != null && offsetTop - delta < target.scrollTop) {
    //   console.log("test");
    //   target.scrollTop = offsetTop - delta;
    // }
  };

  useEffect(() => {
    const target = document.querySelector("main");
    target?.addEventListener("scroll", handleScroll);

    const howComponent = target?.querySelector(`[id="${id}"]`) as HTMLElement;
    setOffsetTop(howComponent.offsetTop);

    return () => {
      target?.removeEventListener("scroll", handleScroll);
    };
  }, [offsetTop]);

  return (
    <section id={id} className={styles.how}>
      <h2>Module how</h2>
      <div className={styles.module}>
        <div className={styles.bar}>
          <p className={styles.percentage}>20%</p>
          <div className={styles.active}></div>
        </div>
        <div className={styles.titles}>
          {steps.map(({ title }: HowStep, index: number) => (
            <div
              className={classNames(styles.a, {
                [styles.active]: activeItem === index,
              })}
              key={title}
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
            {steps.map(({ title, text }: HowStep, index: number) => (
              <div
                className={classNames(styles.step, {
                  [styles.active]: activeItem === index,
                })}
                key={title}
              >
                <div className={styles.number}>{index + 1}</div>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className={styles.angleBL}></div>
          <div className={styles.angleBR}></div>
        </div>
      </div>
    </section>
  );
}
export default How;
