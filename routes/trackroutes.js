// This is the Route CRUD API

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const authorize = require('../middleware/Authorization');
const trackController = require('../controllers/track.controller');

// Keep the Route Organized from the Express CRUD API 

router.get('/', trackController.getTracks);
router.get('/:id', trackController.getTrackById);
router.post('/', authenticateToken, authorize(['artist', 'admin']), trackController.createTrack);
router.put('/:id', authenticateToken, authorize(['artist', 'admin']), trackController.updateTrack);
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
