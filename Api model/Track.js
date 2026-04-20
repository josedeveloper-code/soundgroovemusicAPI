module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define("Track", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 1 }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: { isDate: true }
    }
  });

  Track.associate = (models) => {
    // Each track belongs to one artist
    Track.belongsTo(models.Artist, {
      foreignKey: "artistId",
      as: "artist",
      onDelete: "SET NULL"
    });
  };

  return Track;
};
