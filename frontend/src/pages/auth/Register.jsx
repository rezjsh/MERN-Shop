import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import { useEffect, useRef } from "react";
import { useRegisterUserMutation } from "../../redux/api/userApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Index.module.css";

const Register = () => {
  const [registerUser, { isLoading, isSuccess, error, isError }] =
    useRegisterUserMutation();
  const formikRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const registerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const from = location.state?.from.pathname || "/";

  useEffect(() => {
    if (isSuccess) {
      formikRef.current.resetForm();
      toast.success("Successfully registered");

      navigate(from);
    }

    if (isError) {
      if (Array.isArray(error?.data?.error)) {
        const errorObject = error.data.error.reduce((acc, item) => {
          const [field, message] = Object.entries(item)[0];
          acc[field] = message;
          return acc;
        }, {});
        formikRef.current.setErrors(errorObject);
      } else {
        toast.error(error?.data?.error, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <h1>Register</h1>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        // validationSchema={registerSchema}
        onSubmit={(values, { setSubmitting }) => {
          registerUser(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField type="text" name="name" label="Name" />

            <InputField type="text" name="email" label="Email" />

            <InputField type="password" name="password" label="Password" />

            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />

            <Button type="submit" disabled={isSubmitting}>
              {isLoading ? <ClipLoader color="#89B9AD" /> : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
      <Link className={styles.link} to="/login">
        Already have an account!
      </Link>
    </>
  );
};

export default Register;
