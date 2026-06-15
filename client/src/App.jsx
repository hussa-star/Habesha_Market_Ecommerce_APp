import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout/Layout.jsx";

// Auth
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";

// Pages
import Landing from "./pages/Landing/Landing.jsx";
import Products from "./pages/Products/Products.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Success from "./pages/Success/Success.jsx";
import Cancel from "./pages/Cancel/Cancel.jsx";

// Protection
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
// admin routes
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* PAYMENT */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

        {/* admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
