import React, { useState, useEffect } from "react";
import Instance from "../../axiosConfig"; // Adjust path if needed
import styles from "./AdminDashboard.module.css";
import { FaTrash, FaPlus } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      // Your backend returns { products: [...] }
      const { data } = await Instance.get("/products");
      setProducts(data.products || []); // Access the 'products' array
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  // ADD PRODUCT
  async function handleAdd(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await Instance.post("/products", newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      setNewProduct({ title: "", price: "", image: "", description: "" });
    } catch (err) {
      alert("Error adding product");
    }
  }

  // REMOVE PRODUCT
  async function handleRemove(id) {
    const token = localStorage.getItem("token");
    try {
      await Instance.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      alert("Error removing product");
    }
  }

  if (loading) {
    return (
      <div className={styles.center}>
        <ClipLoader color="#ff6b6b" size={50} />
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Manage Habesha Market</h1>

      <form className={styles.addForm} onSubmit={handleAdd}>
        <input
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          required
        />
        <input
          placeholder="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />
        <input
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          required
        />
        <button type="submit">
          <FaPlus /> Add Product
        </button>
      </form>

      <div className={styles.productList}>
        {products.map((p) => (
          <div key={p.productid} className={styles.adminCard}>
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <span>
              {p.title} - {p.price} ETB
            </span>
            <button
              className={styles.removeBtn}
              onClick={() => handleRemove(p.productid)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
