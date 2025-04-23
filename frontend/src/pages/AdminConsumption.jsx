// pages/AdminConsumption.jsx
import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminConsumption = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchConsumption = async () => {
      try {
        const res = await api.get("/api/consumption/all");
        setRecords(res.data);
      } catch (err) {
        console.error("Error fetching all consumption:", err);
      }
    };
    fetchConsumption();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">All Customer Consumption Records</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">From</th>
              <th className="py-2 px-4">To</th>
              <th className="py-2 px-4">Days</th>
              <th className="py-2 px-4">Avg kWh/day</th>
              <th className="py-2 px-4">Total kWh</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.consumptionId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{record.consumptionId}</td>
                <td className="py-2 px-4">
                  {record.customer?.fname} {record.customer?.lname}
                </td>
                <td className="py-2 px-4">{record.periodFrom}</td>
                <td className="py-2 px-4">{record.periodTo}</td>
                <td className="py-2 px-4">{record.numDays}</td>
                <td className="py-2 px-4">{record.avgKwhPerDay}</td>
                <td className="py-2 px-4">{record.totalKwh}</td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminConsumption;
