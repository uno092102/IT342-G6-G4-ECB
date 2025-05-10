import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaFileInvoice,
  FaClock,
  FaBolt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../api/apiConfig";

const CustomerDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [latestPayment, setLatestPayment] = useState(null);
  const [recentBill, setRecentBill] = useState(null);
  const [monthlyPayments, setMonthlyPayments] = useState([]);
  const [monthlyConsumption, setMonthlyConsumption] = useState([]);
  const [unpaidBills, setUnpaidBills] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [billsRes, paymentsRes, consumptionRes] = await Promise.all([
          api.get(`/bills/customer/${user.accountId}`),
          api.get(`/payments/customer/${user.accountId}`),
          api.get(`/api/consumption/customer/${user.accountId}`),
        ]);

        const bills = Array.isArray(billsRes.data) ? billsRes.data : [];
        const payments = Array.isArray(paymentsRes.data) ? paymentsRes.data : [];
        const consumption = Array.isArray(consumptionRes.data) ? consumptionRes.data : [];

        // Outstanding balance
        const unpaidBillsList = bills.filter(b => b.status === "UNPAID" || b.status === "PENDING");
        setUnpaidBills(unpaidBillsList);
        const balanceDue = unpaidBillsList.reduce((sum, b) => sum + b.totalAmount, 0);
        setBalance(balanceDue);

        // Unpaid bill count
        setUnpaidCount(unpaidBillsList.length);

        // Latest payment
        const sortedPayments = payments.sort(
          (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
        );
        setLatestPayment(sortedPayments[0]);

        // Most recent bill
        const sortedBills = bills.sort(
          (a, b) => new Date(b.billDate) - new Date(a.billDate)
        );
        setRecentBill(sortedBills[0]);

        // Monthly Payments
        const paymentsByMonth = {};
        payments.forEach((p) => {
          const month = new Date(p.paymentDate).toLocaleString("default", {
            month: "short",
          });
          paymentsByMonth[month] = (paymentsByMonth[month] || 0) + p.amountPaid;
        });
        const paymentsChart = Object.entries(paymentsByMonth).map(([month, total]) => ({
          month,
          value: total,
        }));
        setMonthlyPayments(paymentsChart);

        // Monthly Consumption
        const consumptionByMonth = {};
        consumption.forEach((c) => {
          const date = new Date(c.createdAt || c.periodTo);
          const month = date.toLocaleString("default", { month: "short" });
          consumptionByMonth[month] = (consumptionByMonth[month] || 0) + c.totalKwh;
        });
        const consumptionChart = Object.entries(consumptionByMonth).map(([month, kWh]) => ({
          month,
          value: kWh,
        }));
        setMonthlyConsumption(consumptionChart);
      } catch (err) {
        console.error("Customer dashboard error:", err);
      }
    };

    fetchDashboardData();
  }, [user.accountId]);

  return (
    <>
      <h2 className="text-xl font-bold mb-6">Welcome to Your Dashboard</h2>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaMoneyBillWave className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Outstanding Balance</p>
            <p className="text-lg font-bold">₱{balance.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaFileInvoice className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Unpaid Bills</p>
            <p className="text-lg font-bold">{unpaidCount}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaClock className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Latest Payment</p>
            <p className="text-lg font-bold">
              {latestPayment ? `₱${latestPayment.amountPaid.toFixed(2)}` : "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaBolt className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Most Recent Bill</p>
            <p className="text-lg font-bold">
              {recentBill ? `₱${recentBill.totalAmount.toFixed(2)}` : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Unpaid Bills */}
      {unpaidBills.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Unpaid Bills</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-600 bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Bill ID</th>
                  <th className="py-2 px-4">Bill Date</th>
                  <th className="py-2 px-4">Due Date</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {unpaidBills.map((bill) => (
                  <tr key={bill.billId} className="border-b">
                    <td className="py-2 px-4">{bill.billId}</td>
                    <td className="py-2 px-4">{new Date(bill.billDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4">{new Date(bill.dueDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4">₱{bill.totalAmount.toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <span className={
                        bill.status === "PENDING" ? "text-yellow-500" : "text-red-500"
                      }>
                        {bill.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">Monthly Payments</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyPayments}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#5a50e5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">Monthly Consumption</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyConsumption}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7cd4fd"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
