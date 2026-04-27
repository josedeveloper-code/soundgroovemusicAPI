const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const authorize = require('../middleware/Authorization');
const artistController = require('../controllers/artist.controller');

router.get('/me', authenticateToken, authorize(['artist']), artistController.getCurrentArtistProfile);
router.get('/', authenticateToken, authorize(['artist']), artistController.getArtists);
router.post('/', authenticateToken, authorize(['artist']), artistController.createArtist);
router.put('/:id', authenticateToken, authorize(['artist', 'admin']), artistController.updateArtist);
router.delete('/:id', authenticateToken, authorize(['artist', 'admin']), artistController.deleteArtist);

module.exports = router;
