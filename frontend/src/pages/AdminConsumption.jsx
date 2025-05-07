import React, { useEffect, useState } from "react";
import { normalizeArrayResponse } from '../utils/normalize';

import api from "../api/apiConfig";

const AdminConsumption = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchConsumption = async () => {
      try {
        const res = await api.get("/api/consumption/all");
        const sorted = res.data.sort((a, b) => b.consumptionId - a.consumptionId);
        setRecords(sorted);
      } catch (err) {
        console.error("Error fetching all consumption:", err);
      }
    };
    fetchConsumption();
  }, []);

  const totalRecords = records.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalRecords / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
            {currentRecords.map((record) => (
              <tr key={record.consumptionId} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{record.consumptionId}</td>
                <td className="py-2 px-4">{record.customerFullName}</td>
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {Math.min(indexOfFirstRecord + 1, totalRecords)}–{Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} records
        </p>
        <div className="space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(totalRecords / recordsPerPage)}
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminConsumption;
