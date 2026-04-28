User.hasOne(Artist)
Artist.belongsTo(User)

Artist.hasMany(Track)
Track.belongsTo(Artist)

Album.hasMany(Track, { foreignKey: 'albumId', onDelete: 'CASCADE' });
Track.belongsTo(Album, { foreignKey: 'albumId' });
