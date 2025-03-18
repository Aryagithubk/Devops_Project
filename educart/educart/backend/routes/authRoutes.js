// routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../config/authMiddleware");

const router = express.Router();

// User Registration
router.post("/register", authController.register);

// User Login
router.post("/login", authController.login);

module.exports = router;
