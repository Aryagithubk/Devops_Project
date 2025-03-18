// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware =
  (roles = []) =>
  (req, res, next) => {
    // Accept roles as an array (e.g., ["admin", "user"]) or as a single role
    if (typeof roles === "string") {
      roles = [roles];
    }

    // First, check the token from the Authorization header
    const tokenFromHeader = req.headers.authorization?.split(" ")[1];
    // Then, check the token from the cookies
    const tokenFromCookies = req.cookies.token;

    // If no token is found in either header or cookies
    const token = tokenFromHeader || tokenFromCookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(req.user);

      // Check if user's role is allowed (if roles are provided)
      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden, insufficient privileges" });
      }

      next();
    } catch (error) {
      res.status(403).json({ message: "Forbidden, token invalid" });
    }
  };

module.exports = authMiddleware;
