import { dbConnection } from "../Config/DbConfig.js";

async function findUserByEmail(email) {
  const [rows] = await dbConnection.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
  );
  return rows;
}

async function createUser(username, email, password, role) {
  return await dbConnection.query(
    `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
    [username, email, password, role],
  );
}

export { findUserByEmail, createUser };
