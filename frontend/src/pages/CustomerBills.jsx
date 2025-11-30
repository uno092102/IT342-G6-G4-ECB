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
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBills = async () => {
    if (!user?.accountId) {
      console.error("User not found");
      setError("User information not available");
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching bills for user:", user.accountId);
      
      const res = await api.get(`/bills/customer/${user.accountId}`);
      console.log("Bills response:", res.data);
      
      // Extract the array - handle various response formats
      let rawBills = [];
      if (Array.isArray(res.data)) {
        rawBills = res.data;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        rawBills = res.data.data;
      }

      console.log("Raw bills count:", rawBills.length);

      if (!rawBills || rawBills.length === 0) {
        console.log("No bills found");
        setBills([]);
        setLoading(false);
        return;
      }

      // Extract only the necessary bill fields to avoid circular reference issues
      const billsWithPayments = rawBills.map((bill) => {
        return {
          billId: bill.billId,
          billDate: bill.billDate,
          dueDate: bill.dueDate,
          totalAmount: bill.totalAmount,
          status: bill.status?.toUpperCase() || "UNPAID",
        };
      });

      const sortedBills = billsWithPayments.sort((a, b) => new Date(b.billDate) - new Date(a.billDate));
      console.log("Sorted bills:", sortedBills);
      setBills(sortedBills);
      setError("");
    } catch (error) {
      console.error("Error fetching bills:", error);
      setError("Failed to load bills. Please try again.");
      setBills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tariffsRes, chargesRes] = await Promise.all([
          api.get("/tariffs/getAll"),
          api.get("/charges/getAll"),
        ]);

        setTariffs(Array.isArray(tariffsRes.data) ? tariffsRes.data : []);
        setCharges(Array.isArray(chargesRes.data) ? chargesRes.data : []);
        await fetchBills();
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      }
    };

    if (user?.accountId) {
      fetchData();
    }
  }, [user?.accountId]);

  const handleRowClick = async (bill) => {
    try {
      const res = await api.get(`/bills/${bill.billId}`);
      console.log("Full bill data:", res.data);
      
      if (res.data) {
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
      } else {
        setError("Failed to load bill details.");
      }
    } catch (err) {
      console.error("Failed to fetch full bill:", err);
      setError("Failed to load bill details. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setSelectedBill(null);
  };

  const handlePayNow = async (billId, amountPaid, paymentMethod, paymentDate) => {
    try {
      console.log("Processing payment:", { billId, amountPaid, paymentMethod, paymentDate });
      
      const res = await api.post("/payments/add", {
        billId,
        amountPaid,
        paymentMethod,
        paymentDate,
      });

      console.log("Payment response:", res.data);

      // Refresh bills to get the updated status
      await fetchBills();
      
      setShowPayModal(false);
      setSelectedBill(null);
      setReceipt(res.data);
      setError("");
    } catch (error) {
      console.error("Payment failed:", error);
      setError(error.response?.data?.message || "Payment failed. Please try again.");
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

      {loading && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          Loading bills...
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
                    {bill.status === "PENDING" && <span className="text-yellow-500">PENDING</span>}
                    {bill.status === "UNPAID" && <span className="text-red-500">UNPAID</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  {loading ? "Loading..." : "No bills found."}
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
          onPay={() => setShowPayModal(true)}
        />
      )}

      {showPayModal && selectedBill && (
        <PayNowModal
          bill={selectedBill}
          onClose={() => {
            setShowPayModal(false);
            setSelectedBill(null);
          }}
          onSubmit={handlePayNow}
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
