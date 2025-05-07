import React, { useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import api from "../api/apiConfig";

const EditUserModal = ({ user, onClose, onUpdated, refreshUsers }) => {
  const [form, setForm] = useState({
    fname: user.fname || "",
    lname: user.lname || "",
    username: user.username || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
    role: user.role || "CUSTOMER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // ✅ Only send the editable fields (based on UserUpdateDTO)
      const updatedUser = { ...form };

      const res = await api.put(`/admin/updateUser/${user.accountId}`, updatedUser);
      
      onUpdated(res.data);    // Update user in list
      refreshUsers();         // Refresh all users from backend
      onClose();              // Close modal
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit User #{user.accountId}</h2>

        <div className="space-y-3">
          {/* Form Fields */}
          {["fname", "lname", "username", "email", "phoneNumber", "address"].map((field) => (
            <div key={field}>
              <label className="block font-semibold mb-1 capitalize">{field}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}

          {/* Role Select */}
          <div>
            <label className="block font-semibold mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
