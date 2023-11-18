import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Middleware to check if the user is authenticated
export const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the token exists in the request cookies
  if (req.cookies.token) {
    try {
      // Verify the token
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user based on the decoded user ID
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token found" });
  }
});

// Middleware to check if the user is an admin
export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Not authorized as an admin" });
  }
});

export default { auth, admin };
