const { Artist, Track } = require("../models");
const bcrypt = require("bcrypt");

// add the Artist top level exports for await
await Artist.sync();
await MusicArtist.sync(); 



// 1. Fixed registerArtist: added 'async' and placed exports correctly
exports.registerArtist = async (req, res) => {
  try {
    const { password, artistName, genre, bio } = req.body;
    
    // Hash the password with a salt round of 10
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the artist with the hashed password
    const artist = await Artist.create({
      artistName,
      genre,
      bio,
      password: hashedPassword // Ensure your model has a password field
    });

    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all artists
exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      include: { model: Track, as: "tracks" }
    });
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one artist
exports.getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: { model: Track, as: "tracks" }
    });

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE artist
exports.createArtist = async (req, res) => {
  try {
    const { artistName, genre, bio, password } = req.body;

    // If you want to hash the password during normal creation:
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const artist = await Artist.create({
      artistName,
      genre,
      bio,
      password: hashedPassword
    });

    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE artist
exports.updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    // If password is being updated, hash it first
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await artist.update(req.body);
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE artist
exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }
    await artist.destroy();
    res.json({ message: "Artist deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};