import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Instance from "../../axiosConfig";
import styles from "./Auth.module.css";

function Register() {
  /*
  =========================
  NAVIGATION
  =========================
  */

  const navigate = useNavigate();

  /*
  =========================
  FORM STATES
  =========================
  */

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*
  =========================
  UI STATES
  =========================
  */

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
  =========================
  SUBMIT FORM
  =========================
  */

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    /*
    Frontend Validation
    */

    if (!username || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      /*
      Call Backend API
      */

      const { data } = await Instance.post("/users/register", {
        username,
        email,
        password,
      });

      /*
      Success Message
      */

      setSuccess(data.message);

      /*
      Clear Form
      */

      setUsername("");
      setEmail("");
      setPassword("");

      /*
      Redirect To Login
      */

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className={styles.subtitle}>
          Join Habesha Market and start shopping today.
        </p>

        {error && <p className={styles.error}>{error}</p>}

        {success && <p className={styles.success}>{success}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
