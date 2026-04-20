const express = require("express");
const router = express.Router();

const artistController = require("../controllers/artist.controller");
const auth = require("../middleware/authentication");
const role = require("../middleware/Authorization");

// CREATE artist (admin only)
router.post("/", auth, role("admin"), artistController.createArtist);

// GET all artists
router.get("/", artistController.getArtists);

// GET one artist
router.get("/:id", artistController.getArtistById);

// UPDATE artist (admin only)
router.put("/:id", auth, role("admin"), artistController.updateArtist);

// DELETE artist (admin only)
router.delete("/:id", auth, role("admin"), artistController.deleteArtist);

module.exports = router;

