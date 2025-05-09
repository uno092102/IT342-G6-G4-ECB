import React, { useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';


const PayNowModal = ({ bill, onClose, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState("GCash");
  const [amountPaid, setAmountPaid] = useState(bill.totalAmount || 0);

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
              className="w-full border px-4 py-2 rounded"
              value={amountPaid}
              onChange={(e) => setAmountPaid(parseFloat(e.target.value))}
              min={0}
              max={bill.totalAmount}
            />
          </div>

          <button
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={() => onSubmit(bill.billId, amountPaid, paymentMethod)}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayNowModal;
