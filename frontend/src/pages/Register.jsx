import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // You can add form validation and API calls here
    navigate("/login"); // Navigate to Login page
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-24 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-1">ECB Register</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your information to register</p>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block font-medium mb-1 text-sm">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="johndoe@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="8-16 characters"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="8-16 characters"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-400 to-indigo-700 justify-center items-center text-center text-white rounded-l-[5rem]">
        <div>
          <div className="text-6xl mb-4">💡</div>
          <h1 className="text-3xl font-bold leading-tight">
            Electricity <br />
            Consumption <br />
            Bill
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
