const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { authenticateToken } = require('../middleware/authentication');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
