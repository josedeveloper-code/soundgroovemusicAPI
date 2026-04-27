const { Artist, Track } = require("../models");

const validateArtistPayload = (payload) => {
  const errors = [];
  if (!payload.artistName || typeof payload.artistName !== 'string') {
    errors.push('artistName is required and must be a string');
  }
  if (!payload.genre || typeof payload.genre !== 'string') {
    errors.push('genre is required and must be a string');
  }
  return errors;
};

exports.createArtist = async (req, res) => {
  try {
    const errors = validateArtistPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    const existingArtist = await Artist.findOne({ where: { userId: req.user.id } });
    if (existingArtist) {
      return res.status(400).json({ error: 'Artist profile already exists for this user' });
    }

    const artist = await Artist.create({
      artistName: req.body.artistName,
      genre: req.body.genre,
      bio: req.body.bio || null,
      userId: req.user.id
    });

    res.status(201).json(artist);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'artistName already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      include: { model: Track, as: 'tracks' }
    });
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: { model: Track, as: 'tracks' }
    });

    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCurrentArtistProfile = async (req, res) => {
  try {
    const artist = await Artist.findOne({
      where: { userId: req.user.id },
      include: { model: Track, as: 'tracks' }
    });

    if (!artist) {
      return res.status(404).json({ error: 'Artist profile not found for this user' });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArtistTracks = async (req, res) => {
  try {
    const artist = await Artist.findOne({ where: { userId: req.user.id } });
    if (!artist) {
      return res.status(404).json({ error: 'Artist profile not found for this user' });
    }

    const tracks = await Track.findAll({ where: { artistId: artist.id } });
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArtistStats = async (req, res) => {
  try {
    const artist = await Artist.findOne({ where: { userId: req.user.id } });
    if (!artist) {
      return res.status(404).json({ error: 'Artist profile not found for this user' });
    }

    const trackCount = await Track.count({ where: { artistId: artist.id } });
    res.status(200).json({ artistId: artist.id, artistName: artist.artistName, trackCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    if (artist.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You can only update your own artist profile' });
    }

    const allowedUpdates = ['artistName', 'genre', 'bio'];
    const updates = Object.keys(req.body).filter((key) => allowedUpdates.includes(key));

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    await artist.update(req.body);
    res.status(200).json(artist);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'artistName already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    if (artist.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You can only delete your own artist profile' });
    }

    await artist.destroy();
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};