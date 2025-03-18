// utils/jwt.js
const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  // Generates a JWT with the user's ID and role as payload
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

const verifyToken = (token) => {
  // Verifies a JWT, returning the decoded token if valid
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
