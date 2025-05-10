import React, { useEffect, useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import api from "../api/apiConfig";
import BillModal from "./AdminBillModal";
import EditBillModal from "./EditBillModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const AdminBills = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [editBill, setEditBill] = useState(null);
  const [deleteBillId, setDeleteBillId] = useState(null);
  const [tariffs, setTariffs] = useState([]);
  const [charges, setCharges] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchBills = async () => {
    try {
      const billsRes = await api.get("/bills/getAllBills");
      const rawBills = Array.isArray(billsRes.data) ? billsRes.data : [];

      // Fetch payments for each bill to calculate remaining balance and status
      const billsWithPayments = await Promise.all(
        rawBills.map(async (bill) => {
          try {
            const paymentsRes = await api.get(`/payments/bill/${bill.billId}`);
            const payments = Array.isArray(paymentsRes.data) ? paymentsRes.data : [];
            const totalPaid = payments.reduce((sum, p) => sum + p.amountPaid, 0);
            const remainingBalance = bill.totalAmount - totalPaid;
            
            let status = "UNPAID";
            if (remainingBalance <= 0) {
              status = "PAID";
            } else if (totalPaid > 0) {
              status = "PENDING";
            }

            return {
              ...bill,
              status: status,
              totalPaid,
              remainingBalance
            };
          } catch (err) {
            console.error(`Error fetching payments for bill ${bill.billId}:`, err);
            return {
              ...bill,
              status: bill.status?.toUpperCase() || "UNPAID",
              totalPaid: 0,
              remainingBalance: bill.totalAmount
            };
          }
        })
      );

      setBills(billsWithPayments);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tariffsRes, chargesRes] = await Promise.all([
          api.get("/tariffs/getAll"),
          api.get("/charges/getAll"),
        ]);

        setTariffs(tariffsRes.data);
        setCharges(chargesRes.data);
        await fetchBills();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = async (bill) => {
    try {
      const res = await api.get(`/bills/${bill.billId}`);
      // Include payment information in the selected bill
      const paymentsRes = await api.get(`/payments/bill/${bill.billId}`);
      const payments = Array.isArray(paymentsRes.data) ? paymentsRes.data : [];
      const totalPaid = payments.reduce((sum, p) => sum + p.amountPaid, 0);
      const remainingBalance = res.data.totalAmount - totalPaid;
      
      let status = "UNPAID";
      if (remainingBalance <= 0) {
        status = "PAID";
      } else if (totalPaid > 0) {
        status = "PENDING";
      }

      setSelectedBill({
        ...res.data,
        status,
        totalPaid,
        remainingBalance
      });
    } catch (err) {
      console.error("Failed to fetch full bill info:", err);
    }
  };

  const handleEdit = (bill) => {
    setEditBill(bill);
  };

  const handleDelete = (billId) => {
    setDeleteBillId(billId);
  };

  const closeModal = () => setSelectedBill(null);
  const closeEditModal = () => setEditBill(null);
  const closeDeleteModal = () => setDeleteBillId(null);

  const updateBillInList = (updatedBill) => {
    setBills(bills.map(b => b.billId === updatedBill.billId ? updatedBill : b));
    // Refresh the bills list to get updated status
    fetchBills();
  };

  const removeBillFromList = (id) => {
    setBills(bills.filter(b => b.billId !== id));
  };

  const totalRecords = bills.length;
  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);
  const currentRecords = bills.slice(startRecord - 1, endRecord);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (endRecord < totalRecords) setCurrentPage(currentPage + 1);
  };

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
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((bill) => (
              <tr
                key={bill.billId}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>{bill.billId}</td>
                <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>{bill.customer?.fname} {bill.customer?.lname}</td>
                <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>{bill.billDate}</td>
                <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>{bill.dueDate}</td>
                <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>₱{bill.totalAmount.toFixed(2)}</td>
                <td
                  className={`py-2 px-4 font-medium cursor-pointer ${
                    bill.status === "PAID" ? "text-green-600" :
                    bill.status === "PENDING" ? "text-yellow-500" : "text-red-500"
                  }`}
                  onClick={() => handleRowClick(bill)}
                >
                  {bill.status}
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(bill)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bill.billId)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  No bills found.
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

      {selectedBill && (
        <BillModal
          bill={selectedBill}
          tariffs={tariffs}
          charges={charges}
          onClose={closeModal}
          onUpdated={fetchBills}
        />
      )}

      {editBill && (
        <EditBillModal
          bill={editBill}
          onClose={closeEditModal}
          onUpdated={updateBillInList}
        />
      )}

      {deleteBillId && (
        <ConfirmDeleteModal
          billId={deleteBillId}
          onClose={closeDeleteModal}
          onDeleted={removeBillFromList}
        />
      )}
    </div>
  );
};

export default AdminBills;
