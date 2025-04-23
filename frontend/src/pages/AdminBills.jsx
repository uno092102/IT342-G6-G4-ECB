// pages/AdminBills.jsx
import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await api.get("/bills/getAllBills");
        const sortedBills = res.data.sort(
          (a, b) => new Date(b.billDate) - new Date(a.billDate)
        );
        setBills(sortedBills);
      } catch (error) {
        console.error("Error fetching admin bills:", error);
      }
    };
  
    fetchBills();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">All Customer Bills</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 bg-gray-100">
            <tr>
              <th className="py-2 px-4">Bill ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Bill Date</th>
              <th className="py-2 px-4">Due Date</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.billId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{bill.billId}</td>
                <td className="py-2 px-4">{bill.customer?.fname} {bill.customer?.lname}</td>
                <td className="py-2 px-4">{bill.billDate}</td>
                <td className="py-2 px-4">{bill.dueDate}</td>
                <td className="py-2 px-4">₱{bill.totalAmount.toFixed(2)}</td>
                <td
                  className={`py-2 px-4 font-medium ${
                    bill.status === "PAID" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {bill.status}
                </td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No bills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBills;
