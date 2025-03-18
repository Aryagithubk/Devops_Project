// components/footer/Footer.js

import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Educart</h3>
          <p>
            Educart is your one-stop marketplace for essential products for
            engineering students.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              🔵
            </a>
            <a href="#" aria-label="Twitter">
              🔷
            </a>
            <a href="#" aria-label="Instagram">
              🟣
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Educart | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
