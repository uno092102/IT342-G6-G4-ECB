import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-24 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">ECB Login</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your email and password to log in!</p>

          <select className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700">
            <option>Select your Branch...</option>
          </select>

          <input
            type="email"
            placeholder="mail@simmmple.com"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Min. 8 characters"
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <p className="text-sm mb-4">
            No account?{" "}
            <span
              onClick={handleSignup}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Create account
            </span>
          </p>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-400 to-indigo-700 justify-center items-center text-white rounded-l-[5rem]">
        <div className="text-center">
          <div className="text-6xl mb-4">💡</div>
          <h2 className="text-3xl font-bold leading-tight">
            Electricity <br />
            Consumption <br />
            Bill
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
