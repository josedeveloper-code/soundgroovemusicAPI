const { Track, Artist } = require("../models");

// CREATE a new track
exports.createTrack = async (req, res) => {
  try {
    const { title, duration, genre, releaseDate, artistId } = req.body;

    // Check if artist exists
    const artist = await Artist.findByPk(artistId);
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    const track = await Track.create({
      title,
      duration,
      genre,
      releaseDate,
      artistId
    });

    res.status(201).json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all tracks
exports.getTracks = async (req, res) => {
  try {
    const tracks = await Track.findAll({
      include: { model: Artist, as: "artist" }
    });

    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET one track by ID
exports.getTrackById = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id, {
      include: { model: Artist, as: "artist" }
    });

    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }

    res.json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//// UPDATE a track
exports.updateTrack = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);

    if (!track) {
      return res.status(404).json({ error: "Track not found" });
    }

    // NEW: If they are trying to update the artist, make sure the new artist exists
    if (req.body.artistId) {
      const artist = await Artist.findByPk(req.body.artistId);
      if (!artist) {
        return res.status(404).json({ error: "New Artist ID not found" });
      }
    }

    await track.update(req.body);

    res.json(track);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};