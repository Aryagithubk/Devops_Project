// routes/productRoutes.js
const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../config/authMiddleware");

const router = express.Router();

// Get all products
router.get("/", productController.getProducts);

// Get a product by ID
router.get("/:id", productController.getProductById);

// Create a new product (admin only)
router.post("/", authMiddleware("admin"), productController.createProduct);

// Update a product (admin only)
router.put("/:id", authMiddleware("admin"), productController.updateProduct);

// Delete a product (admin only)
router.delete("/:id", authMiddleware("admin"), productController.deleteProduct);

module.exports = router;
