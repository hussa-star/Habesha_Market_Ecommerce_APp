import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../AuthProvider/AuthProvider";

function ProtectedRoute({ children }) {
  // get auth data
  const { user, loading } = useContext(AuthContext);

  //   SHOW LOADEr

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <ClipLoader size={50} />
      </div>
    );
  }

  /*
  =========================
  NOT LOGGED IN
  =========================
  */

  if (!user) {
    return <Navigate to="/login" />;
  }

  /*
  =========================
  LOGGED IN
  =========================
  */

  return children;
}

export default ProtectedRoute;
