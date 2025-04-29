import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "JSESSIONID=; Max-Age=0; path=/;";
    navigate('/login');
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/bills", label: "My Bills" },
    { to: "/consumption", label: "Consumption" },
    { to: "/payments", label: "Payments" },
    { to: "/feedback", label: "Feedback" },
    { to: "/profile", label: "Profile" },
  ];

  const navLinksAdmin = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/manage-users", label: "Manage Users" },
    { to: "/generate-bill", label: "Generate Bill" },
    { to: "/bills", label: "Manage Bills" },
    { to: "/payments", label: "Manage Payments" },
    { to: "/consumption", label: "Consumption Records" },
    { to: "/tariffs", label: "Tariff Rates" },
    { to: "/charges", label: "Fixed Charges" },
    { to: "/feedbacks", label: "Feedback" },
    { to: "/reports", label: "Reports" },
  ]  

  const linkClass = "block px-4 py-2 rounded hover:bg-indigo-100";
  const activeClass = "block px-4 py-2 rounded bg-indigo-600 text-white font-semibold";

  return (
    <aside className="w-64 bg-white p-6 border-r">
      <div className="text-2xl font-bold text-indigo-600 mb-10">
        💡 Electricity <br /> Consumption <br /> Billing
      </div>
      <nav className="space-y-4 text-gray-700">
        {role === "ADMIN" ? (
          navLinksAdmin.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? activeClass : linkClass)}
            >
              {item.label}
            </NavLink>
          ))
        ) : (
          navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? activeClass : linkClass)}
            >
              {item.label}
            </NavLink>
          ))
        )}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-10 w-full bg-indigo-600 text-white py-2 rounded-full flex items-center justify-center gap-2">
        <IoIosLogOut size={18} /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
