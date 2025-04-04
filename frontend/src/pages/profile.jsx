import React from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

const Profile = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Section */}
      <Sidebar />

      {/* Main Content Section */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        {/* Header Section */}
        <Header />
        
        {/* Profile Content */}
        <h1>Profile</h1>
        <p>Manage your profile information here.</p>
      </div>
    </div>
  );
};

export default Profile;
