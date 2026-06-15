import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  /*
  ONLY ADMIN ALLOWED
  */

  if (user?.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default AdminRoute;
