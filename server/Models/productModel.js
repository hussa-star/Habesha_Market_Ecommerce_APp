import { dbConnection } from "../Config/DbConfig.js";

async function findProductByTitle(title) {
  const [rows] = await dbConnection.query(
    "SELECT * FROM products WHERE title = ?",
    [title],
  );
  return rows;
}

async function findProductById(id) {
  const [rows] = await dbConnection.query(
    "SELECT * FROM products WHERE productid = ?",
    [id],
  );
  return rows;
}

async function insertProduct(title, description, price, image, stock) {
  return await dbConnection.query(
    `INSERT INTO products (title, description, price, image, stock) VALUES (?, ?, ?, ?, ?)`,
    [title, description, price, image, stock],
  );
}

async function queryAllProducts() {
  const [rows] = await dbConnection.query(
    "SELECT * FROM products ORDER BY productid DESC",
  );
  return rows;
}

async function updateProductDetails(id, title, price, description, stock) {
  return await dbConnection.query(
    `UPDATE products SET title = ?, price = ?, description = ?, stock = ? WHERE productid = ?`,
    [title, price, description, stock, id],
  );
}

async function deleteProductById(id) {
  return await dbConnection.query("DELETE FROM products WHERE productid = ?", [
    id,
  ]);
}

export {
  findProductByTitle,
  findProductById,
  insertProduct,
  queryAllProducts,
  updateProductDetails,
  deleteProductById,
};
