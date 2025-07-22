// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // 1. Get token from header
  const token = req.header('x-auth-token');

  // 2. Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user payload to the request object
    next(); // Move to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};