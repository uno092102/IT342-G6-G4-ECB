import React from "react";
import { FaMoneyBillWave, FaFileInvoice } from "react-icons/fa";

const CustomerDashboard = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">Welcome to Your Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaMoneyBillWave className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Outstanding Balance</p>
            <p className="text-lg font-bold">Php. 3,200</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
          <FaFileInvoice className="text-indigo-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Unpaid Bills</p>
            <p className="text-lg font-bold">2</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
