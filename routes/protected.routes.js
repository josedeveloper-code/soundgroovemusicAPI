const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Protected route placeholder. Implement authenticated protected endpoints here.' });
});

module.exports = router;
