import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/userController.js";
import { auth, admin } from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import {
  loginValidator,
  registerValidator,
} from "../validations/userValidator.js";

const router = express.Router();

// User routes
router.route("/login").post(loginValidator, validationMiddleware, loginUser);
router.route("/logout").post(logoutUser);
router
  .route("/")
  .get(auth, admin, getUsers)
  .post(registerValidator, validationMiddleware, registerUser);

router
  .route("/:id")
  .get(auth, admin, getUserById)
  .put(auth, admin, updateUser)
  .delete(auth, admin, deleteUser);

// Auth routes

export default router;
