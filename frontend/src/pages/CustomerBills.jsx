import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";
import CustomerBillModal from "./CustomerBillModal";
import PaymentReceiptModal from "./PaymentReceiptModal";

const CustomerBills = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [tariffs, setTariffs] = useState([]);
  const [charges, setCharges] = useState([]);
  const [receipt, setReceipt] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [billsRes, tariffsRes, chargesRes] = await Promise.all([
          api.get(`/bills/customer/${user.accountId}`),
          api.get("/tariffs/getAll"),
          api.get("/charges/getAll"),
        ]);
  
        // ✅ FIX: Normalize .data even if it's not an array
        const rawBills = Array.isArray(billsRes.data)
          ? billsRes.data
          : billsRes.data?.data && Array.isArray(billsRes.data.data)
            ? billsRes.data.data
            : [];
  
        const sortedBills = rawBills.sort(
          (a, b) => new Date(b.billDate) - new Date(a.billDate)
        );
  
        setBills(sortedBills);
        setTariffs(tariffsRes.data);
        setCharges(chargesRes.data);
      } catch (error) {
        console.error("Error fetching customer bills:", error);
      }
    };
  
    fetchData();
  }, [user]);
  

  const handleRowClick = async (bill) => {
    try {
      const res = await api.get(`/bills/${bill.billId}`);
      if (res.data?.consumption) {
        setSelectedBill(res.data);
      } else {
        alert("This bill doesn't include consumption details.");
      }
    } catch (err) {
      console.error("Failed to fetch full bill:", err);
    }
  };

  const handleCloseModal = () => {
    setSelectedBill(null);
  };

  const handlePayNow = async (billId, amountPaid, paymentMethod, callback) => {
    if (!amountPaid || amountPaid <= 0) {
      return alert("Please enter a valid amount.");
    }

    try {
      const res = await api.post("/payments/add", {
        billId,
        amountPaid,
        paymentMethod,
      });

      alert("Payment successful!");

      // ✅ Normalize updated bills
      const updatedBillsRes = await api.get(`/bills/customer/${user.accountId}`);
      const updatedBills = Array.isArray(updatedBillsRes.data)
        ? updatedBillsRes.data
        : updatedBillsRes.data?.data && Array.isArray(updatedBillsRes.data.data)
          ? updatedBillsRes.data.data
          : [];

      const sortedUpdated = updatedBills.sort(
        (a, b) => new Date(b.billDate) - new Date(a.billDate)
      );
      setBills(sortedUpdated);

      setSelectedBill(null);
      setReceipt(res.data);

      if (callback) callback(res.data);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">My Bills</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 bg-gray-100">
            <tr>
              <th className="py-2 px-4">Bill ID</th>
              <th className="py-2 px-4">Bill Date</th>
              <th className="py-2 px-4">Due Date</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bills) && bills.length > 0 ? (
              bills.map((bill) => (
                <tr
                  key={bill.billId}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(bill)}
                >
                  <td className="py-2 px-4">{bill.billId}</td>
                  <td className="py-2 px-4">{bill.billDate}</td>
                  <td className="py-2 px-4">{bill.dueDate}</td>
                  <td className="py-2 px-4">₱{bill.totalAmount.toFixed(2)}</td>
                  <td className="py-2 px-4 font-medium">
                    {bill.status === "PAID" && <span className="text-green-600">PAID</span>}
                    {bill.status === "Pending" && <span className="text-yellow-500">PENDING</span>}
                    {bill.status === "Unpaid" && <span className="text-red-500">UNPAID</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No bills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedBill && (
        <CustomerBillModal
          bill={selectedBill}
          tariffs={tariffs}
          charges={charges}
          onClose={handleCloseModal}
          onPay={handlePayNow}
        />
      )}

      {receipt && (
        <PaymentReceiptModal
          receipt={receipt}
          onClose={() => setReceipt(null)}
        />
      )}
    </div>
  );
};

export default CustomerBills;
