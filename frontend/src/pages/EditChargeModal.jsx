import React, { useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import api from "../api/apiConfig";

const EditChargeModal = ({ charge, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    chargeType: charge.chargeType,
    ratePerKwh: charge.ratePerKwh,   // ✅ This is correct
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const updated = {
        chargeType: form.chargeType.trim(),
        ratePerKwh: parseFloat(form.ratePerKwh),
      };
      const res = await api.put(`/charges/update/${charge.chargeId}`, updated); // ✅ use chargeId not chargeID
      onUpdated(res.data);
      onClose();
    } catch (err) {
      console.error("Error updating charge:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Charge #{charge.chargeId}</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Charge Type</label>
            <input
              name="chargeType"
              value={form.chargeType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Rate per kWh</label>
            <input
              name="ratePerKwh"
              type="number"
              step="0.0001"
              value={form.ratePerKwh}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

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

export default EditChargeModal;
