import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    // Perform authentication logic here if needed
    navigate("/dashboard"); // Redirect to Dashboard page
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-section">
        <h2>ECB Login</h2>
        <p>Enter your email and password to log in!</p>

        <select className="input-field">
          <option>Select your Branch...</option>
        </select>

        <input type="email" placeholder="mail@simmmple.com" className="input-field" />
        <input type="password" placeholder="Min. 8 characters" className="input-field" />

        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <span className="text-6xl">💡</span>
        <h2>Electricity Consumption Bill</h2>
      </div>
    </div>
  );
};

export default Login;
