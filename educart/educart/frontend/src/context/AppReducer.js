export default (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_IN_CART":
      return {
        ...state,
        cart: [action.payload, ...state.cart], // Add item to the cart
      };
    case "REMOVE_ITEM_IN_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id), // Remove item by id
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [], // Clear the cart
      };
    case "ADD_ITEM_IN_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders], // Add item to orders
      };
    case "REMOVE_ITEM_IN_ORDER":
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order.orderId !== action.payload.id // Remove item by order id
        ),
      };
    case "LOGIN_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user, // Store user information from login
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: null, // Clear user information on logout
      };
    default:
      return state;
  }
};
