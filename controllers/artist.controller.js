// Running the Artist file to work properly with the database and models.
// Building the Artist controller with all the necessary CRUD operations and password hashing for security.
// This how the const variables are being imported and used in the Artist controller to handle the logic for creating, reading, updating, and deleting artists in the Sound Groove API.

// controllers/artist.controller.js
const { Artist } = require("../API Models");

exports.createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    await artist.update(req.body);
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    await artist.destroy();
    res.json({ message: "Artist deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};







const { Artist, Track } = require("../API Models");
const bcrypt = require("bcrypt");

// my Database synchronization (e.g., Artist.sync()) has been removed from here. 
// Move those sync calls to your main server.js or app.js file to ensure they run once when the application starts, rather than every time the controller is used.


// 1. registerArtist
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