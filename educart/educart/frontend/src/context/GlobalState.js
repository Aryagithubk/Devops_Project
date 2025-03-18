import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  cart: [],
  orders: [],
  isAuthenticated: false,
  user: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Load user data from localStorage if available
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch({
        type: "LOGIN_USER",
        payload: userData,
      });
    }
  }, []);

  // Add item to cart
  const addItemToCartList = (item) => {
    dispatch({
      type: "ADD_ITEM_IN_CART",
      payload: item,
    });
  };

  // Remove item from cart
  const removeItemFromCartList = (item) => {
    dispatch({
      type: "REMOVE_ITEM_IN_CART",
      payload: item,
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  // Add item to order list
  const addItemToOrderList = (item) => {
    dispatch({
      type: "ADD_ITEM_IN_ORDER",
      payload: item,
    });
  };

  // Remove item from order list
  const removeItemFromOrderList = (item) => {
    dispatch({
      type: "REMOVE_ITEM_IN_ORDER",
      payload: item,
    });
  };

  // Login action
  const loginUser = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData)); // Save user data to localStorage
    dispatch({
      type: "LOGIN_USER",
      payload: userData,
    });
  };

  // Logout action
  const logoutUser = () => {
    localStorage.removeItem("userData"); // Remove user data from localStorage
    dispatch({
      type: "LOGOUT_USER",
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        cart: state.cart,
        orders: state.orders,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        addItemToCartList,
        removeItemFromCartList,
        clearCart,
        addItemToOrderList,
        removeItemFromOrderList,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
