const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // 1. Multi-source token detection (Headers or Cookies)
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;

    if (!token) {
      console.warn('Auth Warning: No token provided');
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // 2. Verified verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // 3. Attach user and move on
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    return res.status(401).json({ 
      error: 'Invalid or expired token',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  }
};

module.exports = authMiddleware;
