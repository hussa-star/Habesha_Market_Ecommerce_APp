import React, { useEffect, useState } from "react";
import Instance from "../../axiosConfig";
import { ClipLoader } from "react-spinners";
import styles from "./Orders.module.css";

function Orders() {
  /*
  =========================
  STATES
  =========================
  */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  =========================
  FETCH ORDERS
  =========================
  */
  async function fetchOrders() {
    const token = localStorage.getItem("token");

    try {
      const { data } = await Instance.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders || []);
    } catch (error) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  /*
  =========================
  LOADING
  =========================
  */
  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader size={60} color="#516cf0" />
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>My Orders</h1>

      {error && <p className={styles.error}>{error}</p>}

      {orders.length === 0 ? (
        <p className={styles.empty}>You have no orders yet.</p>
      ) : (
        <div className={styles.list}>
          {orders.map((order) => (
            <div key={order.orderid} className={styles.card}>
              <h3>Order #{order.orderid}</h3>

              <p>Total: ETB {order.total_price}</p>

              <p>Status: {order.status || "Processing"}</p>

              <small>Date: {new Date(order.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
