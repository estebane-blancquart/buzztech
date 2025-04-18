import { ReactElement, ReactNode, useEffect, useState } from "react";
import styles from "./why.module.scss";
import classNames from "classnames";

interface WhyPageProps {
  title: string;
  points: string[];
  icon: string;
}

export function WhyPage({ title, points, icon }: WhyPageProps) {
  return (
    <div className={styles.page}>
      <h3>
        {title} <span>{icon}</span>
      </h3>
      <ul>
        {points.map((point: string) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <button></button>
    </div>
  );
}

interface WhyProps {
  title: string;
  children: ReactElement[];
}

function Why({ title, children }: WhyProps) {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  const handleClick = (newPageIndex: number) => {
    setActivePageIndex(newPageIndex);
  };

  useEffect(() => {
    const wrapper = document.getElementById("page-wrapper");
    if (wrapper) {
      const height = wrapper.offsetHeight;
      wrapper.scroll({
        top: height * (activePageIndex + 1),
        behavior: "smooth",
      });
    }
  }, [activePageIndex]);

  return (
    <section className={styles.why}>
      <h2>Module why</h2>
      <div className={styles.module}>
        <div className={styles.top}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.content}>
          <div className={styles.index}>
            <h3>{title}</h3>
            <nav className={styles.navigation}>
              {children.map((child: ReactElement, index: number) => (
                <button
                  key={child.props.title}
                  className={classNames(styles.navButton, {
                    [styles.active]: activePageIndex === index,
                  })}
                  onClick={() => handleClick(index)}
                >
                  {child.props.title}
                </button>
              ))}
            </nav>
          </div>
          <section id="page-wrapper" className={styles.pages}>
            <div className={classNames(styles.page, styles.page1)}></div>
            {children.map((child) => (
              <article
                id={child.props.title.toLowerCase()}
                className={styles.page}
                key={child.props.title}
              >
                {child}
              </article>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}
export default Why;
