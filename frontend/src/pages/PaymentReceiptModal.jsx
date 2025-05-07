import React from "react";
import { normalizeArrayResponse } from '../utils/normalize';


const PaymentReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div
      id="receipt-modal-overlay"
      onClick={(e) => e.target.id === "receipt-modal-overlay" && onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful 🎉</h2>
          <p className="text-gray-700 mb-4">Thank you for your payment!</p>
        </div>

        <div className="text-sm text-gray-800 space-y-2">
          <p><strong>Bill ID:</strong> #{receipt.billId ?? "N/A"}</p>
          <p><strong>Payment Method:</strong> {receipt.paymentMethod ?? "N/A"}</p>
          <p>
            <strong>Amount Paid:</strong> ₱
            {typeof receipt.amountPaid === "number" ? receipt.amountPaid.toFixed(2) : "N/A"}
          </p>
          <p><strong>Date Paid:</strong> {formatDate(receipt.paymentDate)}</p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceiptModal;
