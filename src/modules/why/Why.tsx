import { useId } from "react";
import styles from "./why.module.scss";
import classNames from "classnames";
import { useScroll } from "../../components/scroller/useScroll";

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
          <li key={index}>
            <span>●</span>
            {point}
          </li>
        ))}
      </ul>
      <button className={styles.contactBtn}>Contactez-nous</button>
    </div>
  );
}

function WhyHome({ children, onPageClick }: {
  children: React.ReactElement<WhyPageProps>[];
  onPageClick: (index: number) => void;
}) {
  return (
    <div className={styles.landingContent}>
      {children.map((child, index) => (
        <div key={index} className={styles.landingItem}>
          <h3>{child.props.title}</h3>
          <p>{child.props.landingDescription}</p>
          <button onClick={() => onPageClick(index)}>voir plus</button>
        </div>
      ))}
    </div>
  );
}

function Why({ title, children }: WhyProps) {
  const id = `why-${useId()}`;
  const totalPages = children.length;

  const { activeItem, containerRef, handleItemClick } = useScroll({
    totalItems: totalPages,
    initialIndex: -1
  });

  const handlePageClick = (index: number) => {
    handleItemClick(index);
  };

  const handleLandingClick = () => {
    handleItemClick(-1);
  };

  return (
    <div className={styles.why} ref={containerRef}>
      <div className={styles.module}>
        <div className={styles.bar}></div>

        <div className={styles.page}>
          <div className={styles.content}>
            <div className={styles.nav}>
              <button
                className={classNames(styles.indexTitle, {
                  [styles.active]: activeItem === -1,
                })}
                onClick={handleLandingClick}
              >
                {title}
              </button>
              <nav className={styles.navigation}>
                {children.map((child: React.ReactElement<WhyPageProps>, index: number) => (
                  <button
                    key={child.props.title}
                    className={classNames(styles.navButton, {
                      [styles.active]: activeItem === index,
                    })}
                    onClick={() => handlePageClick(index)}
                  >
                    {child.props.title}
                  </button>
                ))}
              </nav>
            </div>

            <div className={styles.mainContent}>
              {activeItem === -1 ? (
                <WhyHome
                  children={children}
                  onPageClick={handlePageClick}
                />
              ) : (
                children[activeItem]
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why;