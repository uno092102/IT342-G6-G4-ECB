import React from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can add authentication logic here
    navigate("/dashboard"); // Redirects to the dashboard page
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-1/2 p-10">
        <h2 className="text-3xl font-bold text-blue-700">ECB Login</h2>
        <p className="text-gray-500">Enter your email and password to log in!</p>
        
        <div className="mt-4">
          <select className="w-full p-3 border rounded-md text-gray-700">
            <option>Select your Branch...</option>
          </select>
        </div>
        
        <div className="mt-4">
          <input
            type="email"
            placeholder="mail@simmmple.com"
            className="w-full p-3 border rounded-md text-gray-700"
          />
        </div>
        
        <div className="mt-4 relative">
          <input
            type="password"
            placeholder="Min. 8 characters"
            className="w-full p-3 border rounded-md text-gray-700"
          />
          <a href="#" className="text-blue-600 text-sm absolute right-2 top-3">Forgot password?</a>
        </div>
        
        <div className="mt-4 flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600">Keep me logged in</span>
        </div>
        
        <button 
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      
      {/* Right Section */}
      <div className="w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 flex flex-col justify-center items-center text-white rounded-l-3xl">
        <span className="text-6xl">💡</span>
        <h2 className="text-3xl font-bold">Electricity Consumption Bill</h2>
      </div>
    </div>
  );
};

export default Login;
