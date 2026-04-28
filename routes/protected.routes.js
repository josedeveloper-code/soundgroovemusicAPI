const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Protected endpoint accessed successfully.',
    user: req.user
  });
});

module.exports = router;

