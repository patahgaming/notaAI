// mongo.js
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected!');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
  }
}

module.exports = connectMongo;
