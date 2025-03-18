// routes/orderRoutes.js
const express = require("express");
const orderController = require("../controllers/orderController");
const authMiddleware = require("../config/authMiddleware");

const router = express.Router();

// Create a new order
router.post("/", authMiddleware("user"), orderController.createOrder);

// Get all orders (for admin) or user-specific orders
router.get("/", authMiddleware(["user", "admin"]), orderController.getOrders);

// Update order status (admin only)
router.put(
  "/status",
  authMiddleware("admin"),
  orderController.updateOrderStatus
);

module.exports = router;
