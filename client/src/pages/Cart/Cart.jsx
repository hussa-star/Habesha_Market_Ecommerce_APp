import React, { useEffect, useState } from "react";
import Instance from "../../axiosConfig";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

function Cart() {
  const navigate = useNavigate();

  /*
  ===============================
  STATES
  ===============================
  */

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
  ===============================
  FETCH CART ITEMS
  ===============================
  */

  async function fetchCart() {
    const token = localStorage.getItem("token");

    try {
      const { data } = await Instance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(data.cart || []);
    } catch (error) {
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }

  /*
  ===============================
  DELETE ITEM
  ===============================
  */

  async function removeItem(cartid) {
    const token = localStorage.getItem("token");

    try {
      await Instance.delete(`/cart/${cartid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  }

  /*
  ===============================
  UPDATE QUANTITY
  ===============================
  */

  async function updateQuantity(cartid, quantity) {
    const token = localStorage.getItem("token");

    try {
      await Instance.put(
        `/cart/${cartid}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  }

  /*
  ===============================
  CALCULATE TOTAL
  ===============================
  */

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.total), 0);

  /*
  ===============================
  PAGE LOAD
  ===============================
  */

  useEffect(() => {
    fetchCart();
  }, []);

  /*
  ===============================
  LOADING
  ===============================
  */

  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader size={60} color="#516cf0" />
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>My Shopping Cart</h1>

      {error && <p className={styles.error}>{error}</p>}

      {cart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => (
              <div key={item.cartid} className={styles.card}>
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.title}
                />

                <div className={styles.info}>
                  <h3>{item.title}</h3>

                  <p>ETB {item.price}</p>

                  <p>Total: ETB {item.total}</p>

                  {/* Quantity */}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.cartid, Number(e.target.value))
                    }
                  />

                  <button onClick={() => removeItem(item.cartid)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className={styles.checkout}>
            <h2>Total: ETB {totalPrice.toFixed(2)}</h2>

            <button onClick={() => navigate("/checkout")}>
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
