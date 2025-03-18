import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";
import "./Cart.css";

function Cart() {
  const { cart, setCart } = useContext(GlobalContext); // Access cart and setter
  const [cartItems, setCartItems] = useState([]); // State to hold fetched cart items

  useEffect(() => {
    // Fetch cart items from the backend when the component mounts
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });

        if (response.data.cart) {
          setCartItems(response.data.cart.items); // Set the cart items from backend
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart(); // Call the function to fetch cart items
  }, [cart]); // Re-fetch when cart changes (this will trigger re-render)

  // Function to remove all items from the cart
  const handleRemoveAll = async () => {
    try {
      // Make a DELETE request to clear the entire cart in the backend
      const response = await axios.delete("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // If successful, clear the local cart state and global context state
      if (response.status === 200) {
        setCartItems([]); // Clear the local cart state
        setCart([]); // Clear the global cart context to update the Navbar
        alert("All items removed from the cart.");

        // Reload the page to reflect changes
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing all items:", error);
    }
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {!cartItems.length ? (
        <p>No Item Added! Please add something to your cart</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product._id}>
                {/* Use product._id for a unique key */}
                <div className="item-price">₹{item.product.price}</div>
                <div className="item-name">{item.product.name}</div>
                <div className="item-expectedDelivery">
                  (Expected Delivery 3 - 6 days)
                </div>
              </div>
            ))}
          </div>

          {/* Remove All Button */}
          <button className="remove-all-btn" onClick={handleRemoveAll}>
            Remove All
          </button>

          <Link to="/checkout">
            <button className="item-btn">Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
