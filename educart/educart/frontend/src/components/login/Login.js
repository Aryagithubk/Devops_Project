import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState"; // Import the GlobalContext
import "./Login.css"; // Import the CSS for styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { loginUser } = useContext(GlobalContext); // Get loginUser from GlobalContext
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Assuming response contains user data and token
      const userData = response.data; // Adjust based on your response structure

      // Dispatch loginUser to update global state with user info
      loginUser(userData);

      // Store token and user info in localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user)); // Store user info (e.g., username)

      // Success message
      setSuccessMessage("Login successful!");
      setErrorMessage("");

      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
