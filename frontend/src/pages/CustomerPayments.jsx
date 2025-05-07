import React, { useEffect, useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import api from "../api/apiConfig";

const CustomerPayments = () => {
  const [payments, setPayments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get(`/payments/customer/${user.accountId}`);
        const raw = Array.isArray(res.data) ? res.data : res.data.data || [];
        setPayments(raw);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [user.accountId]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">My Payments</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 bg-gray-100">
            <tr>
              <th className="py-2 px-4">Payment ID</th>
              <th className="py-2 px-4">Bill ID</th>
              <th className="py-2 px-4">Amount Paid</th>
              <th className="py-2 px-4">Method</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(payments) && payments.length > 0 ? (
              payments.map((p) => (
                <tr key={p.paymentId} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{p.paymentId ?? "N/A"}</td>
                  <td className="py-2 px-4">{p.billId ?? "N/A"}</td>
                  <td className="py-2 px-4">
                    ₱{typeof p.amountPaid === "number" ? p.amountPaid.toFixed(2) : "N/A"}
                  </td>
                  <td className="py-2 px-4">{p.paymentMethod ?? "N/A"}</td>
                  <td className="py-2 px-4">
                    {p.paymentDate ? new Date(p.paymentDate).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPayments;
