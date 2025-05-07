import React, { useState } from "react";
import PayNowModal from "./PayNowModal";

const CustomerBillModal = ({ bill, tariffs = [], charges = [], onClose, onPay }) => {
  const [showPayModal, setShowPayModal] = useState(false);
  const [lastPayment, setLastPayment] = useState(null);

  const consumption = bill.consumption ?? null;
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
            <div className="text-2xl font-bold text-blue-600 mb-10">💡 Your Electricity Bill</div>
            <h2 className="text-xl font-bold">Electricity Consumption Billing</h2>
            <p className="text-sm text-gray-500">Bill ID: #{bill.billId}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1">Consumption Details</h3>
          <p><strong>Period From:</strong> {formatDate(consumption?.periodFrom)}</p>
          <p><strong>Period To:</strong> {formatDate(consumption?.periodTo)}</p>
          <p><strong>Total kWh:</strong> {totalKwh}</p>
          <p><strong>Avg kWh/day:</strong> {typeof consumption?.avgKwhPerDay === "number" ? consumption.avgKwhPerDay : "N/A"}</p>
          <p><strong>Number of Days:</strong> {typeof consumption?.numDays === "number" ? consumption.numDays : "N/A"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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
          <p><strong>Bill Date:</strong> {formatDate(bill.billDate)}</p>
          <p><strong>Due Date:</strong> {formatDate(bill.dueDate)}</p>
          <p><strong>Created At:</strong> {formatDate(bill.createdAt, true)}</p>
          <p><strong>Status:</strong> <span className={
            bill.status === "PAID" ? "text-green-600" :
            bill.status === "Pending" ? "text-yellow-600" : "text-red-600"
          }>{bill.status}</span></p>
          <p className="text-xl font-bold mt-2">Total Amount: ₱{bill.totalAmount.toFixed(2)}</p>

          {lastPayment && (
            <p className="text-sm mt-2 text-gray-600">
              Last Payment: ₱{lastPayment.amountPaid.toFixed(2)} ({lastPayment.paymentMethod})
            </p>
          )}

          {bill.status !== "PAID" && (
            <div className="mt-6">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                onClick={() => setShowPayModal(true)}
              >
                Pay Now
              </button>
            </div>
          )}
        </div>

        {showPayModal && (
          <PayNowModal
            bill={bill}
            onClose={() => setShowPayModal(false)}
            onSubmit={(billId, amountPaid, method) => {
              onPay(billId, amountPaid, method, (payment) => {
                setLastPayment(payment);
                setShowPayModal(false);
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerBillModal;
