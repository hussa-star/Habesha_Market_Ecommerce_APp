import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cancel.module.css";

function Cancel() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* CENTER BOX */}
      <div className={styles.box}>
        {/* ICON */}
        <div className={styles.icon}>❌</div>

        {/* TITLE */}
        <h1>Payment Cancelled</h1>

        {/* DESCRIPTION */}
        <p>
          Your payment was not completed. You can retry checkout or continue
          shopping.
        </p>

        {/* ACTION BUTTONS */}
        <div className={styles.buttons}>
          <button onClick={() => navigate("/checkout")}>Try Again</button>

          <button onClick={() => navigate("/cart")}>Back to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
