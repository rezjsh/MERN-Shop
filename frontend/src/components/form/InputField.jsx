import { useField } from "formik";
import styles from "./InputField.module.css";

const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log(meta);
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{label && label}</label>
        <input
          {...props}
          {...field}
          className={`${styles.input} ${
            meta.error && meta.touched ? styles.input_error : ""
          }`}
        />
      </div>

      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default InputField;
