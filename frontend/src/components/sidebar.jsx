import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { FaHome, FaFileInvoice, FaUsers, FaFileAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './sidebar.css';
import logo from '../images/ECB logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo and Title Section */}
      <div className="logo-section">
        <img src={logo} alt="ECB Logo" className="logo-image" />
        <div className="logo-text">
          <span>Electricity</span>
          <span>Consumption</span>
          <span>Bill</span>
        </div>
      </div>

      {/* Navigation using Link */}
      <nav>
        <Link to="/dashboard"><FaHome /> Dashboard</Link>
        <Link to="/reports"><FaFileInvoice /> Reports</Link>
        <Link to="/manage-users"><FaUsers /> Manage Users</Link>
        <Link to="/generate-bill"><FaFileAlt /> Generate Bill</Link>
        <Link to="/profile"><FaUserCircle /> Profile</Link>
        <Link to="/logout"><FaSignOutAlt /> Logout</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
