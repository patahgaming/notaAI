const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('./model');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
    console.log('📦 Incoming req.body:', req.body);
  const { email, password, nama } = req.body;
  if (!email || !password) return res.status(400).json({ msg: 'Email dan password wajib diisi' });

  const existing = await getUserByEmail(email);
  if (existing) return res.status(409).json({ msg: 'Email sudah terdaftar' });

  const hash = await bcrypt.hash(password, 10);
  await createUser(email, hash, nama);
  res.json({ msg: 'Registrasi sukses!' });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.status(401).json({ msg: 'Email tidak ditemukan' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: 'Password salah' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
}

module.exports = {
  register,
  login,
};
