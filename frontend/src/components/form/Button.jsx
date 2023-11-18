import styles from "./Button.module.css";

const Button = ({ type, children }) => {
  return (
    <button type={type} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
