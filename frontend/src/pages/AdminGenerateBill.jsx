import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AddConsumption = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        setLoading(true);
        setError("");
        const res = await api.get("/admin/customers");

        console.log("API Response:", res.data); // Debug log

        // API already returns only CUSTOMER users, no need to filter
        const customersData = Array.isArray(res.data) ? res.data : [];

        console.log("Processed customers:", customersData); // Debug log

        if (customersData.length === 0) {
          setError("No customers found in database.");
        }
        setCustomers(customersData);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError(`Failed to load customers: ${err.message}`);
      } finally {
        setLoading(false);
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
      <h2 className="text-xl font-bold">Generate Customer Bill</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {loading && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
          Loading customers...
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Customer</label>
          <select
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            disabled={loading}
          >
            <option value="">-- Select Customer --</option>
            {customers && customers.length > 0 ? (
              customers.map((cust) => (
                <option key={cust.accountId} value={cust.accountId}>
                  {cust.fname} {cust.lname} (ID: {cust.accountId})
                </option>
              ))
            ) : (
              <option disabled>No customers available</option>
            )}
          </select>
          <small className="text-gray-500">
            Total customers: {customers.length}
          </small>
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
          <label className="block text-sm font-medium mb-1">Number of Days</label>
          <input
            type="number"
            name="numDays"
            value={form.numDays}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
        disabled={loading}
      >
        Submit
      </button>

      {message && (
        <div className="mt-4 text-sm font-medium text-center">{message}</div>
      )}
    </div>
  );
};

export default AddConsumption;
