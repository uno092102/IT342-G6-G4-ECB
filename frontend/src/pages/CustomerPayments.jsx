// pages/CustomerPayments.jsx
import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const CustomerPayments = () => {
  const [payments, setPayments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get(`/payments/customer/${user.accountId}`);
        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching customer payments:", err);
      }
    };
    fetchPayments();
  }, [user]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">My Payments</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 bg-gray-100">
            <tr>
              <th className="py-2 px-4">Payment ID</th>
              <th className="py-2 px-4">Bill ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Method</th>
              <th className="py-2 px-4">Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{payment.paymentId}</td>
                <td className="py-2 px-4">{payment.bill?.billId}</td>
                <td className="py-2 px-4">{payment.paymentDate}</td>
                <td className="py-2 px-4">{payment.paymentMethod}</td>
                <td className="py-2 px-4">₱{payment.amountPaid.toFixed(2)}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPayments;
