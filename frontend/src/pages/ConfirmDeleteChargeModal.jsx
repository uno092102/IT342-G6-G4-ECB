// ConfirmDeleteChargeModal.jsx
import React from "react";
import api from "../api/apiConfig";

const ConfirmDeleteChargeModal = ({ chargeId, onClose, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/charges/delete/${chargeId}`);
      onDeleted(chargeId);
      onClose();
    } catch (err) {
      console.error("Error deleting charge:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete Charge #{chargeId}?</p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteChargeModal;
