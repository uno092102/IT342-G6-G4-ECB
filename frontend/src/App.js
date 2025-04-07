import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from './pages/signup'
const Dashboard = () => {
  return <h1>Welcome to the Dashboard</h1>; // Replace with your actual Dashboard component
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
