// controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/Product"); // Assuming you have a Product model

// Create an order
const createOrder = async (req, res) => {
  const { items, address, deliveryDate } = req.body;

  try {
    // Get the userId from the authenticated user
    const userId = req.user.userId; // Ensure that `req.user.userId` is set correctly in your authMiddleware

    // Calculate the total price based on the cart items
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found with id ${item.productId}` });
      }
      totalPrice += product.price * item.quantity; // Calculate price for each item
    }

    // Create the order
    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      address,
      deliveryDate,
      status: "pending", // Default order status
      isDelivered: false,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders for an authenticated user or all orders for admin
const getOrders = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      // Admin can see all orders
      const orders = await Order.find();
      return res.status(200).json(orders);
    } else {
      // Regular user can only see their own orders
      const orders = await Order.find({ userId: req.user.userId });
      return res.status(200).json(orders);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update order status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status; // Update status field
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
