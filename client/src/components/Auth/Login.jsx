import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../../axiosConfig";
import { AuthContext } from "../AuthProvider/AuthProvider";
import styles from "./Auth.module.css";

function Login() {
  /*
  =========================
  NAVIGATION
  =========================
  */

  const navigate = useNavigate();

  /*
  =========================
  ACCESS GLOBAL USER STATE
  =========================
  */

  const { setUser } = useContext(AuthContext);

  /*
  =========================
  FORM STATES
  =========================
  */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
  =========================
  UI STATES
  =========================
  */

  const [error, setError] = useState("");

  /*
  =========================
  HANDLE LOGIN
  =========================
  */

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      /*
      LOGIN REQUEST
      */

      const { data } = await Instance.post("/users/login", {
        email,
        password,
      });

      /*
      SAVE TOKEN
      */

      localStorage.setItem("token", data.token);

      /*
      GET USER INFO
      */

      const userResponse = await Instance.get("/users/check", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      /*
      SAVE USER GLOBALLY
      */

      setUser({
        userid: userResponse.data.userid,
        username: userResponse.data.username,
        role: userResponse.data.role,
      });

      /*
      GO TO HOMEPAGE
      */

      navigate("/products");
    } catch (error) {
      setError(error?.response?.data?.message || "Invalid credentials");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to continue shopping.</p>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
