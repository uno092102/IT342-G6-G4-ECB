import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/payments/");
        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      }
    };
    fetchPayments();
  }, []);

  const totalRecords = payments.length;
  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);
  const currentRecords = payments.slice(startRecord - 1, endRecord);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (endRecord < totalRecords) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">All Payments</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 bg-gray-100">
            <tr>
              <th className="py-2 px-4">Payment ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Bill ID</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Method</th>
              <th className="py-2 px-4">Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((payment) => (
              <tr key={payment.paymentId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{payment.paymentId}</td>
                <td className="py-2 px-4">
                  {payment.customer?.fname} {payment.customer?.lname}
                </td>
                <td className="py-2 px-4">{payment.bill?.billId}</td>
                <td className="py-2 px-4">{payment.paymentDate}</td>
                <td className="py-2 px-4">{payment.paymentMethod}</td>
                <td className="py-2 px-4">
                  ₱{payment.amountPaid ? payment.amountPaid.toFixed(2) : "0.00"}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600 mb-2">
          Showing {startRecord}-{endRecord} of {totalRecords} records
        </div>
        <div className="space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
        
        
          <button
            onClick={handleNextPage}
            disabled={endRecord >= totalRecords}
            className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
