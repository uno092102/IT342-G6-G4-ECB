// pages/AdminTariffs.jsx
import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminTariffs = () => {
  const [tariffs, setTariffs] = useState([]);
  const [rateType, setRateType] = useState("");
  const [ratePerKwh, setRatePerKwh] = useState("");

  const fetchTariffs = async () => {
    try {
      const res = await api.get("/tariffs/getAll");
      setTariffs(res.data);
    } catch (err) {
      console.error("Failed to load tariffs:", err);
    }
  };

  useEffect(() => {
    fetchTariffs();
  }, []);

  const handleAddTariff = async () => {
    if (!rateType || !ratePerKwh) return;
    try {
      await api.post("/tariff/create", { rateType, ratePerKwh });
      setRateType("");
      setRatePerKwh("");
      fetchTariffs();
    } catch (err) {
      console.error("Error adding tariff:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tariff/delete/${id}`);
      fetchTariffs();
    } catch (err) {
      console.error("Failed to delete tariff:", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">Manage Tariff Rates</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Rate Type (e.g., Missionary)"
          className="border px-3 py-2 rounded w-full"
          value={rateType}
          onChange={(e) => setRateType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rate per kWh"
          className="border px-3 py-2 rounded w-full"
          value={ratePerKwh}
          onChange={(e) => setRatePerKwh(e.target.value)}
        />
        <button
          onClick={handleAddTariff}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Tariff
        </button>
      </div>

      <table className="w-full text-sm mt-6">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Rate Type</th>
            <th className="py-2 px-4 text-left">Rate per kWh</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tariffs.map((t) => (
            <tr key={t.tariffId} className="border-b">
              <td className="py-2 px-4">{t.tariffId}</td>
              <td className="py-2 px-4">{t.rateType}</td>
              <td className="py-2 px-4">₱{t.ratePerKwh}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDelete(t.tariffId)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {tariffs.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-4">
                No tariff records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTariffs;
