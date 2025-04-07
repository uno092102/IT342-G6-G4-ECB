import React from "react";
import { useNavigate } from "react-router-dom"; // Only import useNavigate
import "./Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    navigate("/dashboard"); // Redirect to Dashboard page
  };
  
  const handleSignup = () => {
    navigate("/signup"); // Redirect to Signup page
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
        
        {/* Sign-up link with onClick handler */}
        <p className="signup-link">
          No account? <span onClick={handleSignup} style={{ cursor: 'pointer', color: '#5a50e5', textDecoration: 'underline' }}>Create account</span>
        </p>
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