const express = require("express");
const router = express.Router();

const trackController = require("../controllers/track.controller");
const auth = require("../middleware/authentication");
const role = require("../middleware/Authorization");

// CREATE track (admin only)
router.post("/", auth, role("admin"), trackController.createTrack);

// GET all tracks
router.get("/", trackController.getTracks);

// GET one track
router.get("/:id", trackController.getTrackById);

// UPDATE track (admin only)
router.put("/:id", auth, role("admin"), trackController.updateTrack);

// DELETE track (admin only)
router.delete("/:id", auth, role("admin"), trackController.deleteTrack);

module.exports = router;
