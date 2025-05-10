import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";
import CustomerBillModal from "./CustomerBillModal";
import PaymentReceiptModal from "./PaymentReceiptModal";
import PayNowModal from "./PayNowModal";

const CustomerBills = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [tariffs, setTariffs] = useState([]);
  const [charges, setCharges] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBills = async () => {
    try {
      const res = await api.get(`/bills/customer/${user.accountId}`);
      const rawBills = Array.isArray(res.data)
        ? res.data
        : res.data?.data && Array.isArray(res.data.data)
        ? res.data.data
        : [];

      const sortedBills = rawBills
        .map(b => ({
          ...b,
          status: b.status?.toUpperCase() || "UNPAID"
        }))
        .sort((a, b) => new Date(b.billDate) - new Date(a.billDate));

      setBills(sortedBills);
    } catch (error) {
      console.error("Error fetching bills:", error);
      setError("Failed to load bills. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [billsRes, tariffsRes, chargesRes] = await Promise.all([
          api.get(`/bills/customer/${user.accountId}`),
          api.get("/tariffs/getAll"),
          api.get("/charges/getAll"),
        ]);

        const rawBills = Array.isArray(billsRes.data)
          ? billsRes.data
          : billsRes.data?.data && Array.isArray(billsRes.data.data)
          ? billsRes.data.data
          : [];

        const sortedBills = rawBills
          .map(b => ({
            ...b,
            status: b.status?.toUpperCase() || "UNPAID"
          }))
          .sort((a, b) => new Date(b.billDate) - new Date(a.billDate));

        setBills(sortedBills);
        setTariffs(tariffsRes.data);
        setCharges(chargesRes.data);
      } catch (error) {
        console.error("Error fetching customer bills:", error);
        setError("Failed to load data. Please try again.");
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
        setError("This bill doesn't include consumption details.");
      }
    } catch (err) {
      console.error("Failed to fetch full bill:", err);
      setError("Failed to load bill details. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setSelectedBill(null);
    setError("");
  };

  const handlePayNow = async (billId, amountPaid, paymentMethod) => {
    try {
      console.log("Processing payment:", { billId, amountPaid, paymentMethod });
      
      const res = await api.post("/payments/add", {
        billId,
        amountPaid,
        paymentMethod,
      });

      console.log("Payment response:", res.data);

      await fetchBills(); // Refresh bills to get the updated status
      setShowPayModal(false);
      setReceipt(res.data);
      setError("");
    } catch (error) {
      console.error("Payment failed:", error);
      setError(error.response?.data || "Payment failed. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">My Bills</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 bg-gray-100">
            <tr>
              <th className="py-2 px-4">Bill ID</th>
              <th className="py-2 px-4">Bill Date</th>
              <th className="py-2 px-4">Due Date</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bills) && bills.length > 0 ? (
              bills.map((bill) => (
                <tr
                  key={bill.billId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>{bill.billId}</td>
                  <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>{bill.billDate}</td>
                  <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>{bill.dueDate}</td>
                  <td className="py-2 px-4 cursor-pointer" onClick={() => handleRowClick(bill)}>₱{bill.totalAmount.toFixed(2)}</td>
                  <td className="py-2 px-4 font-medium">
                    {bill.status === "PAID" && <span className="text-green-600">PAID</span>}
                    {bill.status === "PENDING" && <span className="text-yellow-500">PENDING</span>}
                    {bill.status === "UNPAID" && <span className="text-red-500">UNPAID</span>}
                  </td>
                  <td className="py-2 px-4">
                    {bill.status !== "PAID" && (
                      <button
                        onClick={() => {
                          setSelectedBill(bill);
                          setShowPayModal(true);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No bills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedBill && showPayModal && (
        <PayNowModal
          bill={selectedBill}
          onClose={() => {
            setShowPayModal(false);
            setSelectedBill(null);
            setError("");
          }}
          onSubmit={handlePayNow}
        />
      )}

      {selectedBill && !showPayModal && (
        <CustomerBillModal
          bill={selectedBill}
          tariffs={tariffs}
          charges={charges}
          onClose={handleCloseModal}
          onPay={() => setShowPayModal(true)}
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
