const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Artist = sequelize.define('Artist', {
  artistName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'stageName'
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

module.exports = Artist;