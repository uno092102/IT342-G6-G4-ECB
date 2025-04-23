import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminTariffs = () => {
  const [tariffs, setTariffs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTariffs, setEditedTariffs] = useState({});
  const [tariffType, setTariffType] = useState("");
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
    if (!tariffType || ratePerKwh === "") return;
    try {
      const parsedRate = parseFloat(ratePerKwh);
      if (isNaN(parsedRate)) return alert("Invalid rate value");
      await api.post("/tariffs/createTariff", {
        tariffType: tariffType.trim(),
        ratePerKwh: parsedRate,
      });
      setTariffType("");
      setRatePerKwh("");
      fetchTariffs();
    } catch (err) {
      console.error("Error adding tariff:", err);
    }
  };

  const handleEditChange = (id, field, value) => {
    setEditedTariffs((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSaveEdit = async (id) => {
    const data = editedTariffs[id];
    if (!data.tariffType || data.ratePerKwh === "") return;
    const parsedRate = parseFloat(data.ratePerKwh);
    if (isNaN(parsedRate)) return alert("Invalid rate value");

    try {
      await api.put(`/tariffs/update/${id}`, {
        tariffType: data.tariffType.trim(),
        ratePerKwh: parsedRate,
      });
      setEditIndex(null);
      setEditedTariffs((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      fetchTariffs();
    } catch (err) {
      console.error("Error updating tariff:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tariffs/delete/${id}`);
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
            <th className="py-2 px-4 text-left">Tariff Type</th>
            <th className="py-2 px-4 text-left">Rate per kWh</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tariffs.map((t) => (
            <tr key={t.tariffID} className="border-b">
              <td className="py-2 px-4">{t.tariffID}</td>
              <td className="py-2 px-4">
                {editIndex === t.tariffID ? (
                  <input
                    type="text"
                    value={editedTariffs[t.tariffID]?.tariffType ?? t.tariffType}
                    onChange={(e) => handleEditChange(t.tariffID, "tariffType", e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  t.tariffType
                )}
              </td>
              <td className="py-2 px-4">
                {editIndex === t.tariffID ? (
                  <input
                    type="number"
                    step="0.0001"
                    value={editedTariffs[t.tariffID]?.ratePerKwh ?? t.ratePerKwh ?? t.rate}
                    onChange={(e) => handleEditChange(t.tariffID, "ratePerKwh", e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  `₱${t.ratePerKwh ?? t.rate}`
                )}
              </td>
              <td className="py-2 px-4 space-x-2">
                {editIndex === t.tariffID ? (
                  <button
                    onClick={() => handleSaveEdit(t.tariffID)}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditIndex(t.tariffID)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(t.tariffID)}
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
    </div>
  );
};

export default AdminTariffs;