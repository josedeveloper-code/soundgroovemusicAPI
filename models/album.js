const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Album = sequelize.define('Album', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coverUrl: {
    type: DataTypes.STRING
  },
  releaseDate: {
    type: DataTypes.DATE
  },
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Artists', key: 'id' }
  }
}, {
  timestamps: true
});

module.exports = Album;



const Album = require('./album');

Artist.hasMany(Album, { foreignKey: 'artistId', onDelete: 'CASCADE' });
Album.belongsTo(Artist, { foreignKey: 'artistId' });

Album.hasMany(Track, { foreignKey: 'albumId', onDelete: 'CASCADE' });
Track.belongsTo(Album, { foreignKey: 'albumId' });

module.exports = { user, Artist, Track, Album };
