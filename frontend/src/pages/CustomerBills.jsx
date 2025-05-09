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

  const fetchBills = async () => {
    const res = await api.get(`/bills/customer/${user.accountId}`);
    const rawBills = Array.isArray(res.data)
      ? res.data
      : res.data?.data && Array.isArray(res.data.data)
        ? res.data.data
        : [];
    const sortedBills = rawBills.sort(
      (a, b) => new Date(b.billDate) - new Date(a.billDate)
    );
    setBills(sortedBills);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchBills();
        const tariffsRes = await api.get("/tariffs/getAll");
        const chargesRes = await api.get("/charges/getAll");
        setTariffs(tariffsRes.data);
        setCharges(chargesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

      const { payment, updatedBill } = res.data;
      alert("Payment successful!");
      setReceipt(payment);
      setSelectedBill(updatedBill); // ✅ shows updated status
      await fetchBills(); 

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
                    {(!bill.status || bill.status === "UNPAID") && <span className="text-red-500">UNPAID</span>}
                    {bill.status === "PENDING" && <span className="text-yellow-500">PENDING</span>}
                    {bill.status === "PAID" && <span className="text-green-600">PAID</span>}
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
