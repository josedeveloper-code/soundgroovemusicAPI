
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 30]
      }
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
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    role: {
      type: DataTypes.ENUM("admin", "listener"),
      defaultValue: "listener"
    }
  });

  User.associate = (models) => {
    // No associations needed for this project,
    // but this is I add my favorites, playlists, etc.
  };

  return User;
};

