const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const authorize = require('../middleware/Authorization');
const artistController = require('../controllers/artist.controller');

router.get('/tracks', authenticateToken, authorize(['artist']), artistController.getArtistTracks);
router.get('/stats', authenticateToken, authorize(['artist']), artistController.getArtistStats);

module.exports = router;

