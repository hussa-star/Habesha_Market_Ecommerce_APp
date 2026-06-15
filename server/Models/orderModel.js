import { dbConnection } from "../Config/DbConfig.js";

async function getCartItemsWithPrice(userid) {
  const [rows] = await dbConnection.query(
    `SELECT c.productid, c.quantity, p.price FROM cart c JOIN products p ON c.productid = p.productid WHERE c.userid = ?`,
    [userid],
  );
  return rows;
}

async function insertOrder(userid, total) {
  const [result] = await dbConnection.query(
    `INSERT INTO orders (userid, total_price) VALUES (?, ?)`,
    [userid, total],
  );
  return result.insertId;
}

async function insertOrderItem(orderid, productid, quantity, price) {
  return await dbConnection.query(
    `INSERT INTO order_items (orderid, productid, quantity, price) VALUES (?, ?, ?, ?)`,
    [orderid, productid, quantity, price],
  );
}

async function decrementProductStock(productid, quantity) {
  return await dbConnection.query(
    `UPDATE products SET stock = stock - ? WHERE productid = ?`,
    [quantity, productid],
  );
}

async function clearUserCart(userid) {
  return await dbConnection.query(`DELETE FROM cart WHERE userid = ?`, [
    userid,
  ]);
}

async function findOrdersByUser(userid) {
  const [rows] = await dbConnection.query(
    `SELECT * FROM orders WHERE userid = ? ORDER BY created_at DESC`,
    [userid],
  );
  return rows;
}

async function findOrderByIdAndUser(id, userid) {
  const [rows] = await dbConnection.query(
    `SELECT * FROM orders WHERE orderid = ? AND userid = ?`,
    [id, userid],
  );
  return rows;
}

async function findOrderItemsByOrderId(id) {
  const [rows] = await dbConnection.query(
    `SELECT oi.quantity, oi.price, p.title, p.image FROM order_items oi JOIN products p ON oi.productid = p.productid WHERE oi.orderid = ?`,
    [id],
  );
  return rows;
}

export {
  getCartItemsWithPrice,
  insertOrder,
  insertOrderItem,
  decrementProductStock,
  clearUserCart,
  findOrdersByUser,
  findOrderByIdAndUser,
  findOrderItemsByOrderId,
};
