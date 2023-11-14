import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, "your-secret-key", {
    expiresIn: "1h", // Set an expiration time for the token
  });
  return token;
};

export default generateToken;
