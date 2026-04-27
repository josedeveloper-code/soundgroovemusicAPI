const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust path to your db connection

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'listener', // Default role for new signups
    validate: {
      isIn: [['listener', 'artist', 'admin']] // The 3 roles in Sound Groove
    }
  }
});

module.exports = User;