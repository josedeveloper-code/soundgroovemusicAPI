const express = require('express');
const router = express.Router();

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'You are not logged in' });
  }

  try {
    // Verify variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Now you can use req.user.id in your soccer or music API
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Protected endpoint accessed successfully.',
    user: req.user
  });
});

module.exports = router;

