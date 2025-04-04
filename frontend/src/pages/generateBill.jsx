import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const GenerateBill = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Section */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {/* Header Section */}
        <Header />
        
        {/* Content */}
        <h1>Generate Bill</h1>
        <p>Here you can generate bills for customers.</p>
      </div>
    </div>
  );
};

export default GenerateBill;
