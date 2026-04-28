// 1. Import the models
const User = require('./User'); // Adjust the filename if it's 'user.js'
const Artist = require('./Artist'); // Adjust the filename if it's 'artist.js'

// 2. Define the Relationships
// A User has one Artist profile (One-to-One)
User.hasOne(Artist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Artist.belongsTo(User, { foreignKey: 'userId' });

// 3. Export them together
module.exports = {
  User,
  Artist
};