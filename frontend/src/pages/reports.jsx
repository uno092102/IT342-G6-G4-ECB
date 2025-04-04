import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const Reports = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Section */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {/* Header Section */}
        <Header />
        
        {/* Reports Content */}
        <h1>Reports</h1>
        <p>View reports and analyze data here.</p>
      </div>
    </div>
  );
};

export default Reports;
