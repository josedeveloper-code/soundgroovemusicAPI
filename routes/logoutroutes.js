const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.status(200).json({
    message: 'Logout successful. Remove the token from the client to complete logout.'
  });
});

module.exports = router;
