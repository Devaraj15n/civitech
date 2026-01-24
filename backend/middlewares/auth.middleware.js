// backend/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // 1️⃣ Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Token missing or malformed' });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(' ')[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Attach payload to req.user
    req.user = decoded;

    req.user = {
      id: decoded.user_id,          // <-- map user_id to id
      client_id: decoded.client_id, // <-- keep same
      user_type: decoded.user_type
    };

    // 5️⃣ Proceed to next middleware / route
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
