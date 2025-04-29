import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OAuthSuccess from "./pages/OAuthSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminBills from "./pages/AdminBills";
import CustomerBills from "./pages/CustomerBills";
import AdminPayments from "./pages/AdminPayments";
import CustomerPayments from "./pages/CustomerPayments";
import CustomerConsumption from "./pages/CustomerConsumption";
import AdminConsumption from "./pages/AdminConsumption";
import AdminManageUsers from "./pages/AdminManageUsers";
import CustomerFeedback from "./pages/CustomerFeedback";
import AdminFeedbacks from "./pages/AdminFeedbacks";
import AddConsumption from "./pages/AdminGenerateBill";
import AdminTariffs from "./pages/AdminTariffs";
import AdminCharges from "./pages/AdminCharges";
import CustomerProfile from "./pages/CustomerProfile";
import AdminReports from "./pages/AdminReports";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Router>
      <Routes>
        <Route path="/oauth2-success" element={<OAuthSuccess />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <Layout pageTitle="Admin Dashboard" breadcrumbs="Admin / Dashboard">
              <AdminDashboard />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <Layout pageTitle="Dashboard" breadcrumbs="Dashboard">
              <CustomerDashboard />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/bills" element={
          <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER"]}>
            <Layout pageTitle="Bills" breadcrumbs="Bills">
              {user?.role === "ADMIN" ? <AdminBills /> : <CustomerBills />}
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/payments" element={
          <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER"]}>
            <Layout pageTitle="Payments" breadcrumbs="Payments">
              {user?.role === "ADMIN" ? <AdminPayments /> : <CustomerPayments />}
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/consumption" element={
          <ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER"]}>
            <Layout pageTitle="Consumption" breadcrumbs="Consumption">
              {user?.role === "ADMIN" ? <AdminConsumption /> : <CustomerConsumption />}
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/manage-users" element={
          <AdminRoute>
            <Layout pageTitle="Manage Users" breadcrumbs="Admin / Manage Users">
              <AdminManageUsers />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/feedback" element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <Layout pageTitle="Feedback" breadcrumbs="Feedback">
              <CustomerFeedback />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/feedbacks" element={
          <AdminRoute>
            <Layout pageTitle="Feedback" breadcrumbs="Admin / Feedback">
              <AdminFeedbacks />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/generate-bill" element={
          <AdminRoute>
            <Layout pageTitle="Add Consumption" breadcrumbs="Admin / Add Consumption">
              <AddConsumption />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/tariffs" element={
          <AdminRoute>
            <Layout pageTitle="Tariff Rates" breadcrumbs="Admin / Tariffs">
              <AdminTariffs />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/charges" element={
          <AdminRoute>
            <Layout pageTitle="Fixed Charges" breadcrumbs="Admin / Charges">
              <AdminCharges />
            </Layout>
          </AdminRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <Layout pageTitle="My Profile" breadcrumbs="Profile">
              <CustomerProfile />
            </Layout>
          </ProtectedRoute>
        } />

        <Route path="/reports" element={
          <AdminRoute>
            <Layout pageTitle="Activity Reports" breadcrumbs="Admin / Reports">
              <AdminReports />
            </Layout>
          </AdminRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;