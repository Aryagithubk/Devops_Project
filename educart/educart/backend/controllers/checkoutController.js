const Product = require("../models/Product");
const Order = require("../models/Order");

// Checkout (proceed to order)
const checkout = async (req, res) => {
  const { address, deliveryDate, cart, paymentType, transactionId } = req.body;

  if (!cart || Object.keys(cart).length === 0) {
    return res
      .status(400)
      .json({ message: "Cart is empty, cannot proceed with checkout" });
  }
  if (!address) {
    return res
      .status(400)
      .json({ message: "Address is required for checkout" });
  }
  if (!deliveryDate) {
    return res
      .status(400)
      .json({ message: "Delivery date is required for checkout" });
  }
  if (paymentType === "paid" && !transactionId) {
    return res
      .status(400)
      .json({ message: "Transaction ID required for paid orders" });
  }

  try {
    let totalPrice = 0;
    const orderItems = [];

    // Calculate total price and prepare order details
    for (const productId in cart) {
      const item = cart[productId];
      const product = await Product.findById(productId);

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      // Calculate discount and total with fees and tax
      const discountAmount = (product.price * product.discount) / 100;
      const discountedPrice = product.price - discountAmount;
      const itemPriceWithFeesAndTax =
        discountedPrice +
        product.extraFees +
        (discountedPrice * product.tax) / 100;
      const itemTotal = itemPriceWithFeesAndTax * item.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        productId: productId,
        quantity: item.quantity,
        price: product.price,
        discount: product.discount,
        extraFees: product.extraFees,
        tax: product.tax,
        itemTotal: itemTotal,
      });
    }

    // Create new order
    const newOrder = new Order({
      buyerId: req.user.userId,
      items: orderItems,
      totalPrice,
      address,
      deliveryDate,
      paymentType,
      transactionId: paymentType === "paid" ? transactionId : null,
      isDelivered: false,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { checkout };
