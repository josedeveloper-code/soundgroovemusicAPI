// Secure the password using bcrypt  //
const { Artist, Track } = require("../models"); 


const bcrypt = require("bcrypt");
const hashedPassword = await bcrypt.hash(password, 10);
const hashPassword = await bcrypt.hash(password, 30); ;

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
    const { artistName, genre, bio } = req.body;

    const artist = await Artist.create({
      artistName,
      genre,
      bio
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

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


