import styles from "./grid.module.scss";

interface GridProps {
  children: React.ReactNode;
  mobile: "one-col-mobile";
  tablet: "one-col-tablet" | "two-col-tablet";
  desktop: "one-col-desktop" | "two-col-desktop" | "three-col-desktop";
}

const Grid = ({ children, mobile, tablet, desktop }: GridProps) => {
  return (
    <div className={`${styles.grid} ${styles[mobile]} ${styles[tablet]} ${styles[desktop]}`}>
      {children}
    </div>
  );
};

export default Grid;
