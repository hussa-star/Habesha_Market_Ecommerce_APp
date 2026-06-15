import React, { createContext, useState, useEffect } from "react";

import Instance from "../../axiosConfig";

/*
=================================
CREATE CONTEXT
=================================

This creates a global container
that any component can access.
*/
export const AuthContext = createContext();

function AuthProvider({ children }) {
  /*
  ================================
  USER STATE
  ================================

  Stores logged in user.
  */

  const [user, setUser] = useState(null);

  /*
  ================================
  LOADING STATE
  ================================

  While checking token.
  */

  const [loading, setLoading] = useState(true);

  /*
  ================================
  CHECK USER ON APP LOAD
  ================================
  */

  useEffect(() => {
    const token = localStorage.getItem("token");

    /*
    No token?
    User is not logged in.
    */

    if (!token) {
      setLoading(false);
      return;
    }

    async function checkUser() {
      try {
        const { data } = await Instance.get("/users/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        /*
        Save user globally.
        */

        setUser({
          userid: data.userid,
          username: data.username,
          role: data.role,
        });
      } catch (error) {
        console.log(error);

        localStorage.removeItem("token");

        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  /*
  ================================
  PROVIDER
  ================================
  */

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
