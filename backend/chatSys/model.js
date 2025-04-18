// chatSys/model.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,},
  response: String,
  model: String,
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Chat', chatSchema);
