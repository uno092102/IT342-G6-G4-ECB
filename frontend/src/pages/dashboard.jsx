import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="main-content">
        <Header />
        <div className="content">
          <h2>Welcome to the Dashboard</h2>
          <p>Here you can manage your electricity consumption billing system.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
