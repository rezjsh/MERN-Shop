import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Set an expiration time for the token
  });

  // Set the token as a cookie
  res.cookie("token", token, {
    maxAge: 60 * 60 * 24 * 30, // Expiration time 30 days
    httpOnly: true, // Cookie is accessible only by the server
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
};

export default generateToken;
