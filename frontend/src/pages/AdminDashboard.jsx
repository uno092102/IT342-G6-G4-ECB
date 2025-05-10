import React, { useEffect, useState } from "react";
import { FaUsers, FaMoneyBillWave, FaUserCheck, FaUser, FaBolt } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import api from "../api/apiConfig";

const COLORS = ["#5a50e5", "#7cd4fd"];

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [paymentStatusData, setPaymentStatusData] = useState([]);
  const [consumptionChart, setConsumptionChart] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, paymentsRes, consumptionRes, billsRes] = await Promise.all([
          api.get("/admin/customers"),
          api.get("/payments/"),
          api.get("/api/consumption/all"),
          api.get("/bills/getAllBills"),
        ]);

        setTotalUsers(usersRes.data.length);

        const totalPaid = paymentsRes.data.reduce((sum, p) => sum + p.amountPaid, 0);
        setTotalPayments(totalPaid);

        const totalKwh = consumptionRes.data.reduce((sum, c) => sum + (c.totalKwh || 0), 0);
        setTotalConsumption(totalKwh);

        const paid = billsRes.data.filter(b => b.status === "PAID").length;
        const pending = billsRes.data.filter(b => b.status === "PENDING").length;
        setPaymentStatusData([
          { name: "Payments Done", value: paid },
          { name: "Payments Pending", value: pending },
        ]);

        const grouped = {};
        const currentYear = new Date().getFullYear();
        consumptionRes.data.forEach((c) => {
          const date = new Date(c.createdAt || c.periodTo);
          if (date.getFullYear() === currentYear) {
            const month = date.toLocaleString("default", { month: "short" });
            grouped[month] = (grouped[month] || 0) + (c.totalKwh || 0);
          }
        });
        const monthlyData = Object.keys(grouped).map((m) => ({ month: m, kWh: grouped[m] }));
        setConsumptionChart(monthlyData);

        const latest = paymentsRes.data
          .slice()
          .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
          .slice(0, 5)
          .map(p => ({
            name: p.customer?.fname && p.customer?.lname 
              ? `${p.customer.fname} ${p.customer.lname}`
              : "Unknown Customer",
            amount: `₱${p.amountPaid.toFixed(2)}`,
            time: new Date(p.paymentDate).toLocaleTimeString(),
          }));

        setRecentPayments(latest);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaUsers className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-lg font-bold">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaMoneyBillWave className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Total Payments</p>
            <p className="text-lg font-bold">₱{totalPayments.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaBolt className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Total Consumption</p>
            <p className="text-lg font-bold">{totalConsumption.toFixed(2)} kWh</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaUserCheck className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Active Customers</p>
            <p className="text-lg font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">Payment Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">Monthly Consumption</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={consumptionChart}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="kWh"
                stroke="#7cd4fd"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
        <div className="space-y-4">
          {recentPayments.map((payment, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{payment.name}</p>
                  <p className="text-sm text-gray-500">{payment.time}</p>
                </div>
              </div>
              <p className="font-semibold text-green-600">{payment.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
