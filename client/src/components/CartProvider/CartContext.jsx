import React, { createContext, useState, useEffect } from "react";
import Instance from "../../axiosConfig";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  /*
  =====================================
  FETCH CART COUNT
  =====================================
  */
  async function fetchCartCount() {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const { data } = await Instance.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartCount(data.cart?.length || 0);
    } catch (error) {
      console.log(error);
    }
  }

  /*
  =====================================
  LOAD ON START
  =====================================
  */
  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
