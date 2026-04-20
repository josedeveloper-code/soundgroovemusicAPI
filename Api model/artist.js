module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define("Artist", {
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Artist.associate = (models) => {
    // Each artist can have multiple tracks
    Artist.hasMany(models.Track, {
      foreignKey: "artistId",
      as: "tracks",
      onDelete: "CASCADE"
    });
  };

  return Artist;
};
