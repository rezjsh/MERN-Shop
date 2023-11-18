import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../components/form/InputField";
import Button from "../../components/form/Button";
import { useEffect, useRef } from "react";
import { useLoginUserMutation } from "../../redux/api/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const [loginUser, { isLoading, isSuccess, error, isError }] =
    useLoginUserMutation();
  let formikRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  console.log(isError, isLoading, isSuccess, error);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const from = location.state?.from.pathname || "/";

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully logged in");
      navigate(from);
    }
    console.log(formikRef);
    if (isError) {
      console.log(error.data.error);
      if (Array.isArray(error?.data?.error)) {
        const errorObject = error.data.error.reduce((acc, item) => {
          const [field, message] = Object.entries(item)[0];
          acc[field] = message;
          return acc;
        }, {});
        formikRef.current.setErrors(errorObject);
        error.data.error.forEach((el) => {
          toast.error(el["password"], {
            position: "top-right",
          });
        });
      } else {
        toast.error(error?.data?.error, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     reset();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSuccess]);

  return (
    <>
      <h1>Login</h1>
      <Formik
        innerRef={formikRef}
        enableReinitialize={true}
        initialValues={{ email: "", password: "" }}
        // validationSchema={isError ? () => error.data.error : ""}
        onSubmit={(values, { setSubmitting }) => {
          loginUser(values);
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
    </>
  );
};

export default Login;
