// This is my Admin Routes 

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserById);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

router.get('/artists', adminController.getArtists);
router.get('/artists/:id', adminController.getArtistById);
router.delete('/artists/:id', adminController.deleteArtist);

module.exports = router;

