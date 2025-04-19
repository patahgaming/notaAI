// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authMiddleware = require('./loginSys/authMiddleware');
const pool = require('./config/mysql'); // Import MySQL connection pool
const connectMongo = require('./config/mongodb'); // Import MongoDB connection function

// Import route placeholders
const authRoutes = require('./loginSys/routes');
const chatRoutes = require('./chatSys/routes');
const { login } = require('./loginSys/controller');

const PORT = process.env.PORT || 3000;
// 🧠 INFO Database & Cek User Table
(async () => {
    try {
      const [rows] = await pool.query('SELECT DATABASE() AS db');
      console.log(`✅ Connected to MySQL database: ${rows[0].db}`);
  
      const [users] = await pool.query('SELECT id_user, email FROM users');
      console.log(`👥 Total user terdaftar: ${users.length}`);
      users.forEach(user => {
        console.log(`- ${user.id_user}: ${user.email}`);
      });
    } catch (err) {
      console.error('❌ Gagal konek ke database atau query error:', err.message);
    }
    connectMongo();
  })();
// Middleware
app.use(cors());
app.use(express.json());

// Basic Routes (sementara)
app.get('/', (req, res) => {
  res.send('NovaAI API is running... 😎');
});

// Route mounting (aktifin nanti kalau udah ada file-nya)
app.use('/api/auth', authRoutes);
app.use('/api/chat', authMiddleware, chatRoutes); // Use authMiddleware for chat routes


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
