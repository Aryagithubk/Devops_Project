import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import ItemDetail from "./components/itemDetail/ItemDetail";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Checkout from "./components/checkout/Checkout";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login"; // Import Login
import Register from "./components/register/Register"; // Import Register

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} /> {/* Login Route */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Register Route */}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
