import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";
import EditChargeModal from "./EditChargeModal";
import ConfirmDeleteChargeModal from "./ConfirmDeleteChargeModal";

const AdminCharges = () => {
  const [charges, setCharges] = useState([]);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [editCharge, setEditCharge] = useState(null);
  const [deleteChargeId, setDeleteChargeId] = useState(null);

  const [chargeType, setChargeType] = useState("");
  const [ratePerKwh, setRatePerKwh] = useState("");

  const fetchCharges = async () => {
    try {
      const res = await api.get("/charges/getAll");
      setCharges(res.data);
    } catch (err) {
      console.error("Failed to load charges:", err);
    }
  };

  useEffect(() => {
    fetchCharges();
  }, []);

  const handleAddCharge = async () => {
    if (!chargeType || ratePerKwh === "") return;
    try {
      const parsedRate = parseFloat(ratePerKwh);
      if (isNaN(parsedRate)) return alert("Invalid rate value");
      await api.post("/charges/createCharge", {
        chargeType: chargeType.trim(),
        ratePerKwh: parsedRate,
      });
      setChargeType("");
      setRatePerKwh("");
      fetchCharges();
    } catch (err) {
      console.error("Error adding charge:", err);
    }
  };

  const closeEditModal = () => setEditCharge(null);
  const closeDeleteModal = () => setDeleteChargeId(null);

  const updateChargeInList = (updatedCharge) => {
    setCharges(charges.map(c => c.chargeId === updatedCharge.chargeId ? updatedCharge : c));
  };

  const removeChargeFromList = (id) => {
    setCharges(charges.filter(c => c.chargeId !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">Manage Fixed Charges</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Charge Type (e.g., Environmental)"
          className="border px-3 py-2 rounded w-full"
          value={chargeType}
          onChange={(e) => setChargeType(e.target.value)}
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
          onClick={handleAddCharge}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Charge
        </button>
      </div>

      <table className="w-full text-sm mt-6">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Charge Type</th>
            <th className="py-2 px-4 text-left">Rate per kWh</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {charges.map((c) => (
            <tr key={c.chargeId} className="border-b">
              <td className="py-2 px-4">{c.chargeId}</td>
              <td className="py-2 px-4">{c.chargeType}</td>
              <td className="py-2 px-4">₱{c.ratePerKwh}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => setEditCharge(c)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteChargeId(c.chargeId)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {charges.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-4">
                No charge records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editCharge && (
        <EditChargeModal
          charge={editCharge}
          onClose={closeEditModal}
          onUpdated={updateChargeInList}
        />
      )}

      {deleteChargeId && (
        <ConfirmDeleteChargeModal
          chargeId={deleteChargeId}
          onClose={closeDeleteModal}
          onDeleted={removeChargeFromList}
        />  
      )}
    </div>
  );
};

export default AdminCharges;
