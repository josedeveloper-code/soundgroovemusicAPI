const { Track, Artist } = require('../models');
const { Op } = require('sequelize');

const getTracks = async (req, res) => {
  try {
    const { genre, search, limit = 20, offset = 0 } = req.query;
    const whereClause = {};

    if (genre) whereClause.genre = genre;
    if (search) whereClause.title = { [Op.like]: `%${search}%` };

    const tracks = await Track.findAndCountAll({
      where: whereClause,
      include: [{ model: Artist, as: 'artist' }],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      totalItems: tracks.count,
      totalPages: Math.ceil(tracks.count / limit),
      currentPage: Math.floor(offset / limit) + 1,
      data: tracks.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrackById = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id, {
      include: [{ model: Artist, as: 'artist' }]
    });

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTrack = async (req, res) => {
  try {
    const { title, audioUrl, duration, genre, artistId } = req.body;
    if (!title || !audioUrl || !artistId) {
      return res.status(400).json({ error: 'title, audioUrl and artistId are required' });
    }

    const artist = await Artist.findByPk(artistId);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const track = await Track.create({ title, audioUrl, duration, genre, artistId });
    res.status(201).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTrack = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    if (req.body.artistId && req.body.artistId !== track.artistId) {
      const artist = await Artist.findByPk(req.body.artistId);
      if (!artist) {
        return res.status(404).json({ error: 'New artistId does not exist' });
      }
    }

    if (req.user.role !== 'admin' && req.user.id !== track.artistId) {
      return res.status(403).json({ error: 'Forbidden: You can only update your own tracks' });
    }

    await track.update(req.body);
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    if (req.user.role !== 'admin' && req.user.id !== track.artistId) {
      return res.status(403).json({ error: 'Forbidden: You can only delete your own tracks' });
    }

    await track.destroy();
    res.status(200).json({ message: 'Track deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack
};