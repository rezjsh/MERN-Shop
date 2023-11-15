import User from "../models/userModel.js";
import generateToken from "../utils/tokenGenerator.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    user && generateToken(res, user._id);

    // Return the user data
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    newUser && generateToken(res, newUser._id);

    // Return the newly created user data
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to logout" });
  }
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get a single user by ID
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Create a new user
const createUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin, password } = req.body;

  try {
    const user = new User({
      name,
      email,
      isAdmin,
      password,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Update a user by ID
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, isAdmin, password } = req.body;

  try {
    const user = await User.findById(id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.isAdmin = isAdmin || user.isAdmin;
      user.password = password || user.password;

      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
