import React, { useEffect, useState } from "react";
import { FaUsers, FaMoneyBillWave, FaUserCheck } from "react-icons/fa";
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
        const pending = billsRes.data.filter(b => b.status === "Pending").length;
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
            name: `${p.customer?.fname} ${p.customer?.lname}`,
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
      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaUsers className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Users</p>
            <p className="text-lg font-bold">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaMoneyBillWave className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Total Payments</p>
            <p className="text-lg font-bold">₱{totalPayments.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaUserCheck className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Total Consumption</p>
            <p className="text-lg font-bold">{totalConsumption.toLocaleString()} kWh</p>
          </div>
        </div>
      </div>

      {/* MIDDLE CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">This Month</h3>
          <p className="text-2xl font-bold">₱{totalPayments.toLocaleString()}</p>
          <p className="text-green-500 text-sm mt-1">On track of this area</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={consumptionChart}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="kWh" stroke="#5a50e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold">Payment Analysis</h3>
            <select className="text-sm border px-2 py-1 rounded-md">
              <option>Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                label
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around text-sm mt-2">
            <span className="text-indigo-600 font-medium">Payments Done {paymentStatusData[0]?.value || 0}</span>
            <span className="text-blue-400 font-medium">Pending {paymentStatusData[1]?.value || 0}</span>
          </div>
        </div>
      </div>

      {/* RECENT PAYMENTS */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Recent Payments</h3>
          <button className="text-sm text-indigo-600 hover:underline">See all</button>
        </div>
        <ul className="divide-y">
          {recentPayments.map((user, index) => (
            <li key={index} className="flex justify-between py-3 items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500" />
                <span className="font-medium text-gray-700">{user.name}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">{user.amount}</p>
                <p className="text-xs text-gray-400">{user.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;
