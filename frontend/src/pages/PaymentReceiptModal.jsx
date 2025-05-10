import React, { useState, useEffect } from "react";
import { normalizeArrayResponse } from '../utils/normalize';
import api from "../api/apiConfig";

const PaymentReceiptModal = ({ receipt, onClose }) => {
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get(`/payments/bill/${receipt.billId}`);
        const payments = Array.isArray(res.data) ? res.data : [];
        const totalPaidAmount = payments.reduce((sum, p) => sum + p.amountPaid, 0);
        setTotalPaid(totalPaidAmount);
        setRemainingBalance(receipt.bill?.totalAmount - totalPaidAmount);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    if (receipt?.billId) {
      fetchPayments();
    }
  }, [receipt]);

  if (!receipt) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
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
          <p><strong>Total Amount Paid:</strong> ₱{totalPaid.toFixed(2)}</p>
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
