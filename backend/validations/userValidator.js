import { body } from "express-validator";

const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
];

const registerValidator = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password cannot be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export { loginValidator, registerValidator };
