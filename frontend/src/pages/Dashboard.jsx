import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaUsers, FaMoneyBillWave, FaUserCheck } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

const data = [
  { name: "Payments Done", value: 63 },
  { name: "Payments Pending", value: 25 },
];

const COLORS = ["#5a50e5", "#7cd4fd"];

const recentPayments = [
  { name: "Mithilesh K. Singh", amount: "Php. 3000", time: "30s ago" },
  { name: "Suron Maharjan", amount: "Php. 800", time: "58s ago" },
  { name: "Sandesh Bajracharya", amount: "Php. 5500", time: "1m ago" },
  { name: "Subin Sedhai", amount: "Php. 2000", time: "1m ago" },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r">
        <div className="text-2xl font-bold text-indigo-600 mb-10">
          <span role="img" aria-label="lightbulb">💡</span> Electricity <br /> Consumption <br /> Bill!!
        </div>
        <nav className="space-y-4 text-gray-700">
          <div className="font-semibold text-indigo-600">Dashboard</div>
          <div>Reports</div>
          <div>Manage User</div>
          <div>Generate Bill</div>
          <div>Profile</div>
        </nav>
        <button className="mt-10 w-full bg-indigo-600 text-white py-2 rounded-full flex items-center justify-center gap-2">
          <IoIosLogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">Pages / Dashboard</p>
            <h1 className="text-2xl font-bold">Main Dashboard</h1>
            <p className="text-sm text-green-500 font-semibold mt-1">Cebu Branch</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="w-10 h-10 bg-indigo-200 rounded-full"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
            <FaUsers className="text-indigo-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Users</p>
              <p className="text-lg font-bold">45</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
            <FaMoneyBillWave className="text-indigo-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Total Payments</p>
              <p className="text-lg font-bold">Php. 200,000</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
            <FaUserCheck className="text-indigo-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-lg font-bold">22</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm text-gray-500 mb-2">This Month</h3>
            <p className="text-2xl font-bold">Php. 200,000</p>
            <p className="text-green-500 text-sm mt-1">On track of this area</p>
            {/* Placeholder for line chart */}
            <div className="mt-4 h-40 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg" />
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
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-around text-sm mt-2">
              <span className="text-indigo-600 font-medium">Payments Done 63%</span>
              <span className="text-blue-400 font-medium">Payments Pending 25%</span>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recent Payments</h3>
            <button className="text-sm text-indigo-600 hover:underline">See all</button>
          </div>
          <ul className="divide-y">
            {recentPayments.map((user, index) => (
              <li key={index} className="flex justify-between py-3 items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500"></div>
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
      </main>
    </div>
  );
};

export default Dashboard;
