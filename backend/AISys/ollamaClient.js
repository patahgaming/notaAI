const { Ollama } = require('ollama');
require('dotenv').config;

const modelChatter = process.env.MODEL;

async function chatWithOllama(message) {
    const ollama = new Ollama();
    const response = await ollama.chat({
        model: modelChatter,
        messages: [{ role: 'user', content: message }]
    });
    printf('Response from Ollama:', response, 'Model:', modelChatter);
    if (response.error) {
        throw new Error(`Error from Ollama: ${response.error}`);
    }
    return [response.message.content, response.model];
}

module.exports = chatWithOllama;