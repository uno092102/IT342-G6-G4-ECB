import React, { useState, useEffect } from "react";
import { normalizeArrayResponse } from '../utils/normalize';
import api from "../api/apiConfig";

const PayNowModal = ({ bill, onClose, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState("GCash");
  const [amountPaid, setAmountPaid] = useState(0);
  const [error, setError] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(bill.totalAmount);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get(`/payments/bill/${bill.billId}`);
        const payments = Array.isArray(res.data) ? res.data : [];
        const totalPaidAmount = payments.reduce((sum, p) => sum + p.amountPaid, 0);
        setTotalPaid(totalPaidAmount);
        setRemainingBalance(bill.totalAmount - totalPaidAmount);
        setAmountPaid(bill.totalAmount - totalPaidAmount); // Default to remaining balance
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchPayments();
  }, [bill.billId, bill.totalAmount]);

  const handleSubmit = () => {
    try {
      if (!amountPaid || amountPaid <= 0) {
        setError("Please enter a valid amount.");
        return;
      }

      if (amountPaid > remainingBalance) {
        setError("Amount cannot exceed remaining balance.");
        return;
      }

      // Round to 2 decimal places before submitting
      const roundedAmount = Number(amountPaid.toFixed(2));
      console.log("Submitting payment:", {
        billId: bill.billId,
        amountPaid: roundedAmount,
        paymentMethod,
        remainingBalance
      });
      
      onSubmit(bill.billId, roundedAmount, paymentMethod);
    } catch (err) {
      console.error("Payment submission error:", err);
      setError("Error processing payment. Please try again.");
    }
  };

  return (
    <div
      id="pay-modal-overlay"
      onClick={(e) => e.target.id === "pay-modal-overlay" && onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-4">💰 Pay Your Bill</h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="GCash">GCash</option>
              <option value="Maya">Maya</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount to Pay</label>
            <input
              type="number"
              step="0.01"
              className="w-full border px-4 py-2 rounded"
              value={amountPaid}
              onChange={(e) => setAmountPaid(Number(e.target.value))}
              min={0}
              max={remainingBalance}
            />
            <div className="text-sm text-gray-500 mt-1 space-y-1">
              <p>Total Bill Amount: ₱{bill.totalAmount.toFixed(2)}</p>
              <p>Amount Paid: ₱{totalPaid.toFixed(2)}</p>
              <p>Remaining Balance: ₱{remainingBalance.toFixed(2)}</p>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayNowModal;
