const express = require('express');
const router = express.Router();
const { Track, Artist } = require('../models');

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Sound Groove public API.' });
});

router.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll({ include: Artist });
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

