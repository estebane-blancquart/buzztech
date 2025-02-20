import styles from "./button.module.scss";

function Button() {
  return (
    <button className={styles.button}>
      Prendre contact
      <div></div>
    </button>
  );
}

export default Button;
