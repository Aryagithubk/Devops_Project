const Product = require("../models/Product");
const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  const { id } = req.params; // Get productId from req.params
  const { quantity } = req.body; // Get quantity from req.body
  const productId = id;

  // Ensure user is authenticated
  if (!req.user) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  const userId = req.user.userId; // Access userId from the authenticated user (req.user)

  console.log("Authenticated User ID: ", userId); // Log userId for debugging

  try {
    // Fetch the product details based on the productId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Log the product details for debugging
    console.log("Product Details: ", product);

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists for the user, create a new cart
      console.log("Creating new cart for user:", userId);
      cart = new Cart({
        userId, // Ensure that userId is passed
        items: [{ product: productId, quantity }],
      });
    } else {
      // If cart exists, check if the product is already in the cart
      const existingProductIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex !== -1) {
        // If the product exists, update its quantity
        cart.items[existingProductIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        cart.items.push({ product: productId, quantity });
      }
    }

    // Save the updated cart
    const updatedCart = await cart.save();

    console.log("Updated Cart:", updatedCart); // Log the saved cart for debugging
    res
      .status(200)
      .json({ message: "Product added to cart", cart: updatedCart });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// Get all products in the cart
const getCart = async (req, res) => {
  const userId = req.user.userId; // Access userId from authenticated user

  try {
    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error getting cart:", error.message);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  const userId = req.user.userId; // Access userId from authenticated user

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

module.exports = { addToCart, getCart, clearCart };
