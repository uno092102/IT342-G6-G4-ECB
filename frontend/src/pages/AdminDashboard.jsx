import React from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaUsers, FaMoneyBillWave, FaUserCheck } from "react-icons/fa";

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

const AdminDashboard = () => {
  return (
    <>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">This Month</h3>
          <p className="text-2xl font-bold">Php. 200,000</p>
          <p className="text-green-500 text-sm mt-1">On track of this area</p>
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
    </>
  );
};

export default AdminDashboard;
