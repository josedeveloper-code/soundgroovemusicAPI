module.exports = {
  albumId: {
    type: DataTypes.INTEGER,
    references: { model: 'Albums', key: 'id' }
  }
};
