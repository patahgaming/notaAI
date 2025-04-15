// chatSys/routes.js
const express = require('express');
const router = express.Router();
const { handleChat } = require('./controller');

router.post('/ask', handleChat); // /api/chat/ask

module.exports = router;
