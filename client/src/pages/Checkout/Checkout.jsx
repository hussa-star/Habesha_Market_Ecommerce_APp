import React, { useState } from "react";
import Instance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./Checkout.module.css";

function Checkout() {
  /*
  =========================
  NAVIGATION
  =========================
  */
  const navigate = useNavigate();

  /*
  =========================
  STATES
  =========================
  */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // payment method state
  const [method, setMethod] = useState("stripe");

  /*
  =========================
  HANDLE CHECKOUT
  =========================
  */
  async function handleCheckout() {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      /*
      STEP 1: CREATE ORDER
      */
      const orderRes = await Instance.post(
        "/orders",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const orderId = orderRes.data.orderid;

      /*
      STEP 2: STRIPE PAYMENT
      */
      if (method === "stripe") {
        const paymentRes = await Instance.post(
          "/payments",
          { orderid: orderId },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        window.location.href = paymentRes.data.url;
      }

      /*
      STEP 3: TELEBIRR (FAKE FLOW FOR NOW)
      */
      if (method === "telebirr") {
        navigate("/success?method=telebirr");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* TITLE */}
        <h1>Secure Checkout</h1>
        <p>Choose a payment method to continue</p>

        {/* ERROR */}
        {error && <p className={styles.error}>{error}</p>}

        {/* PAYMENT OPTIONS */}
        <div className={styles.methods}>
          {/* STRIPE CARD */}
          <div
            className={`${styles.methodCard} ${
              method === "stripe" ? styles.active : ""
            }`}
            onClick={() => setMethod("stripe")}
          >
            <span>💳</span>
            <div>
              <h3>Card Payment</h3>
              <small>Visa / MasterCard (Stripe Secure)</small>
            </div>
          </div>

          {/* TELEBIRR CARD */}
          <div
            className={`${styles.methodCard} ${
              method === "telebirr" ? styles.active : ""
            }`}
            onClick={() => setMethod("telebirr")}
          >
            <span>📱</span>
            <div>
              <h3>Telebirr</h3>
              <small>Ethiopian Mobile Payment</small>
            </div>
          </div>
        </div>

        {/* PAY BUTTON */}
        <button onClick={handleCheckout} disabled={loading}>
          {loading ? (
            <ClipLoader size={18} color="#fff" />
          ) : (
            `Pay with ${method === "stripe" ? "Card" : "Telebirr"}`
          )}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
