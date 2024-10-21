// middlewares/authorizeOwner.js
const jwt = require('jsonwebtoken');

const authorizeOwner = (req, res, next) => {
  // Check for a token in cookies or Authorization header
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send('Forbidden: Invalid token');
    }
    const userEmail = decoded.email; 
    const ownerEmail = process.env.OWNER_EMAIL;

    if (userEmail === ownerEmail) {
      return next(); 
    } else {
      return res.status(403).send('Access denied: You are not the owner.');
    }
  });
};

module.exports = authorizeOwner;
