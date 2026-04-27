const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Public routes placeholder. Implement public track access here.' });
});

module.exports = router;
