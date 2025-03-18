// components/banner/Banner.js
import React from "react";
import "./banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="banner-overlay">
        <h1>Welcome to the Student Market</h1>
        <p>Buy and sell essential products for engineering students!</p>
        <div className="banner-buttons">
          <button className="btn btn-explore">Explore Products</button>
          <button className="btn btn-sell">Sell Your Item</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
