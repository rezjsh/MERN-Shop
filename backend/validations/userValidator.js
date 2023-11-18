import { body } from "express-validator";

const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
];

export { loginValidator };
