const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const authorize = require('../middleware/Authorization');
const trackController = require('../controllers/track.controller');

router.get('/', trackController.getTracks);
router.get('/:id', trackController.getTrackById);
router.post('/', authenticateToken, authorize(['artist', 'admin']), trackController.createTrack);
router.put('/:id', authenticateToken, authorize(['artist', 'admin']), trackController.updateTrack);
router.delete('/:id', authenticateToken, authorize(['artist', 'admin']), trackController.deleteTrack);

module.exports = router;
