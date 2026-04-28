const jwt = require('jsonwebtoken');

const signToken = (id) => {
  // Now process.env will be available because it was loaded in server.js/app.js
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

module.exports = { signToken };