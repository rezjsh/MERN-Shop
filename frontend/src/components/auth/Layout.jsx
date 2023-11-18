import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
