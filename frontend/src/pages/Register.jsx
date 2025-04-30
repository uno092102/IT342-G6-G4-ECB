import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/customer/signup", formData);

      if (response.ok) {
        navigate("/login");
      } else {
        const msg = await response.text();
        setError(msg);
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-24 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-1">ECB Register</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your information to register</p>
          <form className="space-y-4" onSubmit={handleRegister}>
            <input name="fname" placeholder="First Name" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
            <input name="lname" placeholder="Last Name" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
            <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
            <input name="address" placeholder="Address" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
            <input name="username" placeholder="Username" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="w-full mt-4 bg-indigo-600 text-white font-semibold py-2 rounded-md">
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
            Billing
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
