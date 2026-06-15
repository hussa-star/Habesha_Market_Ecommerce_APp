import { dbConnection } from "../Config/DbConfig.js";

async function checkItemInCart(userid, productid) {
  const [rows] = await dbConnection.query(
    `SELECT * FROM cart WHERE userid = ? AND productid = ?`,
    [userid, productid],
  );
  return rows;
}

async function updateCartQuantity(userid, productid, quantity) {
  return await dbConnection.query(
    `UPDATE cart SET quantity = quantity + ? WHERE userid = ? AND productid = ?`,
    [quantity, productid],
  );
}

async function insertIntoCart(userid, productid, quantity) {
  return await dbConnection.query(
    `INSERT INTO cart (userid, productid, quantity) VALUES (?, ?, ?)`,
    [userid, productid, quantity],
  );
}

async function queryCartItems(userid) {
  const [rows] = await dbConnection.query(
    `SELECT c.cartid, c.quantity, p.productid, p.title, p.price, p.image, (c.quantity * p.price) AS total FROM cart c JOIN products p ON c.productid = p.productid WHERE c.userid = ?`,
    [userid],
  );
  return rows;
}

async function findCartItemByIdAndUser(id, userid) {
  const [rows] = await dbConnection.query(
    `SELECT * FROM cart WHERE cartid = ? AND userid = ?`,
    [id, userid],
  );
  return rows;
}

async function updateCartItemById(id, quantity) {
  return await dbConnection.query(
    `UPDATE cart SET quantity = ? WHERE cartid = ?`,
    [quantity, id],
  );
}

async function deleteCartItemById(id) {
  return await dbConnection.query(`DELETE FROM cart WHERE cartid = ?`, [id]);
}

export {
  checkItemInCart,
  updateCartQuantity,
  insertIntoCart,
  queryCartItems,
  findCartItemByIdAndUser,
  updateCartItemById,
  deleteCartItemById,
};
