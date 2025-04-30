import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";
import CustomerBillModal from "./CustomerBillModal";

const CustomerBills = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [tariffs, setTariffs] = useState([]);
  const [charges, setCharges] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [billsRes, tariffsRes, chargesRes] = await Promise.all([
          api.get(`/bills/customer/${user.accountId}`),
          api.get("/tariffs/getAll"),
          api.get("/charges/getAll"),
        ]);

        const sortedBills = billsRes.data.sort(
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
      console.log("Selected bill details:", res.data);
      if (res.data?.consumption) {
        setSelectedBill(res.data);
      } else {
        alert("This bill doesn't include consumption details. Please check the backend response.");
      }
    } catch (err) {
      console.error("Failed to fetch full bill:", err);
    }
  };
  

  const handleCloseModal = () => {
    setSelectedBill(null);
  };

  const handlePayNow = async (billId) => {
    alert(`Paying for bill ID: ${billId}`);
    // Implement payment logic later
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
            {bills.map((bill) => (
              <tr
                key={bill.billId}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(bill)}
              >
                <td className="py-2 px-4">{bill.billId}</td>
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
    </div>
  );
};

export default CustomerBills;