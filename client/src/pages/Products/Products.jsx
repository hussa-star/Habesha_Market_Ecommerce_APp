import React, { useEffect, useState } from "react";
import Instance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./Products.module.css";

function Products() {
  const navigate = useNavigate();

  // Store products from backend
  const [products, setProducts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  /*
  =====================================
  FETCH PRODUCTS
  =====================================
  */
  async function fetchProducts() {
    try {
      const { data } = await Instance.get("/products");

      setProducts(data.products || []);

      setError("");
    } catch (error) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  /*
  =====================================
  RUN ON PAGE LOAD
  =====================================
  */
  useEffect(() => {
    fetchProducts();
  }, []);

  /*
  =====================================
  LOADING UI
  =====================================
  */
  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ClipLoader size={60} color="#7c3aed" />
        <p>Loading products...</p>
      </div>
    );
  }

  /*
  =====================================
  ERROR UI
  =====================================
  */
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  /*
  =====================================
  MAIN UI
  =====================================
  */
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shop Products</h1>

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.productid} className={styles.card}>
            {/* Product Image */}
            <div className={styles.imageWrapper}>
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.title}
                className={styles.image}
              />
            </div>

            {/* Product Title */}
            <h3 className={styles.productTitle}>{product.title}</h3>

            {/* Description */}
            <p className={styles.description}>{product.description}</p>

            {/* Price */}
            <h4 className={styles.price}>ETB {product.price}</h4>

            {/* Stock */}
            <small className={styles.stock}>Stock: {product.stock}</small>

            {/* View Details */}
            <button
              className={styles.button}
              onClick={() => navigate(`/product/${product.productid}`)}
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
