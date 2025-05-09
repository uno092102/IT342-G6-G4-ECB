import React, { useEffect, useState } from "react";
import api from "../api/apiConfig";

const AdminBillModal = ({ bill, tariffs = [], charges = [], onClose }) => {
  const [updatedBill, setUpdatedBill] = useState(null);

  useEffect(() => {
    const fetchUpdatedBill = async () => {
      try {
        const res = await api.get(`/bills/${bill.billId}`);
        setUpdatedBill(res.data);
      } catch (err) {
        console.error("Failed to fetch updated bill:", err);
        setUpdatedBill(bill); // fallback to original if error
      }
    };

    if (bill?.billId) fetchUpdatedBill();
  }, [bill]);

  if (!updatedBill) return null;

  const consumption = updatedBill.consumption ?? null;
  const totalKwh = typeof consumption?.totalKwh === "number" ? consumption.totalKwh : "N/A";

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") onClose();
  };

  const formatRate = (rate) => (typeof rate === "number" ? rate.toFixed(4) : "N/A");

  const formatDate = (dateStr, withTime = false) => {
    if (!dateStr) return "N/A";
    const options = withTime
      ? { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }
      : { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <div>
            <div className="text-2xl font-bold text-indigo-600 mb-10">
              💡 Electricity Consumption Billing
            </div>
            <h2 className="text-xl font-bold">Electricity Consumption Billing Portal</h2>
            <p className="text-sm text-gray-500">Invoice for Bill #{updatedBill.billId}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1">Customer Information</h3>
          <p><strong>Name:</strong> {updatedBill.customer?.fname} {updatedBill.customer?.lname}</p>
          <p><strong>Email:</strong> {updatedBill.customer?.email}</p>
          <p><strong>Account ID:</strong> {updatedBill.customer?.accountId}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1">Consumption Details</h3>
          <p><strong>Period From:</strong> {formatDate(consumption?.periodFrom)}</p>
          <p><strong>Period To:</strong> {formatDate(consumption?.periodTo)}</p>
          <p><strong>Total kWh:</strong> {totalKwh}</p>
          <p><strong>Avg kWh/day:</strong> {typeof consumption?.avgKwhPerDay === "number" ? consumption.avgKwhPerDay : "N/A"}</p>
          <p><strong>Number of Days:</strong> {typeof consumption?.numDays === "number" ? consumption.numDays : "N/A"}</p>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-1">Tariff Breakdown</h3>
            {tariffs.length > 0 ? (
              <ul className="list-disc ml-6">
                {tariffs.map((t) => (
                  <li key={t.tariffID}>
                    {t.tariffType}: ₱{formatRate(t?.ratePerKwh ?? t?.rate)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No tariff data available.</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">Charge Breakdown</h3>
            {charges.length > 0 ? (
              <ul className="list-disc ml-6">
                {charges.map((c) => (
                  <li key={c.chargeId}>
                    {c.chargeType}: ₱{formatRate(c.ratePerKwh)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No charge data available.</p>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <p><strong>Bill Date:</strong> {formatDate(updatedBill.billDate)}</p>
          <p><strong>Due Date:</strong> {formatDate(updatedBill.dueDate)}</p>
          <p><strong>Created At:</strong> {formatDate(updatedBill.createdAt, true)}</p>
          <p><strong>Status:</strong> <span className={
            updatedBill.status === "PAID" ? "text-green-600" :
            updatedBill.status === "PENDING" ? "text-yellow-600" : "text-red-600"
          }>{updatedBill.status}</span></p>
          <p className="text-xl font-bold mt-2">Total Amount: ₱{updatedBill.totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminBillModal;
