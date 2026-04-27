const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Profile route placeholder. Implement user profile handling here.' });
});

module.exports = router;
