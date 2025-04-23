import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AddConsumption = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customerId: "",
    periodFrom: "",
    periodTo: "",
    numDays: "",
    totalKwh: "",
    avgKwhPerDay: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get("/admin/customers");
        setCustomers(res.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    };
    fetchCustomers();
  }, []);

  // Auto-calculate number of days and avgKwhPerDay
  useEffect(() => {
    const { periodFrom, periodTo, totalKwh } = form;
    if (periodFrom && periodTo) {
      const start = new Date(periodFrom);
      const end = new Date(periodTo);
      const numDays = Math.max(
        Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1,
        0
      );

      const avg = totalKwh && numDays > 0 ? (totalKwh / numDays).toFixed(2) : "";

      setForm((prev) => ({
        ...prev,
        numDays: isNaN(numDays) ? "" : numDays,
        avgKwhPerDay: avg,
      }));
    }
  }, [form.periodFrom, form.periodTo, form.totalKwh]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { customerId, periodFrom, periodTo, numDays, totalKwh } = form;
    if (!customerId || !periodFrom || !periodTo || !numDays || !totalKwh) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      await api.post(`/api/consumption/new?customerId=${customerId}`, {
        periodFrom,
        periodTo,
        numDays: Number(numDays),
        totalKwh: Number(totalKwh),
        avgKwhPerDay: Number(form.avgKwhPerDay),
      });
      setMessage("✅ Consumption recorded and bill generated!");
      setForm({
        customerId: "",
        periodFrom: "",
        periodTo: "",
        numDays: "",
        totalKwh: "",
        avgKwhPerDay: "",
      });
    } catch (err) {
      console.error("Error submitting:", err);
      setMessage("❌ Failed to submit consumption.");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">Add Consumption (Auto-Generates Bill)</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Customer</label>
          <select
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Customer --</option>
            {customers.map((cust) => (
              <option key={cust.accountId} value={cust.accountId}>
                {cust.fname} {cust.lname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Period From</label>
          <input
            type="date"
            name="periodFrom"
            value={form.periodFrom}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Period To</label>
          <input
            type="date"
            name="periodTo"
            value={form.periodTo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Total kWh</label>
          <input
            type="number"
            name="totalKwh"
            value={form.totalKwh}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1"># of Days (auto)</label>
          <input
            type="number"
            name="numDays"
            value={form.numDays}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Avg kWh/Day (auto)</label>
          <input
            type="number"
            name="avgKwhPerDay"
            value={form.avgKwhPerDay}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Submit
      </button>

      {message && <div className="mt-4 text-sm font-medium text-center">{message}</div>}
    </div>
  );
};

export default AddConsumption;
