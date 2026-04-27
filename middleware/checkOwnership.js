const { Track } = require('../models');

const checkTrackOwnership = async (req, res, next) => {
  try {
    const track = await Track.findByPk(req.params.id);
    
    if (!track) return res.status(404).json({ error: "Track not found" });

    // Allow if the user is the owner OR an admin
    if (track.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: "You do not have permission to modify this track." });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkTrackOwnership;

// Example Ownership Logic
if (track.artistId !== req.user.id && req.user.role !== 'admin') {
  return res.status(403).json({ error: "You can only manage your own tracks." });
}