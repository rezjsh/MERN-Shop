import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

// User routes
router.route("/login").post(loginUser);
router.route("/").get(getUsers).post(registerUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Auth routes

export default router;
