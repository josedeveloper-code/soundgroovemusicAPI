const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Track = sequelize.define('Track', {
  title: { type: DataTypes.STRING, allowNull: false },
  audioUrl: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER },
  genre: { type: DataTypes.STRING },
  artistId: {
    type: DataTypes.INTEGER,
    references: { model: 'Artists', key: 'id' }
  }
});

module.exports = Track;