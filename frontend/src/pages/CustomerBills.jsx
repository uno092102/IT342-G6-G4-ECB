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

      const sortedBills = billsWithPayments
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
        const [tariffsRes, chargesRes] = await Promise.all([
          api.get("/tariffs/getAll"),
          api.get("/charges/getAll"),
        ]);

        setTariffs(tariffsRes.data);
        setCharges(chargesRes.data);
        await fetchBills();
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, [user]);

  const handleRowClick = async (bill) => {
    try {
      const res = await api.get(`/bills/${bill.billId}`);
      if (res.data?.consumption) {
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

      await fetchBills(); // Refresh bills to get the updated status
      setShowPayModal(false);
      setSelectedBill(null); // Close the bill modal
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
            setError("");
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
