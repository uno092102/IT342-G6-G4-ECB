import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminReports = () => {
  const [activity, setActivity] = useState({ bills: [], payments: [], consumptions: [] });
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await api.get("/admin/reports");
        const { bills, payments, consumptions } = res.data;

        const all = [
          ...bills.map((b) => ({
            type: "Bill",
            date: b.billDate,
            message: `Bill #${b.billId} generated for ${b.customer?.fname} ${b.customer?.lname}`
          })),
          ...payments.map((p) => ({
            type: "Payment",
            date: p.paymentDate,
            message: `Payment of ₱${p.amountPaid} received for Bill #${p.bill?.billId} by ${p.customer?.fname} ${p.customer?.lname}`
          })),
          ...consumptions.map((c) => ({
            type: "Consumption",
            date: c.periodTo,
            message: `Consumption from ${c.periodFrom} to ${c.periodTo} recorded for ${c.customer?.fname} ${c.customer?.lname}`
          }))
        ];

        // Sort newest to oldest
        const sorted = all.sort((a, b) => new Date(b.date) - new Date(a.date));
        setActivity({ bills, payments, consumptions, all: sorted });
      } catch (error) {
        console.error("Failed to fetch activity logs:", error);
      }
    };
    fetchActivity();
  }, []);

  const filtered =
    filter === "ALL"
      ? activity.all
      : activity.all?.filter((item) => item.type.toUpperCase() === filter);

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Activity Reports</h2>
        <select
          className="border px-3 py-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="Bill">Bills</option>
          <option value="Payment">Payments</option>
          <option value="Consumption">Consumptions</option>
        </select>
      </div>

      <ul className="space-y-3 max-h-[600px] overflow-y-auto">
        {filtered?.length > 0 ? (
          filtered.map((log, index) => (
            <li key={index} className="border p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-1">{new Date(log.date).toLocaleString()}</div>
              <div className="text-base text-gray-800">{log.message}</div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No records found for this filter.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminReports;
