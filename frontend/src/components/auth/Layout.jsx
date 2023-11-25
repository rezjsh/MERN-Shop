import { useEffect } from "react";
import styles from "./Layout.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(from, { replace: true });
    }
  }, [userInfo, navigate, from]);

  return (
    <>
      {!userInfo && (
        <div className={styles.container}>
          <div className={styles.box}>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
