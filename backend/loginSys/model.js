const db = require('../config/mysql');

async function createUser(email, passwordHash, nama) {
  // Check if the email already exists
  const [rows] = await db.query(
    'INSERT INTO users (nama, email, password, created_at) VALUES (?, ?, ?, NOW())',
    [nama, email, passwordHash]
  );
  return rows;
}

async function getUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
}

module.exports = {
  createUser,
  getUserByEmail,
};
