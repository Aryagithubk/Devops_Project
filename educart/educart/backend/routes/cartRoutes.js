const express = require("express");
const cartController = require("../controllers/cartController");
const authMiddleware = require("../config/authMiddleware");

const router = express.Router();

// Add product to cart
router.post("/:id", authMiddleware("user"), cartController.addToCart);

// Get all products in the cart
router.get("/", authMiddleware("user"), cartController.getCart);

// Clear the cart
router.delete("/", authMiddleware("user"), cartController.clearCart);

module.exports = router;
