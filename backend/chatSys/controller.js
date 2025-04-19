const Chat = require('./model');
const { Ollama } = require('ollama');
const generateResponse = require('../AISys/ollamaClient');
require('dotenv').config;
async function handleChat(req, res) {
  const { user_id, message } = req.body;
  if (!message || !user_id) return res.status(400).json({ msg: 'Pesan dan user_id wajib diisi!' });

  try {
    // Tunggu hasil dari generateResponse
    const [fullResponse, model] = await generateResponse(message);
  
    // Simpan ke MongoDB
    const chat = new Chat({ user_id, message, response: fullResponse, model: model });
    await chat.save();
  
    res.json({ response: fullResponse, saved: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal memproses chat.' });
  }
}

module.exports = { handleChat };