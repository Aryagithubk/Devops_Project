import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logoutUser } = useContext(GlobalContext);
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("token");
  };

  useEffect(() => {
    // Fetch the cart data from the API to get the count
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Log the structure of the response to confirm it's an array
        console.log("Cart API response:", response.data);
        console.log("cnt: ", response.data.cart.items.length);

        // Check if response.data is an array, set count accordingly
        if (Array.isArray(response.data.cart.items)) {
          setCartCount(response.data.cart.items.length);
        } else if (response.data && Array.isArray(response.data.items)) {
          setCartCount(response.data.items.length);
        } else {
          setCartCount(0); // Default to 0 if the structure is unexpected
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCartCount(0); // Default to 0 if there's an error
      }
    };

    // Call fetchCart if the user is authenticated
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  return (
    <div className="navbar">
      <Link to="/">
        <h2>Educart</h2>
      </Link>
      <ul className="navbar-ul">
        <Link to="/cart">
          <li>
            &#128722;{" "}
            <span className="cart-count" style={{ color: "red" }}>
              ({cartCount})
            </span>
          </li>
        </Link>
        <Link to="/orders">
          <li>Orders</li>
        </Link>

        {isAuthenticated ? (
          <>
            <span className="username">{user ? user.name : "User"}</span>
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="nav-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="nav-btn">Register</button>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
