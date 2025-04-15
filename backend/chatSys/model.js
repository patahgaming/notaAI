// chatSys/model.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user_id: String,        // atau ObjectId kalau mau lebih proper
  message: String,
  response: String,
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Chat', chatSchema);
