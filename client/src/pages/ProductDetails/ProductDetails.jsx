import React, { useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import Instance from "../../axiosConfig";
import { ClipLoader } from "react-spinners";
import styles from "./ProductDetails.module.css";
import { CartContext } from "../../components/CartProvider/CartContext";


function ProductDetails() {
  /*
  =====================================
  GET PRODUCT ID FROM URL
  =====================================

  Example URL:

  /product/5

  productid = 5
  */
  const { id } = useParams();

  /*
  =====================================
  STATES
  =====================================
  */
  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // For updating cart count in header after adding to cart
  const { fetchCartCount } = useContext(CartContext);

  /*
  =====================================
  FETCH SINGLE PRODUCT
  =====================================
  */
  async function fetchProduct() {
    try {
      const { data } = await Instance.get(`/products/${id}`);

      setProduct(data.product);

      setError("");
    } catch (error) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  /*
  =====================================
  ADD TO CART
  =====================================
  */
  async function handleAddToCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");
      return;
    }

    try {
      const { data } = await Instance.post(
        "/cart",
        {
          productid: product.productid,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(data.message);

      setError("");
      fetchCartCount(); // Update cart count in header
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to add to cart");
    }
  }

  /*
  =====================================
  PAGE LOAD
  =====================================
  */
  useEffect(() => {
    fetchProduct();
  }, []);

  /*
  =====================================
  LOADING
  =====================================
  */
  if (loading) {
    return (
      <div className={styles.loader}>
        <ClipLoader size={60} color="#516cf0" />

        <p>Loading product...</p>
      </div>
    );
  }

  /*
  =====================================
  MAIN UI
  =====================================
  */
  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}

      {success && <p className={styles.success}>{success}</p>}

      <div className={styles.productBox}>
        <img
          src={product.image || "https://via.placeholder.com/500"}
          alt={product.title}
          className={styles.image}
        />

        <div className={styles.info}>
          <h1>{product.title}</h1>

          <p>{product.description}</p>

          <h2>ETB {product.price}</h2>

          <small>Stock: {product.stock}</small>

          <button onClick={handleAddToCart} className={styles.button}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
