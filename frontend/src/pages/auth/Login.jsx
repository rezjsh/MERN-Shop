import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import { useEffect, useRef } from "react";
import { useLoginUserMutation } from "../../redux/api/userApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Index.module.css";

const Login = () => {
  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();
  const formikRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isSuccess) {
      formikRef.current.resetForm();
      toast.success("Successfully logged in");
      navigate(from, { replace: true });
    }

    if (isError) {
      if (Array.isArray(error.data.error)) {
        const errorObject = error.data.error.reduce((acc, item) => {
          const [field, message] = Object.entries(item)[0];
          acc[field] = message;
          return acc;
        }, {});
        formikRef.current.setErrors(errorObject);
      } else {
        toast.error(error.data.error, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <h1>Login</h1>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await loginUser(values).unwrap();
        }}
      >
        {({ props, isSubmitting }) => (
          <Form>
            <InputField type="text" name="email" label="email" />

            <InputField type="password" name="password" label="password" />

            <Button type="submit" disabled={isSubmitting}>
              {isLoading ? <ClipLoader color="#89B9AD" /> : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
      <Link className={styles.link} to="/register">
        Don't have an account?
      </Link>
    </>
  );
};

export default Login;
