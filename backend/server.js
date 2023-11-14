import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectToMongoDB from "./db/mongoDB.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongoDB();

// // Routes
// const todoRoutes = require("./routes/todoRoutes");
app.use("/api/users", userRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
