import React from "react";
import "./Item.css";

function Item({
  name,
  rating,
  price,
  saleDiscount,
  image,
  brand,
  description,
}) {
  return (
    <div className="item-card" data-discount={saleDiscount ? "true" : "false"}>
      <img src={image} alt={"Item image"} />
      <div className="item-brand">{brand}</div>
      <div className="item-name">{name}</div>
      {saleDiscount && (
        <div className="item-discount">Sale {saleDiscount}% off</div>
      )}
      <div className="item-info">
        <div className="item-price">
          <span className="item-price-inr">₹{price}</span>{" "}
          {/* Show INR equivalent */}
        </div>
        <div className="item-rating">{rating}&#9733;</div>
      </div>
      <div className="item-description">{description}</div>
    </div>
  );
}

export default Item;
