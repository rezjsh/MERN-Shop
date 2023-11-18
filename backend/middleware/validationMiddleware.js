import { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { path, msg } = errors;
    const errorMessages = errors.array().map((error) => {
      return { [error.path]: error.msg };
    });

    return res.status(400).json({ error: [...errorMessages] });
  }
  next();
};

export default validationMiddleware;
