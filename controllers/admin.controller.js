const bcrypt = require('bcryptjs');
const { User, Artist, Track } = require('../models');

const validateUserPayload = (payload) => {
  const errors = [];
  if (!payload.username || typeof payload.username !== 'string') {
    errors.push('username is required and must be a string');
  }
  if (!payload.email || typeof payload.email !== 'string' || !payload.email.includes('@')) {
    errors.push('A valid email is required');
  }
  if (payload.password && typeof payload.password !== 'string') {
    errors.push('password must be a string');
  }
  if (payload.role && !['listener', 'artist', 'admin'].includes(payload.role)) {
    errors.push('role must be one of listener, artist, or admin');
  }
  return errors;
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'] });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'] });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const errors = validateUserPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    if (!req.body.password) {
      return res.status(400).json({ error: 'password is required' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'listener'
    });

    res.status(201).json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const errors = validateUserPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.update(req.body);
    res.status(200).json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
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

exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    await artist.destroy();
    res.status(200).json({ message: 'Artist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdminOverview = async (req, res) => {
  try {
    const userCount = await User.count();
    const artistCount = await Artist.count();
    const trackCount = await Track.count();
    res.status(200).json({ userCount, artistCount, trackCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
