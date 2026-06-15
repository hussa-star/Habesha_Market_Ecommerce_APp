import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Success.module.css";

function Success() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* SUCCESS BOX */}
      <div className={styles.box}>
        {/* ICON */}
        <div className={styles.icon}>🎉</div>

        {/* TITLE */}
        <h1>Payment Successful!</h1>

        {/* MESSAGE */}
        <p>
          Your order has been placed successfully. Thank you for shopping with
          us.
        </p>

        {/* ACTION BUTTONS */}
        <div className={styles.buttons}>
          <button onClick={() => navigate("/orders")}>View Orders</button>

          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
