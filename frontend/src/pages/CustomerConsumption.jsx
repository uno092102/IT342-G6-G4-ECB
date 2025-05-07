// pages/CustomerConsumption.jsx
import React, { useEffect, useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import api from "../api/apiConfig";

const CustomerConsumption = () => {
  const [records, setRecords] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchConsumption = async () => {
      try {
        const res = await api.get(`/api/consumption/customer/${user.accountId}`);
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching customer consumption:", err);
      }
    };
    fetchConsumption();
  }, [user]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">My Consumption Records</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">From</th>
              <th className="py-2 px-4">To</th>
              <th className="py-2 px-4"># Days</th>
              <th className="py-2 px-4">Avg kWh/day</th>
              <th className="py-2 px-4">Total kWh</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.consumptionId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{record.consumptionId}</td>
                <td className="py-2 px-4">{record.periodFrom}</td>
                <td className="py-2 px-4">{record.periodTo}</td>
                <td className="py-2 px-4">{record.numDays}</td>
                <td className="py-2 px-4">{record.avgKwhPerDay}</td>
                <td className="py-2 px-4">{record.totalKwh}</td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">
                  No consumption records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerConsumption;
