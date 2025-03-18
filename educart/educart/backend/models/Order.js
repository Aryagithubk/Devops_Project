const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true }, // Store price at the time of order
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered"],
      default: "pending", // Default to 'pending' until payment is processed or delivered
    },
    deliveryDate: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Cash on Delivery"],
      default: "Cash on Delivery", // Default to Cash on Delivery if no transaction is made
    },
    transactionId: {
      type: String,
      default: null, // Store transaction ID if payment is made via an external service like Stripe
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Mongoose will automatically add `createdAt` and `updatedAt` timestamps
);

module.exports = mongoose.model("Order", orderSchema);
