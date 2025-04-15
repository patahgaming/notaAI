// chatSys/controller.js
const Chat = require('./model');
const ollama = require('ollama');

async function handleChat(req, res) {
  const { user_id, message } = req.body;
  if (!message || !user_id) return res.status(400).json({ msg: 'Pesan dan user_id wajib diisi!' });

  try {
    const result = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: message }],
    });

    const response = result.message.content;

    // Simpan ke MongoDB
    const chat = new Chat({ user_id, message, response });
    await chat.save();

    res.json({ response, saved: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Gagal memproses chat.' });
  }
}

module.exports = { handleChat };
