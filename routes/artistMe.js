const express = require('express');
const router = express.Router();
const { Artist, User } = require('../models');
const { authenticateToken } = require('../middleware/authentication');

// GET /users/artistme
router.get('/artistme', authenticateToken, async (req, res) => {
  try {
    // req.user.id comes from the decoded JWT token
    const artistProfile = await Artist.findOne({
      where: { userId: req.user.id },
      include: [{ model: User, attributes: ['username', 'email'] }]
    });

    if (!artistProfile) {
      return res.status(404).json({ message: "Artist profile not found for this user." });
    }

    res.status(200).json(artistProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;