
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import GenerateBill from './pages/generateBill';
import Login from './pages/login';
import Logout from './pages/logout';
import ManageUser from './pages/manageUser';
import Profile from './pages/profile';
import Reports from './pages/reports';
import Signup from './pages/signup';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const Dashboard = () => {
  return <h1>Welcome to the Dashboard</h1>; // Replace with your actual Dashboard component
};


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/generate-bill" element={<GenerateBill />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/manage-users" element={<ManageUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
};

export default App;
