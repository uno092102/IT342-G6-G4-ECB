import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const ManageUser = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Section */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {/* Header Section */}
        <Header />
        
        {/* Manage Users Content */}
        <h1>Manage Users</h1>
        <p>Here you can manage user information.</p>
      </div>
    </div>
  );
};

export default ManageUser;
