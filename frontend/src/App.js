import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OAuthSuccess from "./pages/OAuthSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";
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
import CustomerProfile from "./pages/CustomerProfile"; 
import AdminReports from "./pages/AdminReports";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/oauth2-success" element={<OAuthSuccess />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Layout pageTitle="Admin Dashboard" breadcrumbs="Admin / Dashboard">
                <AdminDashboard />
              </Layout>
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            user && user.role === "CUSTOMER" ? (
              <Layout pageTitle="Dashboard" breadcrumbs="Dashboard">
                <CustomerDashboard />
              </Layout>
            ) : user && user.role === "ADMIN" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/bills"
          element={
            user ? (
              <Layout pageTitle="Bills" breadcrumbs="Bills">
                {user.role === "ADMIN" ? <AdminBills /> : <CustomerBills />}
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/payments"
          element={
            user ? (
              <Layout pageTitle="Payments" breadcrumbs="Payments">
                {user.role === "ADMIN" ? <AdminPayments /> : <CustomerPayments />}
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/consumption"
          element={
            user ? (
              <Layout pageTitle="Consumption" breadcrumbs="Consumption">
                {user.role === "ADMIN" ? <AdminConsumption /> : <CustomerConsumption />}
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/manage-users"
          element={
            user && user.role === "ADMIN" ? (
              <Layout pageTitle="Manage Users" breadcrumbs="Admin / Manage Users">
                <AdminManageUsers />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/feedback"
          element={
            user ? (
              <Layout pageTitle="Feedback" breadcrumbs="Feedback">
                {user.role === "CUSTOMER" ? <CustomerFeedback /> : <Navigate to="/feedbacks" />}
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/feedbacks"
          element={
            user && user.role === "ADMIN" ? (
              <Layout pageTitle="Feedback" breadcrumbs="Admin / Feedback">
                <AdminFeedbacks />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/generate-bill"
          element={
            user && user.role === "ADMIN" ? (
              <Layout pageTitle="Add Consumption" breadcrumbs="Admin / Add Consumption">
                <AddConsumption />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/tariffs"
          element={
            user && user.role === "ADMIN" ? (
              <Layout pageTitle="Tariff Rates" breadcrumbs="Admin / Tariffs">
                <AdminTariffs />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            user && user.role === "CUSTOMER" ? (
              <Layout pageTitle="My Profile" breadcrumbs="Profile">
                <CustomerProfile />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      <Route
        path="/reports"
        element={
          user && user.role === "ADMIN" ? (
            <Layout pageTitle="Activity Reports" breadcrumbs="Admin / Reports">
              <AdminReports />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />


      </Routes>
    </Router>
  );
}

export default App;
