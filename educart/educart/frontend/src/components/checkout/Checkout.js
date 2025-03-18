import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useContext(GlobalContext);
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentType, setPaymentType] = useState("cod"); // Default to cash on delivery
  const [transactionId, setTransactionId] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  const subTotal = cart.reduce((sum, curr) => sum + curr.price, 0);

  const handleCheckout = async () => {
    try {
      const cartItems = cart.reduce((acc, item) => {
        acc[item.id] = { quantity: item.quantity };
        return acc;
      }, {});

      const response = await axios.post("http://localhost:5000/api/checkout", {
        address,
        deliveryDate,
        cart: cartItems,
        paymentType,
        transactionId: paymentType === "paid" ? transactionId : null,
      });

      setOrderMessage(response.data.message);
      setIsOrdered(true);
      clearCart();
    } catch (error) {
      console.error("Error during checkout:", error);
      setOrderMessage("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      {isOrdered ? (
        <h3>
          {orderMessage} <Link to="/">Shop more!</Link>
        </h3>
      ) : (
        <>
          <div>
            <div className="custom-row">
              <h4>Order Review</h4>
              <span>{cart?.length} items in cart</span>
            </div>
            <div className="custom-row">
              <h4>Checkout Summary</h4>
              <div className="checkout-summary">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>
            </div>
          </div>

          {/* Address input */}
          <div className="custom-row">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Delivery Date input */}
          <div className="custom-row">
            <label>Delivery Date:</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </div>

          {/* Payment Type selection */}
          <div className="custom-row">
            <label>Payment Type:</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Transaction ID input (only if payment is already made) */}
          {paymentType === "paid" && (
            <div className="custom-row">
              <label>Transaction ID:</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required={paymentType === "paid"}
              />
            </div>
          )}

          {/* Pay button */}
          <button className="item-btn" onClick={handleCheckout}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
