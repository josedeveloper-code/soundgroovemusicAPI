Album.belongsTo(models.Artist, { foreignKey: "artistId" });
Album.hasMany(models.Track, { foreignKey: "albumId" });
