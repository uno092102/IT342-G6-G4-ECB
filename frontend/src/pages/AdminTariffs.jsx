import React, { useEffect, useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import api from "../api/apiConfig";
import EditTariffModal from "./EditTariffModal";
import ConfirmDeleteTariffModal from "./ConfirmDeleteTariffModal";

const AdminTariffs = () => {
  const [tariffs, setTariffs] = useState([]);
  const [editTariff, setEditTariff] = useState(null);
  const [deleteTariffId, setDeleteTariffId] = useState(null);
  const [tariffType, setTariffType] = useState("");
  const [rate, setRate] = useState("");

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
    if (!tariffType || rate === "") return;
    try {
      const parsedRate = parseFloat(rate);
      if (isNaN(parsedRate)) return alert("Invalid rate value");
      await api.post("/tariffs/createTariff", {
        tariffType: tariffType.trim(),
        rate: parsedRate,
      });
      setTariffType("");
      setRate("");
      fetchTariffs();
    } catch (err) {
      console.error("Error adding tariff:", err);
    }
  };

  const closeEditModal = () => setEditTariff(null);
  const closeDeleteModal = () => setDeleteTariffId(null);

  const updateTariffInList = (updatedTariff) => {
    setTariffs(tariffs.map(t => t.tariffID === updatedTariff.tariffID ? updatedTariff : t));
  };

  const removeTariffFromList = (id) => {
    setTariffs(tariffs.filter(t => t.tariffID !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">Manage Tariff Rates</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Tariff Type (e.g., Missionary)"
          className="border px-3 py-2 rounded w-full"
          value={tariffType}
          onChange={(e) => setTariffType(e.target.value)}
        />
        <input
          type="number"
          step="0.0001"
          placeholder="Rate per kWh"
          className="border px-3 py-2 rounded w-full"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
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
            <th className="py-2 px-4 text-left">Tariff Type</th>
            <th className="py-2 px-4 text-left">Rate per kWh</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tariffs.map((t) => (
            <tr key={t.tariffID} className="border-b">
              <td className="py-2 px-4">{t.tariffID}</td>
              <td className="py-2 px-4">{t.tariffType}</td>
              <td className="py-2 px-4">₱{t.rate}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => setEditTariff(t)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteTariffId(t.tariffID)}
                  className="text-red-600 hover:underline text-sm"
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

      {editTariff && (
        <EditTariffModal
          tariff={editTariff}
          onClose={closeEditModal}
          onUpdated={updateTariffInList}
        />
      )}

      {deleteTariffId && (
        <ConfirmDeleteTariffModal
          tariffId={deleteTariffId}
          onClose={closeDeleteModal}
          onDeleted={removeTariffFromList}
        />
      )}
    </div>
  );
};

export default AdminTariffs;
