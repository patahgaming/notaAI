const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return; // Stop execution here
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request
    next(); // Continue to the next middleware/route
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return; // Stop execution here
  }
}

module.exports = authMiddleware;