// pages/CustomerProfile.jsx
import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const CustomerProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    fname: "", lname: "", email: "", phoneNumber: "", address: "", password: ""
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/customer/profile");
        setForm({
          fname: res.data.fname,
          lname: res.data.lname,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber || "",
          address: res.data.address || "",
          password: ""
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/customer/profile/edit/${user.accountId}`, form);
      setMessage("✅ Profile updated!");
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ Failed to update profile.");
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("accountId", user.accountId);
    formData.append("ownerImage", image);
    try {
      await api.post("/customer/profile/uploadimage", formData);
      setMessage("✅ Profile image uploaded!");
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Failed to upload image.");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">My Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className="border px-3 py-2 rounded" placeholder="First Name" name="fname" value={form.fname} onChange={handleChange} />
        <input className="border px-3 py-2 rounded" placeholder="Last Name" name="lname" value={form.lname} onChange={handleChange} />
        <input className="border px-3 py-2 rounded" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <input className="border px-3 py-2 rounded" placeholder="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
        <input className="border px-3 py-2 rounded col-span-2" placeholder="Address" name="address" value={form.address} onChange={handleChange} />
        <input className="border px-3 py-2 rounded col-span-2" type="password" placeholder="New Password (optional)" name="password" value={form.password} onChange={handleChange} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleUpload} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Upload Image</button>
      </div>

      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Save Changes
      </button>

      {message && <p className="mt-4 text-sm text-center font-medium">{message}</p>}
    </div>
  );
};

export default CustomerProfile;
