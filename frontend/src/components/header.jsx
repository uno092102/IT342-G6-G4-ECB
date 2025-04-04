import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="header">
      {/* Breadcrumbs Section */}
      <div>
        <p className="breadcrumbs">Pages / Dashboard</p>
        <h1 className="dashboard-title">Main Dashboard</h1>
        <p className="branch-name">Cebu Branch</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search" />
      </div>

      {/* Profile Picture */}
      <div className="user-avatar">
        <img src="https://via.placeholder.com/40" alt="User Avatar" />
      </div>
    </div>
  );
};

export default Header;
