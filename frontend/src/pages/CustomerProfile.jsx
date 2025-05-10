// pages/CustomerProfile.jsx
import React, { useEffect, useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import api from "../api/apiConfig";

const CustomerProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    fname: "", 
    lname: "", 
    email: "", 
    phoneNumber: "", 
    address: "", 
    password: ""
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/customer/profile");
        setForm({
          fname: res.data.fname || "",
          lname: res.data.lname || "",
          email: res.data.email || "",
          phoneNumber: res.data.phoneNumber || "",
          address: res.data.address || "",
          password: ""
        });
      } catch (err) {
        setMessage({ 
          text: "Failed to load profile. Please try again later.", 
          type: "error" 
        });
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ text: "", type: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setMessage({ text: "", type: "" });
    } else {
      setMessage({ 
        text: "Please select a valid image file", 
        type: "error" 
      });
    }
  };

  const validateForm = () => {
    if (!form.fname.trim() || !form.lname.trim() || !form.email.trim()) {
      setMessage({ 
        text: "First name, last name, and email are required", 
        type: "error" 
      });
      return false;
    }
    if (form.password && form.password.length < 6) {
      setMessage({ 
        text: "Password must be at least 6 characters long", 
        type: "error" 
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const updateData = { ...form };
      if (!updateData.password) {
        delete updateData.password;
      }
      
      await api.put(`/customer/profile/edit/${user.accountId}`, updateData);
      setMessage({ 
        text: "Profile updated successfully!", 
        type: "success" 
      });
      setForm(prev => ({ ...prev, password: "" }));
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Failed to update profile", 
        type: "error" 
      });
      console.error("Update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage({ 
        text: "Please select an image first", 
        type: "error" 
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("accountId", user.accountId);
    formData.append("ownerImage", image);
    
    try {
      await api.post("/customer/profile/uploadimage", formData);
      setMessage({ 
        text: "Profile image uploaded successfully!", 
        type: "success" 
      });
      setImage(null);
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || "Failed to upload image", 
        type: "error" 
      });
      console.error("Upload error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">My Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input 
          className="border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
          placeholder="First Name" 
          name="fname" 
          value={form.fname} 
          onChange={handleChange} 
        />
        <input 
          className="border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
          placeholder="Last Name" 
          name="lname" 
          value={form.lname} 
          onChange={handleChange} 
        />
        <input 
          className="border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
          placeholder="Email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
        />
        <input 
          className="border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
          placeholder="Phone Number" 
          name="phoneNumber" 
          value={form.phoneNumber} 
          onChange={handleChange} 
        />
        <input 
          className="border px-3 py-2 rounded col-span-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
          placeholder="Address" 
          name="address" 
          value={form.address} 
          onChange={handleChange} 
        />
        <input 
          className="border px-3 py-2 rounded col-span-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
          type="password" 
          placeholder="New Password (optional)" 
          name="password" 
          value={form.password} 
          onChange={handleChange} 
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <input 
          type="file" 
          onChange={handleImageChange}
          accept="image/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        <button 
          onClick={handleUpload} 
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      <button 
        onClick={handleSubmit} 
        disabled={isLoading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>

      {message.text && (
        <p className={`mt-4 text-sm text-center font-medium ${
          message.type === "error" ? "text-red-600" : "text-green-600"
        }`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default CustomerProfile;
