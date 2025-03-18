const express = require("express");
const checkoutController = require("../controllers/checkoutController");
const authMiddleware = require("../config/authMiddleware"); // For authentication

const router = express.Router();

// Checkout route: User proceeds with checkout and places an order
router.post(
  "/",
  authMiddleware("user"), // Ensure the user is authenticated
  checkoutController.checkout // Handle checkout logic
);

module.exports = router;
