const User = require('./user');
const Artist = require('./artist');
const Track = require('./track');

// Define Relationships
User.hasOne(Artist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Artist.belongsTo(User, { foreignKey: 'userId' });

Artist.hasMany(Track, { foreignKey: 'artistId', onDelete: 'CASCADE' });
Track.belongsTo(Artist, { foreignKey: 'artistId' });

module.exports = { User, Artist, Track };