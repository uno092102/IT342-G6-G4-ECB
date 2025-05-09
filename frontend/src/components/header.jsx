import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import profilePic from "../images/profile-pic.png";

const Header = ({ pageTitle, breadcrumbs }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Left: Breadcrumb + Title */}
      <div>
        <p className="text-sm text-gray-400">
          Pages / <span className="text-gray-600 font-medium">{breadcrumbs}</span>
        </p>
        <h1 className="text-2xl font-bold text-indigo-700 mt-1">{pageTitle}</h1>
        <p className="text-sm text-green-500 font-semibold mt-1">Cebu Branch</p>
      </div>

      {/* Right: Search + Notifications + Avatar */}
      <div className="flex items-center gap-4 mt-4 md:mt-0 relative">
        {/* Search Input */}
        <div className="relative w-64">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Notification Bell (for CUSTOMER only) */}
        {role === "CUSTOMER" && (
          <div className="relative">
            <IoIosNotificationsOutline
              size={24}
              className="cursor-pointer text-gray-600 hover:text-indigo-600"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                <div className="px-4 py-2 border-b text-sm font-semibold text-indigo-600">
                  Notifications
                </div>
                <ul className="max-h-48 overflow-y-auto text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100">🔔 Bill #124 has been generated.</li>
                  <li className="px-4 py-2 hover:bg-gray-100">💸 Payment for Bill #121 received.</li>
                  <li className="px-4 py-2 hover:bg-gray-100">📅 Consumption for April recorded.</li>
                  {/* TODO: Replace with real API data later */}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Avatar */}
        <div className="w-10 h-10 bg-indigo-200 rounded-full border-2 border-indigo-500 shadow-sm overflow-hidden">
          <img
            src={profilePic}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
