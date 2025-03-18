import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ItemDetail.css";
import { GlobalContext } from "../../context/GlobalState";

function ItemDetail() {
  const params = useParams();
  const itemId = params?.id; // The id from the URL params
  const [item, setItem] = useState(null); // State to hold item data
  const [isAdded, setIsAdded] = useState(false); // Track if item is added to cart
  const { cart, addItemToCartList } = useContext(GlobalContext); // Global context for cart

  // Fetch item details from backend
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${itemId}`
        );
        setItem(response.data); // Set the item data
      } catch (error) {
        console.error("Error fetching item details", error);
      }
    };

    if (itemId) {
      fetchItemDetails();
    }
  }, [itemId]);

  // Check if the item is already in the cart by fetching from the backend
  useEffect(() => {
    const checkItemInCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });

        if (response.data.cart && response.data.cart.length) {
          const itemInCart = response.data.cart.find(
            (cartItem) => cartItem.id === itemId
          );
          setIsAdded(!!itemInCart); // Set the state if the item is already in the cart
        }
      } catch (error) {
        console.error("Error checking cart", error);
      }
    };

    if (itemId) {
      checkItemInCart();
    }
  }, [itemId]);

  // If the item is not found or still loading, show loading message
  if (!item) {
    return <div>Loading...</div>;
  }

  // Add item to cart
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cart/${itemId}`,
        { quantity: 1 }, // Default quantity to 1
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token in the header for authentication
          },
        }
      );

      if (response.status === 200) {
        const cartItem = {
          id: itemId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1, // Or any other quantity you want to add
        };
        addItemToCartList(cartItem); // Dispatching to add item to cart in global state
        setIsAdded(true); // Update the UI to reflect the added status
      }

      window.location.reload();
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  return (
    <div className="item-detail-container">
      <Link to="/"> &#8592; Back</Link>
      <div className="item-detail">
        <div className="item-detail-image">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="item-detail-info">
          <div className="item-brand" style={{ margin: "0px 10px" }}>
            {item.brand}
          </div>
          <div className="item-name">{item.name}</div>
          <div className="item-price">₹{item.price}</div>

          <div className="item-size catagory_item">{item.category}</div>
          <button
            className="item-btn"
            disabled={isAdded}
            onClick={handleAddToCart} // Call the function to add item to cart
          >
            {isAdded ? <Link to="/cart">Go to Cart</Link> : "Add To Cart"}
          </button>
          <p className="item-description">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
